const fs = require('fs');

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (writeError) => {
      if (writeError) {
        console.error(`writefile ${path} error`, writeError);
        return reject(writeError);
      }
      return resolve();
    });
  });
}

function removePrepush(path) {
  const pkg = JSON.parse(fs.readFileSync(path));
  if (pkg.scripts.prepush) {
    delete pkg.scripts.prepush;
    writeFile(path, JSON.stringify(pkg));
  }
}

module.exports = { writeFile, removePrepush };

