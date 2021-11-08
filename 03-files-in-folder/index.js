const fs = require("fs");
const path = require("path");
const secretPath = path.join(__dirname, "secret-folder");

async function showFiles() {
  try {
    let files = await fs.promises.readdir(secretPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        let arrFile = file.name.split(".");
        let pathToFile = path.join(__dirname, "secret-folder/", file.name);
        let stats = await fs.promises.stat(pathToFile);
        console.log(`${arrFile[0]} - ${arrFile[1]} - ${stats.size}b`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

showFiles();
