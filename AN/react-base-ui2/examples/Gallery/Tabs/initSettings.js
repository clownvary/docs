import { createOptionPropSpec } from '../../App/utils/createPropSpec';

const sizeOptions = [
  { text: 'Small', value: 'sm' },
  { text: 'Medium', value: 'md' },
  { text: 'Large', value: 'lg' }
];

const selectedIdOptions = [
  { text: 'Angular', value: 'ng' },
  { text: 'Ember', value: 'mb' },
  { text: 'React', value: 'rt' },
  { text: 'Backbone', value: 'bb' }
];

const disabledOptions = [
  { text: 'Angular', value: 'ng' },
  { text: 'Ember', value: 'mb' },
  { text: 'React', value: 'rt' },
  { text: 'Backbone', value: 'bb' }
];

const initSettings = {
  size: createOptionPropSpec('size', 'Size', 'md', sizeOptions),
  selectedId: createOptionPropSpec('selectedId', 'SelectedId', 'mb', selectedIdOptions),
  disabledId: createOptionPropSpec('disabledId', 'Disabled', 'ng', disabledOptions)
};

export default initSettings;
