/* eslint import/no-extraneous-dependencies: off */
import path from 'path';
import fs from 'fs';
import mkdir from 'mkdir';
import glob from 'glob';
import args from 'yargs';
import _debug from 'debug';

const debug = _debug('aui:createTestSpecs');

const basePath = path.resolve(__dirname, '..');
const src = args.argv.src || process.env.SRC;
const dest = args.argv.dest || process.env.DEST;
const sourcePath = path.join(basePath, src);
let newCount = 0;
let existCount = 0;

if (!fs.existsSync(sourcePath)) {
  debug(`Source path does not exist: ${sourcePath}`);
  process.exit(1);
}

const createFileSync = (file, content) => {
  if (fs.existsSync(file)) {
    existCount += 1;
    debug(`Exist...: ${file}`);
    return;
  }

  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir);
  }

  newCount += 1;
  fs.writeFileSync(file, content);
  debug(`New...: ${file}`);
};

const createSpecFile = (file, ext) => {
  const baseName = path.basename(file, ext);
  const dirName = path.dirname(file).substr(src.length + 1);
  const destFile = path.join(dest, dirName, `${baseName}.spec${ext}`);
  const module = baseName === 'index' ? dirName : path.join(dirName, baseName);
  const content = `import '${module}';\n`;
  createFileSync(destFile, content);
};

const jsxPattern = path.join(src, '**/*.jsx');
const jsxFiles = glob.sync(jsxPattern);
if (jsxFiles) {
  jsxFiles.forEach((f) => {
    createSpecFile(f, '.jsx');
  });
}

const actionPattern = path.join(src, '**/actions/*.js');
const actionFiles = glob.sync(actionPattern);
if (actionFiles) {
  actionFiles.forEach((f) => {
    createSpecFile(f, '.js');
  });
}

const reducerPattern = path.join(src, '**/reducers/*.js');
const reducerFiles = glob.sync(reducerPattern);
if (reducerFiles) {
  reducerFiles.forEach((f) => {
    createSpecFile(f, '.js');
  });
}

const total = existCount + newCount;
debug(`------${existCount} of ${total} skipped!------`);
debug(`------${newCount} new spec(s) created!------`);
debug('Completed!');
