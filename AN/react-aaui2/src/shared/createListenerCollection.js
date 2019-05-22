const CLEARED = null

// Just to be able to name it for debugging and stuff.
export default function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  let current = []
  let next = []

  return {
    clear() {
      next = CLEARED
      current = CLEARED
    },

    notify() {
      const listeners = (current = next)

      for (let i = 0; i < listeners.length; i += 1) {
        listeners[i]()
      }
    },

    subscribe(listener) {
      let isSubscribed = true
      if (next === current) next = current.slice()

      next.push(listener)

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return
        isSubscribed = false

        if (next === current) next = current.slice()
        next.splice(next.indexOf(listener), 1)
      }
    },
  }
}
