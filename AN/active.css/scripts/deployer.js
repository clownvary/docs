const deployer = require('nexus-deployer')

const pomDir = 'dist/poms'
const artifactId = 'active.css'

exports.pomDir = pomDir
exports.artifactId = artifactId

exports.deploy = function deploy(options) {
  const release = {
    groupId: 'com.active.fnd',
    artifactId: 'active.css',
    // version: options.version,
    packaging: 'zip',
    url: 'http://nexus.dev.activenetwork.com/nexus/content/repositories/libs-releases',
    // artifact: options.artifact,
    noproxy: 'localhost',
    insecure: true,
    cwd: '',
    pomDir: pomDir
  }

  return new Promise((resolve, reject) => {
    deployer.deploy(Object.assign(release, options), resolve)
  })
}
