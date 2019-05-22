import moment from 'moment';
import {
  createBooleanPropSpec,
  createMomentPropSpec,
  createTextPropSpec,
  createOptionPropSpec
} from '../../App/utils/createPropSpec';


const themeOptions = [
  {
    text: 'Default',
    value: 'default'
  },
  {
    text: 'Shadow',
    value: 'shadow'
  }
];

const viewOptions = [
  {
    text: 'Horizontal',
    value: 'horizontal'
  },
  {
    text: 'Vertical',
    value: 'vertical'
  }
];

const initSettings = {
  customMore: createBooleanPropSpec('customMore', 'Hook More', false),
  darkTooltip: createBooleanPropSpec('darkTooltip', 'Dark Tooltip', false),
  exclusiveMode: createBooleanPropSpec('exclusiveMode', 'Exclusive Mode', true),
  dateHeaderClickable: createBooleanPropSpec('dateHeaderClickable', 'DateHeader Clickable', true),
  resourceHeaderClickable: createBooleanPropSpec('resourceHeaderClickable', 'ResourceHeader Clickable', true),
  currentDate: createMomentPropSpec('currentDate', 'Today', moment()),
  displayDate: createTextPropSpec('displayDate', 'Display Date', '2018-06-02'),
  dateFormat: createTextPropSpec('dateFormat', 'Date Format', 'DD ddd'),
  theme: createOptionPropSpec('theme', 'Theme', 'default', themeOptions),
  view: createOptionPropSpec('view', 'View', 'horizontal', viewOptions),
  cornerLabel: createTextPropSpec('cornerLabel', 'Corner Text', 'Resources')
};

export default initSettings;
