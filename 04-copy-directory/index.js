const fs = require('fs');
const path = require('path');

const newFolderPath = path.join(__dirname, 'files-copy');
const baseFolderPath = path.join(__dirname, 'files');

async function copyFolder() {
  try {
    await fs.promises.access(newFolderPath, fs.constants.W_OK);
    const oldCopyFiles = await fs.promises.readdir(newFolderPath);
    for (const file of oldCopyFiles) {
      const pathToFile = path.join(newFolderPath, file);
      await fs.promises.unlink(pathToFile);
    }
  } catch {
    await fs.promises.mkdir(newFolderPath, { recursive: true });
  }

  const files = await fs.promises.readdir(baseFolderPath);

  files.forEach(async (file) => {
    const baseFile = path.join(__dirname, 'files', file);
    const newFile = path.join(__dirname, 'files-copy', file);
    await fs.promises.copyFile(baseFile, newFile);
  });
}

copyFolder();