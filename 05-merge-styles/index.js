const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

async function getFileData(file) {
  let stream = fs.createReadStream(file);
  stream.setEncoding('utf8');
  let data = '';
  for await (const chunk of stream) {
    data += chunk;
  }
  return data;
}

async function createBundle() {
  const files = await fs.promises.readdir(stylesPath);
  let data = '';

  for (const file of files) {
    if (path.extname(file) !== '.css') continue;
    data += (await getFileData(path.resolve(stylesPath, file))) + '\n';
  }

  const outputStream = fs.createWriteStream(outputPath);
  outputStream.write(data);
  outputStream.end();
}

createBundle();