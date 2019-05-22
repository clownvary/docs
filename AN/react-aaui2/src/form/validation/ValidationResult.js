export default class ValidationResult {
  constructor(name, value = '', errMsg = '') {
    if (!name) {
      throw new Error('Name should not be empty!')
    }

    this.name = name
    this.value = value
    this.errMsg = errMsg
  }
}
