import moment from 'moment';

const defaultOptions = {
  start: moment(),
  end: moment(),
  timeStep: 30
};

class MomentRange {
  constructor({ start, end, timeStep }) {
    this.start = start || defaultOptions.start;
    this.end = end || defaultOptions.end;
    this.timeStep = timeStep || defaultOptions.timeStep;
  }

  toString() {
    return `${this.start.format()}/${this.end.format()}/${this.timeStep}`;
  }
}


export default MomentRange;
