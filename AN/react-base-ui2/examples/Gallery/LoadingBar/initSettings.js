
import { Size3 } from 'src/consts';
import { createOptionPropSpec, createTextPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  spinSize: createOptionPropSpec('spinSize', 'Spin Size', Size3.SMALL, Size3),
  text: createTextPropSpec('text', 'Loading Text', 'Loading...')
};

export default initSettings;
