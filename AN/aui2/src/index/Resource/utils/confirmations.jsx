import React from 'react';
import { confirm } from 'react-base-ui/lib/services/dialog';

const openNonPermit = () => confirm(
    ' To modify this block, please open in the module it was created.',
  {
    title: 'System Message',
    confirmText: 'OK'
  }
  );

const openNonAccessablePermit = message => confirm(
    (<div>{message}</div>),
  {
    title: 'System Message',
    confirmText: 'OK'
  }
  );

const openPermitInNewWorkFlow = (availableBookingCount) => {
  if (availableBookingCount === 0) {
    return Promise.resolve();
  }

  return confirm(
      'If you continue, your pending receipt will be cancelled. Are you sure you want to leave this page?', {
        title: 'System Message',
        showCancel: true,
        cancelText: 'No',
        confirmText: 'Yes'
      }
    );
};

const openPendingPermitOfOthers = event => confirm(
    (<div>
      <div>Pending booking being made by another session (facility schedule ID <span className="facility_schedule_id">{event.resourceBookingID}</span>);
      </div>
      <div>facility id <span className="facility_id">{event.resourceID}</span></div>
    </div>
    ),
  {
    title: 'System Message',
    confirmText: 'OK'
  }
);

export default {
  openNonPermit,
  openNonAccessablePermit,
  openPermitInNewWorkFlow,
  openPendingPermitOfOthers
};
