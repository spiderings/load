const fs = require('fs');
const path = require('path');

module.exports = readFileFromJson;

function fileExist(filePath) {
  return new Promise(resolve => {
    fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, err => {
      if (err) throw err;
      resolve();
    });
  });
}

function readJsonFile(filePath) {
  return new Promise(async resolve => {
    await fileExist(filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
}

async function readFileFromJson(fileName) {
  if (typeof fileName !== 'string') {
    throw new TypeError('argument must be a string');
  }

  if (path.extname(fileName) !== '.json') {
    throw new Error('file type must be json type');
  }

  const filePath = path.resolve(__dirname, fileName);
  const data = await readJsonFile(filePath);
  const parsedData = JSON.parse(data);
  return parsedData;
}
