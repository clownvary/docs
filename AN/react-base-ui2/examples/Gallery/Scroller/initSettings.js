import { createBooleanPropSpec } from '../../App/utils/createPropSpec';


const initSettings = {
  horizontal: createBooleanPropSpec('horizontal', 'Horizontal', true),
  vertical: createBooleanPropSpec('vertical', 'Vertical', true)
};

export default initSettings;
