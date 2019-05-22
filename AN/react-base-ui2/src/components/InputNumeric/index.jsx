import InputNumeric, { InputNumericProps, NUM_MIN, NUM_MAX } from './InputNumeric';
import * as NumericType from '../../consts/NumericType';
import { createField } from '../../services/validation';

const InputNumericField = createField(InputNumeric);

export {
  InputNumeric,
  InputNumericProps,
  InputNumericField,
  NumericType,
  NUM_MIN,
  NUM_MAX
};

export default InputNumeric;
