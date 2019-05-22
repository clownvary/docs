import isNaN from 'lodash/isNaN';
import moment from 'moment';
import * as DataType from '../consts/DataType';
import * as Operator from '../consts/Operator';


const compareNumber = (
  value1,
  value2,
  /* istanbul ignore next */ operator = Operator.EQUAL
) => {
  switch (operator) {
    case Operator.EQUAL:
      return value1 === value2;

    case Operator.LESS:
      return value1 < value2;

    case Operator.LESS_OR_EQUAL:
      return value1 <= value2;

    case Operator.GREATER:
      return value1 > value2;

    case Operator.GREATER_OR_EQUAL:
      return value1 >= value2;

    default:
      throw new Error('Validation comparation needs operator');
  }
};

const compareDateTime = (
  m1,
  m2,
  /* istanbul ignore next */ operator = Operator.EQUAL,
  /* istanbul ignore next */ dateOnly = true
) => {
  const factor = dateOnly ? 'day' : '';
  switch (operator) {
    case Operator.EQUAL:
      return m1.isSame(m2, factor);

    case Operator.LESS:
      return m1.isBefore(m2, factor);

    case Operator.LESS_OR_EQUAL:
      return m1.isSameOrBefore(m2, factor);

    case Operator.GREATER:
      return m1.isAfter(m2, factor);

    case Operator.GREATER_OR_EQUAL:
      return m1.isSameOrAfter(m2, factor);

    default:
      throw new Error('Validation comparation needs operator');
  }
};

const compareTime = (
  m1,
  m2,
  /* istanbul ignore next */ operator = Operator.EQUAL
) => {
  const t1 = m1.format('HH:mm:ss');
  const t2 = m2.format('HH:mm:ss');
  switch (operator) {
    case Operator.EQUAL:
      return t1 === t2;

    case Operator.LESS:
      return t1 < t2;

    case Operator.LESS_OR_EQUAL:
      return t1 <= t2;

    case Operator.GREATER:
      return t1 > t2;

    case Operator.GREATER_OR_EQUAL:
      return t1 >= t2;

    default:
      throw new Error('Validation comparation needs operator');
  }
};

const compare = (value1, value2, operator = Operator.EQUAL, type = DataType.NUMBER) => {
  let m1;
  let m2;
  let format;
  const dateOnly = type === DataType.DATE;
  switch (type) {
    case DataType.NUMBER:
      value1 *= 1;
      value2 *= 1;

      if (isNaN(value1) || isNaN(value2)) {
        throw new Error('Validation can not convert to number');
      }

      return compareNumber(value1, value2, operator);

    case DataType.DATE:
    case DataType.DATETIME:
      format = dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DDThh:mm:ss';
      m1 = moment(value1, format);
      m2 = moment(value2, format);
      if (!m1.isValid() || !m2.isValid()) {
        throw new Error('Validation can not convert to date');
      }

      return compareDateTime(m1, m2, operator, dateOnly);

    case DataType.TIME:
      format = 'hh:mm:ss';
      m1 = moment(value1, format);
      m2 = moment(value2, format);
      if (!m1.isValid() || !m2.isValid()) {
        throw new Error('Validation can not convert to time');
      }

      return compareTime(m1, m2, operator);

    default:
      throw new Error('Validation type not supported');
  }
};


export default compare;
