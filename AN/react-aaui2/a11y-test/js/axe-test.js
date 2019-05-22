import axeCore from 'axe-core'

const reactAxe = function reactAxe(conf) {
  return axeCore.run('#root', conf)
}

export default reactAxe
