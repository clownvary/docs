import { createNumberPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  visibilityHeight: createNumberPropSpec('visibilityHeight', 'Visibility Height', 200),
  scrollDuration: createNumberPropSpec('scrollDuration', 'Scroll Duration(ms)', 1000),
  customizeRender: createBooleanPropSpec('customizeRender', 'Customize Render', false)
};

export default initSettings;
