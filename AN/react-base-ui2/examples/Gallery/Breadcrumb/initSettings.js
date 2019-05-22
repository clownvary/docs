
import { createOptionPropSpec } from '../../App/utils/createPropSpec';

const separators = [
  { text: '/', value: '/' },
  { text: '>', value: '>' },
  { text: '-', value: '-' },
  { text: '<', value: '<' }
];

const initSettings = {
  separator: createOptionPropSpec('separator', 'Separator', '/', separators)
};

export default initSettings;
