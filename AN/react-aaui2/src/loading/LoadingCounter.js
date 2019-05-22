export default class LoadingCounter {
  count = 0

  add() {
    this.count += 1
  }

  dec() {
    this.count -= 1
  }

  isEmpty() {
    return this.count <= 0
  }

  clear() {
    this.count = 0
  }
}
