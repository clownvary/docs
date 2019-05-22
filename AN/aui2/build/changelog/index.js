const { compact, reduce } = require('lodash');
const PATH = require('path');
const { PACKAGE_PATH, CHANGELOG_PATH } = require('./const');
const markdown = require('./markdown').markdown;
const { getCommits, getTags } = require('./commits');
const { writeFile, removePrepush } = require('./file');

function run() {
  const logPath = PATH.resolve(__dirname, CHANGELOG_PATH);
  const pkgPath = PATH.resolve(__dirname, PACKAGE_PATH);

  const tags = getTags();

  const tagsContent = tags.map((tag, index) => {
    let result;
    if (index !== tags.length - 1) {
      const commits = getCommits(tag.name, tags[index + 1].name);
      result = markdown(commits, '/..', tags[index + 1]);
    }
    return result;
  });

  const result = reduce(compact(tagsContent), (pre, cur) => cur.concat(pre));

  if (result) {
    removePrepush(pkgPath);
    writeFile(logPath, result.join('\n'));
  }
}
run();
