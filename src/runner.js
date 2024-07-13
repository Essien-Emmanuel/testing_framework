const fs = require("fs");
const path = require("path");
const colors = require("colors");

const render = require("./render");

const forbiddenDirs = ["node_modules"];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (const testFile of this.testFiles) {
      console.log(" Testing ", colors.gray(testFile.shortName));

      const beforeEaches = [];
      global.render = render;
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = (desc, fn) => {
        beforeEaches.forEach((func) => func());

        try {
          fn();
          console.log("\n");
          console.log("\t", desc);
          console.log("\t", colors.green("OK ✓✓✓ \n"));
        } catch (err) {
          const errorMsg = err.message.replace(/\n/g, "\n\t\t");
          console.log("\t", desc);
          console.log("\t", colors.red(errorMsg), "\n");
        }
      };

      try {
        require(testFile.name);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childPaths = await fs.promises.readdir(filePath);
        files.push(...childPaths.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = new Runner();
