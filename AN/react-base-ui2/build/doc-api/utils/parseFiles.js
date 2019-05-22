import colors from 'colors';
import { readFiles } from 'node-dir';
import startsWith from 'lodash/startsWith';
import { parse, resolver } from 'react-docgen';
import annotationResolver from './annotationResolver';

const parseFiles = (options) => {
  return new Promise((resolve, reject) => {
    const files = [];

    printOptions(options);

    readFiles(
      options.source,
      {
        match: new RegExp(`\\.(?:${options.extensions.join('|')})$`),
        exclude: options.exclude && new RegExp(options.exclude),
        excludeDir: options.ignore
      },
      (err, content, filename, next) => {
        if (err) {
          throw err;
        }

        try {
          let superClassList = [];

          const components = parse(content, (ast, recast) => {
            const annotatedComponents = annotationResolver(ast, recast).map(({ node, superClassName }) => {
              superClassList.push(superClassName);
              return node;
            });
            const defaultComponents = resolver.findAllComponentDefinitions(ast, recast);
            return annotatedComponents.concat(defaultComponents);
          }).map((item, i) => {
            if (superClassList[i]) {
              item.superClassName = superClassList[i];
            }
            return item;
          });

          files.push({ filename, components });
        } catch (e) {
          if (e && e.message && !startsWith(e.message, 'No suitable component')) {
            console.log(
`
${colors.red`Error found: ${filename}`}
   ${e.message}
`
            );
            throw e;
          }
          files.push({ filename, components: [] });
        }

        next();
      },
      err => {
        if (err) {
          reject(err);
        }
        resolve(files);
      }
    )
  });
}


function printOptions(options) {
  console.log(`Searching in: ${options.source}`);

  const optionsFeedback = getOptionsFeedback(options);
  if (optionsFeedback) {
    console.log(optionsFeedback);
  }
}


function getOptionsFeedback(options) {
  const sentences = [];

  if (options.ignore.length) {
    sentences.push(`Ignore directories: ${options.ignore.join(',')}`);
  }

  if (options.exclude) {
    sentences.push(`Exclude files pattern: ${options.exclude}`);
  }

  return sentences.join(' - ');
}


export default parseFiles;
