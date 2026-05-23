#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let input = '';
try { input = fs.readFileSync(0, 'utf8').trim(); } catch (e) {}
const prompt = input || process.env.CLAUDE_USER_PROMPT || '';

if (!prompt.includes('caveman-stats')) process.exit(0);

const statsScript = path.join(__dirname, 'caveman-stats.cjs');
try {
  const out = execSync('node "' + statsScript + '"', { encoding: 'utf8', timeout: 10000 });
  const stats = JSON.parse(out.trim());
  const inputT = (stats.inputTokens || 0).toLocaleString();
  const outputT = (stats.outputTokens || 0).toLocaleString();
  const baseline = (stats.baselineOutput || 0).toLocaleString();
  const saved = (stats.savedTokens || 0).toLocaleString();
  const pct = stats.savedPct || 0;
  const lines = [
    'Session: ' + (stats.turns || 0) + ' turns',
    'Input:   ' + inputT + ' tokens',
    'Output:  ' + outputT + ' tokens (caveman)',
    'Baseline: ' + baseline + ' tokens (estimated without caveman)',
    'Saved:   ' + saved + ' tokens (~' + pct + '%)',
  ];
  console.log(JSON.stringify({ decision: 'block', reason: lines.join('\n') }));
} catch (e) {
  console.log(JSON.stringify({ decision: 'block', reason: 'Stats unavailable: ' + e.message }));
}
