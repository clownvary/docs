import React from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { pages } from 'shared/consts';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputDate from 'react-base-ui/lib/components/InputDate';
import { ContentView } from 'react-base-ui/lib/components/DialogBox';
import { TodayBehavior } from 'react-base-ui/lib/components/Calendar/consts';

import './index.less';

class CopyPermit extends ContentView {
  constructor(props) {
    super(props);
    const { dateFormat, currentDate } = props.initialData;
    this.date = DateTimeFormat.formatDate(currentDate, dateFormat);
    this.event = props.permitEvents[0];
  }

  onConfirm = () => {
    const { permitID, batchID, receiptID } = this.props.initialData;
    this.props.redirect(pages.buildUrl(pages.calendarPage, {
      batch_id: batchID,
      permit_id: permitID,
      draft_receipt_id: receiptID,
      event_id: this.event.id,
      event_start_date: this.date
    }));
  }

  onDateChange = (e) => {
    const { dateFormat } = this.props.initialData;
    this.date = DateTimeFormat.formatDate(e.value, dateFormat);
  }

  onEventsChange = (e) => {
    const { permitEvents } = this.props;
    this.event = find(permitEvents, item => item.id === e.value);
  }

  /**
   * This method is to fix a zIndex bug
   * when a popup component(like inputDate) in a modal component,
   * modal component's mask will cover inputDate's mask,
   * then click on inputDate mask will not work.
   * @memberof CopyPermit
   */
  fixZIndex = () => {
    const popupCalendars = document.querySelectorAll('.an-popup-Calendar-service');
    const deskPopup = filter(popupCalendars, node => node.querySelector('.an-popup-desk'))[0];
    const desk = deskPopup.querySelector('.an-popup-desk');
    // istanbul ignore else
    if (desk) {
      desk.style.zIndex = 9999;
    }
  }

  render() {
    const { initialData: { currentDate, dateFormat }, permitEvents } = this.props;
    const data = map(permitEvents, item => ({
      text: item.name,
      value: item.id
    }));
    return (
      <div className="copy-permit-content">
        {
          data.length > 1 ? (
            <div className="copy-permit-content__event">
              <p>This reservation has multiple events.</p>
              <div>
                <p>Select the event you want to copy</p>
                <div>
                  <Dropdown
                    data={data}
                    defaultValue={data[0].value}
                    onChange={this.onEventsChange}
                  />
                </div>
              </div>
            </div>
          ) : null
        }
        <div className="copy-permit-content__date">
          <p>Enter the start date of your new reservation</p>
          <div>
            <InputDate
              value={currentDate}
              min={currentDate}
              allowBlank={false}
              onValueChange={this.onDateChange}
              onCalendarOpen={this.fixZIndex}
              listConfig={{ todayBehavior: TodayBehavior.SELECT }}
              format={dateFormat}
              showTrigger
            />
          </div>
        </div>
      </div>
    );
  }
}


export default CopyPermit;
