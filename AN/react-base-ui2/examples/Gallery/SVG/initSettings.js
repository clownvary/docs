import { createOptionPropSpec } from '../../App/utils/createPropSpec';

const groups = {
  icons: 'icons',
  'image: red white & cult': 'image',
  'icons: cloud': 'cloud',
  'icons: brand': 'brand'
};

const types = {
  normal: 'normal',
  link: 'link',
  warning: 'warning',
  error: 'error'
};

const sizes = {
  md: 'md',
  small: 'sm',
  large: 'lg'
};

const initSettings = {
  group: createOptionPropSpec('group', 'Example', groups.icons, groups),
  type: createOptionPropSpec('type', 'Type', types.normal, types),
  size: createOptionPropSpec('size', 'Size', sizes.default, sizes)
};

export default initSettings;
