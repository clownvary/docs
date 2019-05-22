import React from 'react';
import { confirm } from '../services/dialog';
import { showError } from '../services/message';
import { ErrorObj, ErrorType } from '../common/error';


const doConfirm = (title, details) => {
  const msgs = details.map((line, index) => <div key={index}>{line}</div>);
  confirm(msgs, { title });
};

export default () => next => (action) => {
  if (!action.error) {
    return next(action);
  }

  const error = action.payload;

  if (ErrorObj.isErrorObj(error)) {
    let title = 'Error';

    switch (error.type) {
      case ErrorType.HTTP:
        title = error.message.title || 'HTTP Error';
        doConfirm(title, error.message.details);
        break;

      case ErrorType.SERVICE:
        title = error.message.title || 'Service Error';
        doConfirm(title, error.message.details);
        break;

      case ErrorType.APP:
        showError(error.message);
        break;

      default:
        break;
    }
  }

  return action;
};
