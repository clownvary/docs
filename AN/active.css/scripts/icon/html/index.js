const fs = require('fs');
const path = require('path');
const colors = require('colors');

const OUTPUT_PATH = path.join(path.resolve(), 'docs/icongraphy.md');
const FRAGMENT_PATH = path.join(path.resolve(), 'scripts/icon/html/icongraphy.md');

const MESSAGES = {
  START:   'Start build icongraphy.md...',
  ERROR:   '    Build icongraphy.md failed.',
  SUCCESS: '    Build icongraphy.md successful.',
  OUTPUT:  '    Output icongraphy.md to ' + OUTPUT_PATH
};

const readFile = (filePath) => new Promise((resolve, reject) => {
  try {
    return resolve(fs.readFileSync(filePath));
  } catch (e) {
    console.log(e);
    return reject(MESSAGES.ERROR);
  }
});

const combineHTML = (string) => {
  const reg = /<body[^>]*>([^<]*(?:(?!<\/?body)<[^<]*)*)<\/body\s*>/i;
  const body = reg.exec(string)[1]
                  .replace( /<script[^>]*>([^<]*(?:(?!<\/?script)<[^<]*)*)<\/script\s*>/i, '');// remove <script>
  const fragment = fs.readFileSync(FRAGMENT_PATH);
  return [
    fragment,
    body,
    '{% endexample %}'
  ].join('');
};

const outputFile = (string) => {
  console.log(MESSAGES.OUTPUT);
  return fs.writeFileSync(OUTPUT_PATH, string);
};

module.exports = (filePath) => new Promise((resolve, reject) => {
  try {
    console.log(MESSAGES.START);
    return readFile(filePath)
            .then(combineHTML)
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
