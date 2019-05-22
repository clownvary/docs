import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import {
  changeReservationType,
  changeReservationUsers,
  changeReservationDate
} from '../../actions/permitType';
import PermitTypeSet from '../PermitTypeSet';
import AMIds from '../../automationIds';
import './index.less';

function getPermitTypeParams(data, arg) {
  const params = {};
  const permitTypeData = data;
  const selectTypeId = arg.permitTypesVal || permitTypeData.get('permitTypesVal');

  let selectType = null;
  let selectedUsers = [];

  if (arg.permitTypesVal) {
    selectType = permitTypeData.get('permitTypes').toJS().filter(v => v.value === selectTypeId)[0];
  } else {
    selectType = permitTypeData.get('permitTypes').toJS().filter(v => !!v.selected)[0];
  }
  if (selectType.id === 2) {
    selectedUsers = arg.permitReservationUsersSelected ||
                    permitTypeData.get('permitReservationUsersSelected').toJS();
  }

  const expirationDate = arg.permitExpirationDate || arg.permitExpirationDate === '' ?
                    arg.permitExpirationDate : selectType.permitExpirationDate;

  params.batch_id = permitTypeData.get('batchID');
  params.receipt_id = permitTypeData.get('receiptID');
  params.receipt_entry_id = permitTypeData.get('receiptEntryID');
  params.hold_type_id = selectType.id;

  params.expiration_date = expirationDate;
  params.permit_reservation_users = selectedUsers.join(',');

  return params;
}

class PermitType extends UIComponent {
  onChangeReservationType = ({ value }) => {
    const permitTypesVals = this.props.permitTypeData.get('permitTypesVal');

    if (value === permitTypesVals) {
      return false;
    }
    const params = getPermitTypeParams(this.props.permitTypeData, { permitTypesVal: value });

    this.props.changeReservationType(params, value);
    return null;
  };

  render() {
    const permitTypeData = this.props.permitTypeData;
    const permitTypes = permitTypeData.get('permitTypes').toJS();
    const permitTypesVal = permitTypeData.get('permitTypesVal');

    return (
      <div className="permit-type">
        <div className="permit-type-add">
          <div className="permit-type-title">Reservation Type</div>
          <div className="permit-type-list">
            <Dropdown
              data={permitTypes}
              value={permitTypesVal}
              className="permit-type-dropdown"
              data-qa-id={AMIds.filters.type}
              onChange={value => this.onChangeReservationType(value)}
            />

            <PermitTypeSet
              changeReservationUsers={this.props.changeReservationUsers}
              changeReservationDate={this.props.changeReservationDate}
              getPermitTypeParams={getPermitTypeParams}
              permitTypeData={permitTypeData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    changeReservationType,
    changeReservationUsers,
    changeReservationDate
  }
)(PermitType);
