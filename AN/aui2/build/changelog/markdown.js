const { getFormatMoment } = require('./commits');
/**
 * Generate the commit URL for the repository provider.
 * @param {String} baseUrl - The base URL for the project
 * @param {String} commitHash - The commit hash being linked
 * @return {String} The URL pointing to the commit
 */
const getCommitUrl = (baseUrl, commitHash) => {
  let urlCommitName = 'commit';

  if (baseUrl.indexOf('bitbucket') !== -1) {
    urlCommitName = 'commits';
  }

  if (baseUrl.indexOf('gitlab') !== -1 && baseUrl.slice(-4) === '.git') {
    baseUrl = baseUrl.slice(0, -4);
  }

  return `${baseUrl}/${urlCommitName}/${commitHash}`;
};

/**
 *
 * generate markdown content for different type of commits
 * @param {string} type
 * @param {string} typeTitle
 * @param {Array<object>} commits
 * @param {string} repoUrl specify the repo URL for commit links
 * @returns {Array} markdown content section
 */
const genTypeContent = (type, typeTitle, commits, repoUrl) => {
  const content = [];
  const prefix = '*';
  if (commits && commits.length > 0) {
    const reg = new RegExp(`${type}:`, 'i');
    if (type) {
      content.push(`##### ${typeTitle}`);
      content.push('');
    }
    commits.forEach((commit) => {
      const datetime = getFormatMoment(commit.authorDate.slice(0, 19), 'YYYY-MM-DD HH:mm:ss');
      const url = getCommitUrl(repoUrl, commit.hash);
      type ? content.push(`${prefix} ${commit.subject.replace(reg, '').trim()} ([${commit.abbrevHash}](${url})) [${commit.authorName}]`) :
        content.push(`${prefix} ${commit.subject.trim()} ([${commit.abbrevHash}](${url})) [${commit.authorName}] [${datetime}]`);
    });
  } else {
    content.push(`${prefix} No changes`);
  }
  content.push('');
  return content;
};

/**
 * Generate the markdown for the changelog.
 * @param {Array<Object>} commits - array of parsed commit objects
 * @param {String} repoUrl - repo URL that will be used when linking commits
 * @param {object} version - the version affiliated to this changelog
 * @return {Array<string>} change log result for the tag
 */
exports.markdown = function markdown(commits, repoUrl, version) {
  const content = [];
  let heading = '####';
  let result = '';
  const typeContent = genTypeContent(null, null, commits, repoUrl);
  heading += ` ${version.name} (${version.date})`;
  content.push(heading);
  content.push('---');
  content.push('');
  result = content.concat(typeContent);
  return result;
};
