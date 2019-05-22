const resolvePath = require('path').resolve;
const exec = require('./exec');

if (process.cwd() !== resolvePath(__dirname, '..')) {
  console.error('The changelog script must be run from the repo root');
  process.exit(1);
}

exec('node ./build/changelog ', { stage: 'generating CHANGELOG' })
  .then(() => exec('git add CHANGELOG.md', { stage: 'adding CHANGELOG' }))
  .then(() => exec('git commit --allow-empty -m "updated CHANGELOG.md"', { stage: 'committing CHANGELOG' }))
  .then(() => exec('git push origin HEAD:develop', { stage: 'pushing to remote' }))
  .catch(error => console.error(error));
