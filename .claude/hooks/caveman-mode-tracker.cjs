#!/usr/bin/env node
// caveman-mode-tracker.js - Tracks caveman usage & reports stats on /caveman-stats
// Hook entry point. Two modes:
//   --track    : log this interaction (PostToolUse)
//   --report   : compute and output session stats (called from hook or directly)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATS_FILE = path.join(__dirname, 'caveman-stats.cjson');

function loadStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
    }
  } catch (e) { /* ignore corrupt file */ }
  return { sessions: [], totalTurns: 0, totalCommands: 0 };
}

function saveStats(s) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(s, null, 2));
}

function track() {
  const s = loadStats();
  s.totalTurns++;
  const today = new Date().toISOString().slice(0, 10);
  let day = s.sessions.find(x => x.date === today);
  if (day) day.turns++;
  else s.sessions.push({ date: today, turns: 1 });
  saveStats(s);
}

function report() {
  // Run caveman-stats.cjs to get session token data
  const statsScript = path.join(__dirname, 'caveman-stats.cjs');
  let sessionStats = {};
  if (fs.existsSync(statsScript)) {
    try {
      const out = execSync(`node "${statsScript}"`, { encoding: 'utf8', timeout: 10000 });
      sessionStats = JSON.parse(out.trim());
    } catch (e) {
      sessionStats = { error: e.message };
    }
  }

  const trackerStats = loadStats();

  // Format output
  if (sessionStats.error) {
    console.log(`Session stats unavailable: ${sessionStats.error}`);
    return;
  }

  const turns = sessionStats.turns || 0;
  const inputT = (sessionStats.inputTokens || 0).toLocaleString();
  const outputT = (sessionStats.outputTokens || 0).toLocaleString();
  const baseline = (sessionStats.baselineOutput || 0).toLocaleString();
  const saved = (sessionStats.savedTokens || 0).toLocaleString();
  const pct = sessionStats.savedPct || 0;
  const historyTurns = trackerStats.totalTurns || 0;

  console.log('');
  console.log('  Session token report:');
  console.log(`  Turns:     ${turns}`);
  console.log(`  Input:     ${inputT} tokens`);
  console.log(`  Output:    ${outputT} tokens (caveman)`);
  console.log(`  Baseline:  ${baseline} tokens (estimated without caveman)`);
  console.log(`  Saved:     ${saved} tokens (~${pct}%)`);
  if (historyTurns > 0) {
    console.log(`  Lifetime:  ${historyTurns} caveman turns tracked`);
  }
  // Write lifetime badge for statusline
  try {
    const badgeFile = path.join(__dirname, '..', 'caveman-savings.txt');
    fs.writeFileSync(badgeFile, `⛏ ${sessionStats.savedTokens > 1000 ? (sessionStats.savedTokens/1000).toFixed(1)+'k' : sessionStats.savedTokens}`);
  } catch (e) { /* skip */ }
  console.log('');
}

const mode = process.argv[2] || '--track';
if (mode === '--report') {
  report();
} else {
  track();
}
