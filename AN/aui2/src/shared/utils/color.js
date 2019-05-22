import { functions, tree } from 'less';

export const darken = (color, amount) => {
  const darkenFunc = functions.functionRegistry.get('darken');
  const colorValue = new tree.Color(color.substring(1));
  const amountPercent = new tree.Dimension(amount, '%');
  return darkenFunc(colorValue, amountPercent).toRGB();
};

export const lighten = (color, amount) => {
  const lightenFunc = functions.functionRegistry.get('lighten');
  const colorValue = new tree.Color(color.substring(1));
  const amountPercent = new tree.Dimension(amount, '%');
  return lightenFunc(colorValue, amountPercent).toRGB();
};
