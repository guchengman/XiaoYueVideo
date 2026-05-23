#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function getSessionLogPath() {
  const home = require('os').homedir();
  const base = process.env.CLAUDE_CONFIG_DIR || path.join(home, '.claude');
  const projectsDir = path.join(base, 'projects');
  if (!fs.existsSync(projectsDir)) return null;
  const dirs = fs.readdirSync(projectsDir).filter(d => d.startsWith('D--OPC') || d.startsWith('D--d--OPC'));
  let latestFile = null, latestMtime = 0;
  for (const dir of dirs) {
    const dirPath = path.join(projectsDir, dir);
    try {
      for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.jsonl'))) {
        const fp = path.join(dirPath, file);
        const st = fs.statSync(fp);
        if (st.mtimeMs > latestMtime) { latestMtime = st.mtimeMs; latestFile = fp; }
      }
    } catch (e) { /* skip */ }
  }
  return latestFile;
}

function computeStats() {
  const logPath = getSessionLogPath();
  if (!logPath) return { error: 'No session log found' };

  const lines = fs.readFileSync(logPath, 'utf8').trim().split('\n').filter(Boolean);
  let userTurns = 0, assistantTurns = 0, toolUseCount = 0;
  let inputTokens = 0, outputTokens = 0, hasUsage = false;
  let inputChars = 0, outputChars = 0;

  for (const line of lines) {
    try {
      const entry = JSON.parse(line);

      if (entry.type === 'user') {
        userTurns++;
        // Count input chars from user content
        if (entry.message?.content) {
          for (const block of entry.message.content) {
            if (block.type === 'tool_result' && block.content) {
              inputChars += typeof block.content === 'string' ? block.content.length : JSON.stringify(block.content).length;
            }
          }
        }
      }

      if (entry.type === 'message' && entry.message) {
        assistantTurns++;
        if (entry.message.usage) {
          hasUsage = true;
          inputTokens += entry.message.usage.input_tokens || 0;
          outputTokens += entry.message.usage.output_tokens || 0;
        }
        if (entry.message.content) {
          for (const block of entry.message.content) {
            if (block.type === 'thinking' && block.thinking) {
              outputChars += block.thinking.length;
            } else if (block.type === 'text' && block.text) {
              outputChars += block.text.length;
            } else if (block.type === 'tool_use') {
              toolUseCount++;
              if (block.input) inputChars += JSON.stringify(block.input).length;
            }
          }
        }
      }
    } catch (e) { /* skip parse errors */ }
  }

  // Estimate tokens from chars if no usage info
  if (!hasUsage) {
    inputTokens = Math.round(inputChars * 0.35);
    outputTokens = Math.round(outputChars * 0.35);
  }

  const baselineOutput = Math.round(outputTokens * 3);
  const savedTokens = Math.max(0, baselineOutput - outputTokens);
  const savedPct = baselineOutput > 0 ? Math.round(savedTokens / baselineOutput * 100) : 0;

  return {
    logFile: path.basename(logPath),
    turns: userTurns,
    assistantTurns,
    toolUseCount,
    inputTokens,
    outputTokens,
    baselineOutput,
    savedTokens,
    savedPct
  };
}

const stats = computeStats();
if (stats.error) { console.error(stats.error); process.exit(1); }
console.log(JSON.stringify(stats));
