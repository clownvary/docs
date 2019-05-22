

import { createBooleanPropSpec } from '../../App/utils/createPropSpec';


const initSettings = {
  showTrigger2: createBooleanPropSpec('showTrigger2', 'Show Trigger', true),
  allowBlank: createBooleanPropSpec('allowBlank', 'Allow Blank', false)
};

export default initSettings;
