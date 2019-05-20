const processExec = require('child-process-promise').exec
const colors = require('colors')
const _debug = require('debug')

const debug = _debug('active.css:bin:exec')

function logWithPrefix(prefix, message) {
  debug(
    message.toString().trim()
    .split('\n')
    .map((line) => `${prefix.grey} ${line}`)
    .join('\n')
  )
}

module.exports = function exec(command, options = {}) {
  let proc = processExec(command, options)

  let title = options.title || command
  let output = (data, type) => logWithPrefix(`[${title}] ${type}:`, data)

  return proc.progress(({
      stdout,
      stderr
    }) => {
      stdout.on('data', data => output(data, 'stdout'))
      stderr.on('data', data => output(data, 'stderr'))
    })
    .then(result => {
      logWithPrefix(`[${title}]`, 'Complete'.cyan)
      return result
    })
}
