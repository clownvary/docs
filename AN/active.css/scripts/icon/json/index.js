const fs = require('fs');
const path = require('path');
const colors = require('colors');

const OUTPUT_PATH = path.join(path.resolve(), 'fonts/selection.json');

const MESSAGES = {
  START:   'Start build selection.json...',
  ERROR:   '    Build selection.json failed.',
  SUCCESS: '    Build selection.json successful.',
  OUTPUT:  '    Output selection.json to ' + OUTPUT_PATH
};

const copyFile = (filePath) => new Promise((resolve, reject) => {
  try {
    console.log(MESSAGES.OUTPUT);
    return resolve(
      fs.writeFileSync(OUTPUT_PATH, fs.readFileSync(filePath))
    );
  } catch (e) {
    console.log(e);
    return reject(MESSAGES.ERROR);
  }
});

module.exports = (filePath) => new Promise((resolve, reject) => {
  try {
    console.log(MESSAGES.START);
    return copyFile(filePath)
            .then(() => {
              console.log(colors.yellow(MESSAGES.SUCCESS));
              return resolve();
            })
            .catch((e) => reject(e || MESSAGES.ERROR));
  } catch (e) {
    console.log(e);
    return reject(MESSAGES.ERROR);
  }
});
