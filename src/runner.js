const fs = require("fs");
const path = require("path");

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filePath });
      } else if (stats.isDirectory()) {
        const childPaths = await fs.promises.readdir(filePath);
        files.push(...childPaths.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = new Runner();
