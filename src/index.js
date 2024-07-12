#!/usr/bin/env node

const runner = require("./runner");

const run = async () => {
  await runner.collectFiles(process.cwd());
  runner.runTests();
};

run();
