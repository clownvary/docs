import {
  createOptionPropSpec
} from '../../App/utils/createPropSpec';

const type = [
  { text: 'success', value: 'success' },
  { text: 'warning', value: 'warning' },
  { text: 'danger', value: 'danger' },
  { text: 'info', value: 'info' }
];

const initSettings = {
  type: createOptionPropSpec('type', 'Type', 'info', type)
};

export default initSettings;
