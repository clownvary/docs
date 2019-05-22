const prompt = require('readline-sync').question
const resolvePath = require('path').resolve
const readFileSync = require('fs').readFileSync

const exec = require('./exec')

const getPackageVersion = () =>
  JSON.parse(readFileSync(resolvePath(__dirname, '../package.json'))).version

if (process.cwd() !== resolvePath(__dirname, '..')) {
  console.error('The release script must be run from the repo root')
  process.exit(1)
}

// Get the next version, which may be specified as a semver
// version number or anything `npm version` recognizes. This
// is a "pre-release" if nextVersion is premajor, preminor,
// prepatch, or prerelease
let nextVersion = require('yargs').argv['release-version']

if (!nextVersion) {
  // prettier-ignore
  nextVersion = prompt(
    `Next version (current version is ${getPackageVersion()})? `
  )
}

const isPrerelease =
  nextVersion.substr(0, 3) === 'pre' || nextVersion.indexOf('-') !== -1

// prettier-ignore
// 1) Make sure the tests pass
exec(`npm test -- --runInBand`)
  // 2) Build and publish the **AMD**, **CommonJS** or **ES** module formats
  .then(() => exec('npm run build'))
  .then(() => exec('git add .'))
  .then(() =>
    exec('git commit --allow-empty -m "chore: Build and publish the AMD, CommonJS or ES2015 module formats"')
  )
  // 3) Increment the package version in package.json
  // 4) Create a new commit
  // 5) Create a v* tag that points to that commit
  // npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
  .then(() => exec(`npm version ${nextVersion} -m "Bump Version %s"`))
  // 6) Push to the same branch on the git remote (GitLab).
  // Do this before we publish in case anyone has pushed since we last pulled
  .then(() => exec('git push --no-verify origin HEAD:master'))
  // 7) Publish to nexus or npm. Use the "next" tag for pre-releases,
  // "latest" for all others
  .then(() => {
    // exec(`npm publish --tag ${isPrerelease ? 'next' : 'latest'}`)
  })
  // 8) Push the v* tag to GitLab
  .then(() => exec(`git push -f --no-verify origin v${getPackageVersion()}`))
  .then(() => {
    // 9) Push the "latest" tag to GitLab
    if (!isPrerelease) {
      return exec('git tag -f latest').then(() => {
        exec('git push -f --no-verify origin latest')
      })
    }
  })
  .catch(error => console.error(error))
