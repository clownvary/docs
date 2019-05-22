import React from 'react';
import Popover from 'react-base-ui/lib/components/Popover';

const renderConflictIcon = (bookingError) => {
  const conflictReason = (bookingError &&
    bookingError.get('datetimeConflict') &&
    bookingError.getIn(['datetimeConflict', 'reason'])) || '';

  return conflictReason &&
    <div className="conflict-information">
      <div className="pop-base" data-popover-trigger>
        <i className="icon icon-info-circle" />
        <Popover className="pop">
          <div dangerouslySetInnerHTML={{ __html: conflictReason.trim().replace(/\n/g, '<br />') }} />
        </Popover>
      </div>
    </div>;
};

const renderErrorReasonWithIcon = (bookingError) => {
  const advancedErrorReason = (bookingError &&
    bookingError.get('datetimeAdvance') &&
    bookingError.getIn(['datetimeAdvance', 'reason'])) || '';

  return advancedErrorReason &&
    <div className="conflict-information">
      <div className="pop-base" data-popover-trigger>
        <i className="icon icon-info-circle" />
        <Popover className="pop">
          <div dangerouslySetInnerHTML={{ __html: advancedErrorReason.trim().replace(/\n/g, '<br />') }} />
        </Popover>
      </div>
    </div>;
};

export default function BookingDetailErrorReson(props) {
  const { bookingError } = props;
  const conflictError = renderConflictIcon(bookingError);
  const advancedError = renderErrorReasonWithIcon(bookingError);

  if (conflictError) {
    return conflictError;
  }

  if (advancedError) {
    return advancedError;
  }

  return null;
}
