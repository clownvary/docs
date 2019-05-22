import findTabbable from './findTabbable'

export default node => {
  const tabbable = findTabbable(node)
  return event => {
    // jsdom can not calculate offsetWidth, so in test environment tabbable.length is always 0
    /* istanbul ignore else */
    if (!tabbable.length) {
      event.preventDefault()
    } else {
      const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
      const leavingFinalTabbable =
        finalTabbable === document.activeElement ||
        // handle immediate shift+tab after opening with mouse
        node === document.activeElement
      if (!leavingFinalTabbable) return

      event.preventDefault()
      const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
      target.focus()
    }
  }
}
