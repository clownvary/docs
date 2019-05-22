import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Calendar from 'react-base-ui/lib/components/Calendar';

import { momentHelper } from 'react-base-ui/lib/utils';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import {
  changeReservationUsers,
  changeReservationDate,
  setReservationUsers
} from '../../actions/permitType';
import './index.less';

function getCurrentType(types) {
  return types.filter(v => !!v.selected)[0];
}

export class PermitTypeSet extends UIComponent {
  constructor(props) {
    super(props);

    this.permitTypeData = null;
    this.adminUsers = null;
  }

  gotoDate = (value) => {
    /* istanbul ignore else */
    if (value) {
      const dateFormat = this.permitTypeData.get('dateFormat');
      const permitExpirationDate = moment(value).format(DateTimeFormat.mapToDateFormat(dateFormat));
      const currentType = getCurrentType(this.permitTypeData.get('permitTypes').toJS());
      const oldExpirationDate = currentType.permitExpirationDate;

      if (permitExpirationDate === oldExpirationDate) {
        return false;
      }

      const params = this.props.getPermitTypeParams(this.permitTypeData, { permitExpirationDate });
      this.props.changeReservationDate(params, permitExpirationDate);
    } else {
      return null;
    }
    return null;
  };

  onRemoveDate = () => {
    const params = this.props.getPermitTypeParams(this.permitTypeData, { permitExpirationDate: '' });
    this.props.changeReservationDate(params, '');
  };

  onChangeReservationUser({ usersSelected }) {
    const params = this.props.getPermitTypeParams(this.permitTypeData,
      { permitReservationUsersSelected: usersSelected });

    this.props.changeReservationUsers(params);
  }

  onChangeAdmin = ({ value }) => {
    this.props.setReservationUsers(value);
  };

  render() {
    this.permitTypeData = this.props.permitTypeData;
    const permitReservationUsers = this.permitTypeData.get('permitReservationUsers').toJS();
    const permitReservationUsersSelected = this.permitTypeData.get('permitReservationUsersSelected').toJS();
    const permitTypes = this.permitTypeData.get('permitTypes').toJS();
    const currentType = getCurrentType(permitTypes);
    /* istanbul ignore next */
    const expirationDate = currentType.permitExpirationDate !== '' ? currentType.permitExpirationDate : '';
    /* istanbul ignore next */
    const defaultDate = expirationDate ? new Date(expirationDate) : null;
    const today = DateTimeFormat.getFullServerTodayDate();

    return (
      <div className="permit-type-set">
        {
          currentType.systemUserNamesAllowed &&
          <div className="permit-type-set-user">
            <span className="permit-type-set-title">Booking Admin</span>
            <Dropdown
              data={permitReservationUsers}
              value={permitReservationUsersSelected}
              placeholder="Select user"
              txtSuffix="selected"
              className="permit-user-dropdown"
              showCheckbox
              showTextTip
              showDeselectall
              onChange={this.onChangeAdmin}
              onMenuHide={() =>
                this.onChangeReservationUser({ usersSelected: permitReservationUsersSelected })
              }
            />
          </div>
        }

        {
          currentType.expirationDateAllowed &&
          <div className="permit-type-set-date">
            <span className="permit-type-set-title">Expiration date</span>
            <div className="timepicker-wrap">
              <i
                className="icon icon-calendar-m"
                onClick={(e) => {
                  const popupOptions = {
                    target: e.currentTarget,
                    showShadow: true,
                    showMask: false,
                    distance: 9,
                    closeByEscape: true,
                    focus: true
                  };

                  /* istanbul ignore next */
                  const value = defaultDate ? [moment(defaultDate)] : [];

                  const calendarOptions = {
                    today: momentHelper.createMoment(today),
                    value,
                    min: momentHelper.createMoment(today),
                    valueChanged: (v) => {
                      /* istanbul ignore else */
                      if (this.calendar) {
                        this.calendar.cancel();
                      }
                      /* istanbul ignore next */
                      const d = v.length ? v[0] : null;
                      /* istanbul ignore else */
                      if (d) {
                        this.gotoDate(d.toDate());
                      }
                    }
                  };

                  const calendar = Calendar.popup(calendarOptions, popupOptions);

                  /* istanbul ignore else */
                  if (calendar !== this.calendar) {
                    this.calendar = calendar;
                    calendar.result.then().catch(() => { });
                  }
                }}
              />
            </div>
            <span className="expiration-date">{expirationDate}</span>
          </div>
        }

        {
          currentType.expirationDateAllowed &&
          !currentType.expirationDateRequired &&
          expirationDate !== '' &&
          <span className="icon icon-close" onClick={this.onRemoveDate} />
        }

      </div>
    );
  }
}

export default connect(
  null,
  {
    changeReservationUsers,
    changeReservationDate,
    setReservationUsers
  }
)(PermitTypeSet);
