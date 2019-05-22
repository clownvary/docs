import * as Hint from './consts/Hint';

export default class InputResult {
  constructor(hint = Hint.UNKNOWN, pos = -1) {
    this.hint = hint;
    this.testPosition = pos;
  }

  isSuccess() {
    return this.hint >= 0;
  }

  clone() {
    const rh = new InputResult();
    rh.hint = this.hint;
    rh.testPosition = this.testPosition;
    return rh;
  }
}

