import {
  createOptionPropSpec,
  createBooleanPropSpec
} from '../../App/utils/createPropSpec';

const initSettings = {
  sortable: createBooleanPropSpec('sortable', 'Sortable', true),
  rowSeperator: createBooleanPropSpec('rowSeperator', 'Show Row Seperator', true),
  striped: createBooleanPropSpec('striped', 'Alternate Rows', true)
};

export default initSettings;
