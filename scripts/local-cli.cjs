#!/usr/bin/env node
// Entry point for file: dependencies on this toolchain checkout.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const binary = path.resolve(
  __dirname,
  '../target/release',
  process.platform === 'win32' ? 'mana-dev.exe' : 'mana-dev',
);

if (!fs.existsSync(binary)) {
  process.stderr.write('Build the local Mana toolchain first: cargo build --release --bin mana-dev\n');
  process.exit(1);
}

try {
  execFileSync(binary, process.argv.slice(2), { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status ?? 1);
}
