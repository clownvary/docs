import { confirm } from 'src/services/dialog';
import pickProps from '../../App/utils/pickProps';

import {
  createTextPropSpec,
  createBooleanPropSpec,
  createActionSpec
} from '../../App/utils/createPropSpec';

const onShowConfirm = (settings, spec, log) => {
  const { title, message, confirmText, cancelText, showCancel,
    dangerMode } = pickProps(settings);

  confirm(message, {
    title,
    confirmText,
    cancelText,
    showCancel,
    value: '100',
    dangerMode
  }).then(value => (log(`Confirmed to value:${value}`))).catch(() => {
    log('Sorry, cancel is chosen.');
  });
};

const initSettings = {
  title: createTextPropSpec('title', 'Title', 'Confirm'),
  message: createTextPropSpec('message', 'Message', 'The confirmation message'),
  confirmText: createTextPropSpec('confirmText', 'Confirm Text', 'OK'),
  cancelText: createTextPropSpec('cancelText', 'Cancel Text', 'Cancel'),
  showCancel: createBooleanPropSpec('showCancel', 'Show Cancel', false),
  dangerMode: createBooleanPropSpec('dangerMode', 'use dangerously set inner HTML', false),
  button: createActionSpec('button', 'Show Confirmation', onShowConfirm)
};

export default initSettings;
