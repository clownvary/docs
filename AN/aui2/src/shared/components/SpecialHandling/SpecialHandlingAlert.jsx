import React from 'react';
import Alert from 'shared/components/Alert';

import './SpecialHandlingAlert.less';

export const SpecialHandlingAlert = (props) => {
  const {
    customerName,
    notes,
    medicalAlert,
    medicalAlertShown,
    generalAlert,
    onClose
  } = props;

  const title = (<span><i className="icon icon-exclamation-triangle" /> Notes for {customerName}</span>);

  return (
    <Alert
      className="special-handling-alert"
      type="alert"
      title={title}
      shown
      onClose={onClose}
      onConfirm={onClose}
    >
      <div className="special-handling-alert__content">
        <dl>
          <dt>Notes</dt>
          <dd>{notes || '--'}</dd>
        </dl>
        {medicalAlertShown && (
          <dl>
            <dt>Medical Alert</dt>
            <dd>{medicalAlert || '--'}</dd>
          </dl>
        )}
        <dl>
          <dt>
            General Alert
            <span>Staff Use Only</span>
          </dt>
          <dd>{generalAlert || '--'}</dd>
        </dl>
      </div>
    </Alert>
  );
};

export default SpecialHandlingAlert;
