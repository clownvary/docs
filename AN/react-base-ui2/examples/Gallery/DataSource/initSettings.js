import {
  createNumberPropSpec,
  createTextPropSpec
} from '../../App/utils/createPropSpec';

const initSettings = {
  pageNumber: createNumberPropSpec('pageNumber', 'Page Number', 1),
  filter: createTextPropSpec('filter', 'Filter', '')
};

export default initSettings;
