const fs = require('fs');
const path = require('path');
const colors = require('colors');
const csscomb = require('csscomb');

const comb = new csscomb();

const OUTPUT_PATH = path.join(path.resolve(), 'less/icon.less');
const FRAGMENT_PATH = path.join(path.resolve(), 'scripts/icon/css/icon.less');

const MESSAGES = {
  START:   'Start build icon.less...',
  ERROR:   '    Build icon.less failed.',
  SUCCESS: '    Build icon.less successful.',
  OUTPUT:  '    Output icon.less to ' + OUTPUT_PATH
};

const formatCss = (filePath) => {
  const input = fs.readFileSync(filePath, 'utf8');
  return comb.processString(input);
};

const combineCss = (string) => {
  const reg = /@font-face([\s\S]*?)grayscale;\n}/g;
  const replacement = fs.readFileSync(FRAGMENT_PATH, 'utf8');
  return string.replace(reg, replacement);
};

const outputFile = (string) => {
  console.log(MESSAGES.OUTPUT);
  return fs.writeFileSync(OUTPUT_PATH, string);
};

module.exports = (filePath) => new Promise((resolve, reject) => {
  try {
    console.log(MESSAGES.START);
    return formatCss(filePath)
            .then(combineCss)
            .then(outputFile)
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
