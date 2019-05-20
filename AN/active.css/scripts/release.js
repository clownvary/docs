const prompt = require('readline-sync').question
const resolvePath = require('path').resolve
const readFileSync = require('fs').readFileSync

const deployer = require('./deployer')
const zip = require('./zip')
const exec = require('./exec')

const deploy = deployer.deploy

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
let nextVersion
if (process.env.CI_ENV === 'JENKINS') {
  nextVersion = require('yargs').argv['release-version'] || 'patch'
} else {
  nextVersion = prompt(`Next version (current version is ${getPackageVersion()})? `)
}

const isPrerelease = nextVersion.substr(0, 3) === 'pre' || nextVersion.indexOf('-') !== -1

// 1) Make sure the tests pass
// we don't have tests for `Active.css`
// 2) Built and transform `less` to `css`
exec('npm run build')
  // 3) Increment the package version in package.json
  // 4) Create a new commit
  // 5) Create a v* tag that points to that commit
  .then(() => exec(`git add . && git commit -m "chore: add build artifacts"`))
  .then(() => exec(`npm version ${nextVersion} -m "Bump Version %s"`))
  // 6) Push to the same branch on the git remote (GitLab).
  // Do this before we publish in case anyone has pushed since we last pulled
  .then(() => exec('git push --no-verify'))
  // 7) Publish to nexus instead of npm. Use the "next" tag for pre-releases,
  // "latest" for all others
  // exec(`npm publish --tag ${isPrerelease ? 'next' : 'latest'}`)
  .then(() => {
    const version = getPackageVersion()
    const artifact = `./${deployer.artifactId}-${version}.zip`

    return zip('./dist/', artifact)
      .then(() => console.log('Built zip: '.cyan + artifact.green))
      .then(() => deploy({ version, artifact }))
      .then(() => exec(`rimraf ${artifact} ${deployer.pomDir}`))
      .then(() => console.log('Release Done.'.cyan))
      .catch(err => console.log(err))
  })
  // 8) Push the v* tag to GitLab
  .then(() => exec(`git push -f origin v${getPackageVersion()}`))
  .then(() => {
    // 9) Push the "latest" tag to GitLab
    if (!isPrerelease) {
      return exec('git tag -f latest')
        .then(() => {
          exec('git push -f origin latest')
        })
    }
  })
