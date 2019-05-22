
import { SelectionMode, SortOrder } from 'src/components/ColumnList';
import { createOptionPropSpec, createBooleanPropSpec, createTextPropSpec } from '../../App/utils/createPropSpec';

const maxHeight = {
  '150px': '150px',
  '350px': '350px',
  '450px': '450px'
};

const width = {
  undefined,
  '150px': '150px',
  '250px': '250px',
  '350px': '350px'
};

const minWidth = {
  undefined,
  '150px': '150px',
  '250px': '250px',
  '350px': '350px'
};

const selectionModes = {
  Single: SelectionMode.SINGLE,
  Multiple: SelectionMode.MULTIPLE
};

const sorts = {
  Origin: SortOrder.ORIGIN,
  Ascending: SortOrder.ASC,
  Descending: SortOrder.DESC
};

const data = {
  'array: With Id': 'arrayWithId',
  'array: Without Id': 'arrayWithoutId',
  'dataSource: checkable': 'dataSourceCheckable',
  'dataSource: uncheckable': 'dataSourceUncheckable'
};

const initSettings = {
  // boolean props
  pageMode: createBooleanPropSpec('pageMode', 'Page Mode', true),
  showTips: createBooleanPropSpec('showTips', 'Show Tips', true),
  showSorter: createBooleanPropSpec('showSorter', 'Show Sorter', true),
  showFilter: createBooleanPropSpec('showFilter', 'Show Filter', true),
  showCount: createBooleanPropSpec('showCount', 'Show Count', true),
  showClear: createBooleanPropSpec('showClear', 'Show Clear', true),
  showMessage: createBooleanPropSpec('showMessage', 'Show Message', false),
  showCheckAll: createBooleanPropSpec('showCheckAll', 'Show Check All', true),
  WCAG: createBooleanPropSpec('WCAG', 'WCAG', false),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  isLoading: createBooleanPropSpec('isLoading', 'Is Loading', false),
  isFiltering: createBooleanPropSpec('isFiltering', 'Is Filtering', false),
  // option props
  data: createOptionPropSpec('data', 'Data Source', data['dataSource: checkable'], data),
  width: createOptionPropSpec('width', 'Width', width[undefined], width),
  minWidth: createOptionPropSpec('minWidth', 'Min Width', minWidth[undefined], minWidth),
  maxHeight: createOptionPropSpec('maxHeight', 'Max Height', maxHeight['150px'], maxHeight),
  defaultSort: createOptionPropSpec('defaultSort', 'Default Sort', SortOrder.ORIGIN, sorts),
  selectionMode: createOptionPropSpec('selectionMode', 'Selection Mode', SelectionMode.MULTIPLE, selectionModes),
  // text props
  filterPlaceholder: createTextPropSpec('filterPlaceholder', 'Filter Placeholder', 'Search items...')
};

export default initSettings;
