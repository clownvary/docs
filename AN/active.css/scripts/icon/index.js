const path = require('path');
const glob = require('glob');
const colors = require('colors');
const prompt = require('readline-sync').question;

const css = require('./css');
const html = require('./html');
const _json = require('./json');
const fonts = require('./fonts');

if (process.cwd() !== path.resolve(__dirname, '../../')) {
  console.error('The build aui_icons script must be run from the repo root');
  process.exit(1);
};

const userEntriedSourceDir = prompt(`Please entry the aui_icons directory(default is active.css/aui_icons):\n`);

const SOURCE_DIR = userEntriedSourceDir ?
                      path.resolve(userEntriedSourceDir) :
                      path.join(path.resolve(), 'aui_icons');

console.log(colors.grey('The confirmed directory of aui_icons: ' + SOURCE_DIR) + '\n');

const RESOURCE = {
  CSS: path.join(SOURCE_DIR, 'style.css'),
  HTML: path.join(SOURCE_DIR, 'demo.html'),
  JSON: path.join(SOURCE_DIR, 'selection.json'),
  FONTS: [
    path.join(SOURCE_DIR, 'fonts/aui_icons.eot'),
    path.join(SOURCE_DIR, 'fonts/aui_icons.svg'),
    path.join(SOURCE_DIR, 'fonts/aui_icons.ttf'),
    path.join(SOURCE_DIR, 'fonts/aui_icons.woff')
  ]
};

const EXPECTED_FILES = [
  RESOURCE.CSS, RESOURCE.HTML, RESOURCE.JSON, ...RESOURCE.FONTS
];

const MESSAGES = {
  MISS_FILES: [
    '[Error]: Miss necessary files under the target directory: ',
    SOURCE_DIR,
    '\n',
    'Please check below files: ',
    '\n',
    EXPECTED_FILES.map(file => '\n    ' + file)
  ].join(''),
  SUCCESS: 'Build aui_icon fonts successful.'
};

const checkFiles = () => new Promise((resolve, reject) =>
  glob.sync('/{' + EXPECTED_FILES + '}').length === EXPECTED_FILES.length ?
    resolve() : reject(MESSAGES.MISS_FILES));

const icon = () => {
  // 1) Check if exist the necessary files under the target directory.
  checkFiles()
    // 2) Generate icon.less and output it to 'less/' directory.
    .then(() => css(RESOURCE.CSS))
    // 3) Generate icongraphy.md and output it to 'docs/' directory.
    .then(() => html(RESOURCE.HTML))
    // 4) Copy selection.json to 'fonts/' directory.
    .then(() => _json(RESOURCE.JSON))
    // 5) Convert aui_icons.ttf to aui_icons.woff2 and copy the five type of fonts to 'fonts/' directory.
    .then(() => fonts(RESOURCE.FONTS))
    .then(() => console.log(colors.green('\n' + MESSAGES.SUCCESS + '\n')))
    .catch((error) => {
      console.error(colors.red(error));
    });
};

icon();
