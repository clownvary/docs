import {
  createTextPropSpec,
  createBooleanPropSpec,
  createOptionPropSpec
} from '../../App/utils/createPropSpec';

const sizeOptions = [
  {
    text: 'medium',
    value: 'm'
  },
  {
    text: 'large',
    value: 'lg'
  }
];

const themeOptions = [
  {
    text: 'flat',
    value: 'flat'
  },
  {
    text: 'gradient',
    value: 'gradient'
  },
  {
    text: 'borderless',
    value: 'borderless'
  }
];

const initSettings = {
  size: createOptionPropSpec('size', 'Size', 5000, sizeOptions),
  theme: createOptionPropSpec('theme', 'Theme', 5000, themeOptions),
  placeholder: createTextPropSpec('placeholder', 'Place holder', 'Select one educational background...'),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  filter: createBooleanPropSpec('filter', 'Show filter', false),
  highlight: createBooleanPropSpec('highlight', 'Highlight the seleted item', true)
};

export default initSettings;
