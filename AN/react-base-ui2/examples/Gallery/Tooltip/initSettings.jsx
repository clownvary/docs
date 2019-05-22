import React from 'react';
import Tooltip from 'src/components/Tooltip';
import { CheckboxGroup } from 'src/components/Checkbox';
import { Dock, Trigger, Theme, Effect } from 'src/consts';
import {
  createActionSpec,
  createTextPropSpec,
  createBooleanPropSpec,
  createOptionPropSpec,
  createObjectPropSpec
} from '../../App/utils/createPropSpec';
import pickProps from '../../App/utils/pickProps';

export let tooltipBuilded = false;
const onOpen = (log) => {
  log('Global tooltip onOpen function is called.');
};

const onClose = (log) => {
  log('Global tooltip onClose function is called.');
};

const onOption = (settings, spec, log) => {
  const props = pickProps(settings);
  Tooltip.option({
    onOpen: () => onOpen(log),
    onClose: () => onClose(log)
  });
  Tooltip.build(props.selector);
};

export const onBuild = (settings) => {
  const props = pickProps(settings);
  Tooltip.option(props);
  Tooltip.build(props.selector);
  tooltipBuilded = true;
};

const onClean = () => {
  Tooltip.clean();
  tooltipBuilded = false;
};

const contents = [
  {
    text: 'As Function',
    value: 'As Function',
    originalValue: () => 'Tooltip content which provided as function.'
  }, {
    text: 'As String',
    value: 'Tooltip content which provided as string.'
  }, {
    text: 'As Element',
    value: 'As Element',
    originalValue: React.createElement('div', { id: 'testContent' }, 'Tooltip content as the element.')
  }, {
    text: 'As Component',
    value: 'As Component',
    originalValue: <CheckboxGroup
      data={[
        { text: 'checkbox 1', value: 'checkbox 1' },
        { text: 'checkbox 2', value: 'checkbox 2' },
        { text: 'checkbox 3', value: 'checkbox 3' }
      ]}
    />
  }, {
    text: 'As A Success Promise',
    value: 'As A Success Promise',
    originalValue: new Promise((resolve) => {
      setTimeout(() => {
        resolve('Tooltip content which come from success async action.');
      }, 10000);
    })
  }, {
    text: 'As A Failure Promise',
    value: 'As A Failure Promise',
    originalValue: new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Fetch tooltip content fail.');
      }, 10000);
    })
  }
];

const onClickOpen = (settings, spec, log) => {
  const {
    className,
    content,
    dockStyle,
    distance,
    showShadow,
    theme,
    effect
  } = pickProps(
    settings,
    ['className', 'content', 'dockStyle', 'distance', 'showShadow', 'trigger', 'theme', 'effect']
  );

  const tooltipOptions = {
    className,
    content,
    dockStyle,
    distance,
    showShadow,
    theme,
    effect,
    onOpen: () => log('Tooltip created and opened by call the Tooltip.open(target, options) API.'),
    onClose: () => log('Tooltip created and opened by call the Tooltip.close() API.')
  };

  Tooltip.open(document.getElementById('testTooltipAPI'), tooltipOptions);
};

const onClickClose = () => {
  Tooltip.close();
};

const selectors = [{
  text: '[data-tooltip]',
  value: '[data-tooltip]'
}, {
  text: '.tooltip-selector',
  value: '.tooltip-selector'
}];

const styles = [
  {
    text: 'Change the tooltip font size',
    value: 'font size',
    originalValue: { fontSize: '16px' }
  }, {
    text: 'Change the tooltip color',
    value: 'color.',
    originalValue: { color: 'red' }
  }
];

const initSettings = {
  style: createOptionPropSpec('style', 'Style', styles[0].originalValue, styles),
  content: createOptionPropSpec('content', 'Content', contents[1].value, contents),
  dockStyle: createOptionPropSpec('dockStyle', 'Dock Style', Dock.BOTTOM_LEFT, Dock),
  distance: createTextPropSpec('distance', 'Offset', '5'),
  showShadow: createBooleanPropSpec('showShadow', 'Show Shadow', false),
  selector: createOptionPropSpec('selector', 'Selector', '[data-tooltip]', selectors),
  // className: createTextPropSpec('className', 'Class Name', ''),
  // trackMouse: createBooleanPropSpec('trackMouse', 'Track Mouse', false),
  trigger: createOptionPropSpec('trigger', 'Trigger', Trigger.HOVER, Trigger),
  theme: createOptionPropSpec('theme', 'Theme', Theme.LIGHT, Theme),
  effect: createOptionPropSpec('effect', 'Effect', Effect.NONE, Effect),
  build: createActionSpec('build', 'Build Tooltips', onBuild),
  clean: createActionSpec('clean', 'Clean Tooltips', onClean),
  option: createActionSpec('option', 'Change Default onOpen/onClose', onOption),
  open: createActionSpec('open', 'Open Tooltip', onClickOpen),
  close: createActionSpec('close', 'Close Tooltip', onClickClose)
};

export default initSettings;
