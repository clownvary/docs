const gitlog = require('gitlog');
const path = require('path');
const TYPES = require('./const').COMMIT_TYPES;
const exec = require('child_process').execSync;
const moment = require('moment');

function getCommits(fromVer = 'develop', toVer = 'HEAD') {
  const options = {
    repo: path.resolve(__dirname),
    branch: `${fromVer}..${toVer}`,
    number: 1000,
    fields: ['hash', 'abbrevHash', 'subject', 'authorName', 'authorDate']
  };
  const excludeSubject = /^merge branch.+into.+$/;
  const excludeAuthor = /^svc\.scm$/;
  const commits = gitlog(options);

  if (commits && commits.length > 0) {
    return commits.filter((commit) => {
      const subject = commit.subject.toLowerCase();
      if (!excludeSubject.test(subject) && !excludeAuthor.test(commit.authorName)) {
        commit.type = TYPES.other;
        Object.keys(TYPES).forEach((type) => {
          if (subject.includes(`${TYPES[type]}:`)) {
            commit.type = TYPES[type];
          }
        });
      }
      return commit.type;
    });
  }
  return null;
}

function getFormatMoment(string, format) {
  return moment.utc(string).utcOffset(8).format(format);
}

function getTags() {
  const versionReg = /(\d+\.){3}\d+/;

  const stdout = exec('git for-each-ref --sort=taggerdate --format "%(refname) = %(taggerdate)" refs/tags').toString();
  let versions = stdout.split('\n');
  versions = versions.filter(v => versionReg.test(v)).map((v) => {
    const dateIndex = v.indexOf('=');
    if (dateIndex !== -1) {
      return {
        name: versionReg.exec(v)[0],
        date: getFormatMoment(new Date(v.slice(dateIndex + 1)), 'YYYY/MM/DD HH:mm:ss')
      };
    }
    return null;
  });
  return versions;
}

module.exports = { getCommits, getTags, getFormatMoment };

// const commits = getCommits('18.09.0.081');

// console.log('commits', commits.map(c=>c.authorName));

