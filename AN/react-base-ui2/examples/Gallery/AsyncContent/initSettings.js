import { PlaceHolderType } from 'src/components/AsyncContent';
import { createOptionPropSpec, createTextPropSpec } from '../../App/utils/createPropSpec';

const delayOptions = [
  {
    text: '2s',
    value: 2000
  },
  {
    text: '5s',
    value: 5000
  },
  {
    text: '8s',
    value: 8000
  }
];

const initSettings = {
  placeHolderType: createOptionPropSpec('placeHolderType', 'PlaceHolder Type', PlaceHolderType.TEXT, PlaceHolderType),
  placeHolder: createTextPropSpec('placeHolder', 'PlaceHolder', 'Loading'),
  delay: createOptionPropSpec('delay', 'Delay', 5000, delayOptions)
};

export default initSettings;
