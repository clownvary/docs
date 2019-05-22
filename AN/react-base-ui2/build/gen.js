const path = require('path');
const fs = require('fs');
const format = require('string-template');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');

/**
 * @name getFiles
 * @description get files inside folder recursively
 * @param {array} args
 */
function getFiles(dir, files_) {
  if (dir === undefined || !fs.existsSync(dir)) {
    return [];
  }

  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  files.forEach((f) => {
    const name = dir + path.sep + f;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  });

  return files_;
}

/**
 * @name generateTemplate
 * @description generate file template
 * @param {file} template
 */
function generateTemplate(tempFile, options) {
  let fileName = tempFile.replace(options.srcPath + path.sep, '');
  fileName = fileName.replace(/{name}/g, options.name);

  const destFile = options.destPath + path.sep + fileName;
  const destPath = destFile.substring(0, destFile.lastIndexOf(path.sep));

  fs.readFile(tempFile, 'utf8', (err, data) => {
    if (err) throw err;

    mkdirp(destPath, () => {
      const injectedData = {
        name: options.name,
        Name_: _.snakeCase(options.name).toUpperCase(),
        name_: _.snakeCase(options.name)
      };

      const formattedData = format(data, injectedData);
      // formattedData = beautify(formattedData);

      fs.writeFile(destFile, formattedData, (e) => {
        if (e) {
          console.log(e);
        } else {
          console.log('\x1b[32m%s\x1b[0m: ', `Created: ${destFile}`);
        }
      });
    });
  });
}


inquirer.prompt([{
  type: 'list',
  message: 'Please choose the template type:',
  name: 'tempType',
  choices: ['Component', 'Service'],
  default: 'component'
}, {
  type: 'input',
  message: 'Please type the name:',
  name: 'name',
  validate: (value) => {
    const pass = value.match(
      /^[A-Z][a-z]+([A-Z][a-z]+)?/
    );
    if (pass) {
      return true;
    }

    return 'Name must be in CamelCase';
  }
}
]).then((answers) => {
  const type = answers.tempType.toLowerCase();
  const srcPath = path.join(__dirname, '../templates', type);
  const destPath = path.join(__dirname, '../src', `${type}s`, answers.name);

  if (!fs.existsSync(srcPath)) {
    console.log('Failed! Template not found. Please contact JC to create a template for this type.');
  } else if (fs.existsSync(destPath)) {
    console.log(`Failed! ${answers.name} ${answers.tempType} already exists.`);
  } else {
    const files = getFiles(srcPath);
    files.forEach((f) => {
      generateTemplate(f, {
        name: answers.name,
        srcPath,
        destPath
      });
    });
  }
});
