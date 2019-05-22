class StateManager {
  constructor() {
    this.livingRequest = 0;
  }

  livingRequestCountUp() {
    this.livingRequest = Math.max(this.livingRequest + 1, 0);
  }

  livingRequestCountDown() {
    this.livingRequest = Math.max(this.livingRequest - 1, 0);
  }

  resetState() {
    this.livingRequest = 0;
  }

  isEmptyLivingRequest() {
    return this.livingRequest === 0;
  }
}

export default new StateManager();
