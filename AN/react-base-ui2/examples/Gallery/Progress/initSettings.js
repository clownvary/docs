

import { Size3 } from 'src/consts';
import { createOptionPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const percents = {
  30: 30,
  80: 80,
  100: 100
};

const initSettings = {
  percent: createOptionPropSpec('percent', 'Percent', 30, percents),
  showInfo: createBooleanPropSpec('showInfo', 'Show Info', true),
  size: createOptionPropSpec('size', 'Size', Size3.MEDIUM, Size3)
};

export default initSettings;
