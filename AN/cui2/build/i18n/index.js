import fs from 'fs';
import glob from 'glob';
import flatten from 'lodash/flatten';
import { transform } from 'babel-core';
import locals from '../../i18n/locals';

const TARGET_DIRETORY = 'src/**/*.js';

const getFilePaths = () => new Promise((resolve, reject) => {
  glob(TARGET_DIRETORY, { dot: true }, (error, path) => (error ? reject(error) : resolve(path)));
});

const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (error, code) => (error ? reject(error) : resolve(code)));
});

const extract = path => new Promise((resolve, reject) => {
  try {
    return readFile(path).then(code => resolve(transform(code, {
      plugins: [
        'react-intl',
        'transform-runtime',
        'add-module-exports'
      ],
      presets: ['react', 'es2015', 'stage-1']
    }).metadata['react-intl'].messages), error => reject(error));
  } catch (error) {
    process.stderr.write(`Error transforming file: ${path}\n${error}`);
    return reject(error);
  }
});

const sortAndStringify = (messages) => {
  const sortMessages = flatten(messages)
    .sort((a, b) => a.id.localeCompare(b.id));
  const messagesObject = Object.assign(...sortMessages.map(d => ({ [d.id]: d.defaultMessage })));
  return JSON.stringify(messagesObject, null, 2)
             .replace(/\n {2}\}/g, ',\n  }')
             .replace(/\}\n\]/g, '},\n]');
};

const generateI18nFiles = msgString =>
        locals.forEach(local =>
            fs.writeFileSync(`i18n/source/${local}.js`, `/* eslint-disable */\nexport default ${msgString}`));

const i18n = () => {
  // 1) Get all file paths.
  getFilePaths()
    // 2) Extract all messages into an array.
    .then(filePaths => Promise.all(filePaths.map(path => extract(path))))
    // 3) Sort and stringify the messages.
    .then(messages => sortAndStringify(messages))
    // 4) Generate i18n translation files by the settings of locals.
    .then(msgString => generateI18nFiles(msgString));
};

i18n();
