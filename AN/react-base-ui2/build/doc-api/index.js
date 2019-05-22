import fs from 'fs';
import mkdirp from 'mkdirp';
import initial from 'lodash/initial';
import colors from 'colors/safe';
import parseFiles from './utils/parseFiles';
import printTable from './utils/printTable';
import writeFile from './utils/writeFile';
import parseComponent from './utils/parseComponent';

const options = {
  source: 'src/components',
  extensions: ['jsx'],
  output: 'doc/api/components',
  ignore: [],
  exclude: ''
};

const generateData = () => {
  return parseFiles(options);
};

const parseComponents = (data) =>
  data.map(({ filename, components }) => {
    return {
      filename,
      components: components.map(component => parseComponent(filename, component))
    }
  });

const pareMarkDownItem = ({ title, props, superClassName , description}) => {
  const header =
`## ${title ? `${title}` : '\`(Missing displayName)\`'} ${ superClassName ? ` extends ${superClassName}` : ''}
${description && '---'}
${description || ''}
`

const theader =
`
### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---`;

const tbody = props && props.length ?
  props.map(({ name, type, required, default: _default = ' ', description }) =>
`
${name}|${type}|${_default}|${required}|${description}`).join('') : '';

  return header + theader + tbody;
}

const generateMarkDowns = (data) =>
  data.forEach(({ filename, components }) => {
    const targetfilePath = filename
      .replace(options.source, options.output)
      .replace(new RegExp(`\\.(?:${options.extensions.join('|')})$`), '.md');
    const targetDirPath =initial(targetfilePath.split('/')).join('/');
    const blocks = components.filter(c => c).map(component => pareMarkDownItem(component));

    components.length && mkdirp(targetDirPath, () => writeFile(blocks.join(''), targetfilePath));
  });

const docApi = () => {
  generateData()
    .then((data) => {
      printTable(data);
      return data;
    })
    .then(parseComponents)
    .then(generateMarkDowns)
    .catch((err) => {
      throw err;
      process.exit(1);
    });
}

docApi();
