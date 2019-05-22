import { createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  right: createBooleanPropSpec('right', 'Label Align Right', false),
  bold: createBooleanPropSpec('bold', 'Blod', false),
  showColon: createBooleanPropSpec('showColon', 'Show Colon', false)
};

export default initSettings;
