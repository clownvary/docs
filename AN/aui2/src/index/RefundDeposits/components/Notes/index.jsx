import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import './index.less';

export default class Notes extends UIComponent {


  static propTypes = {
    displayNotes: PropTypes.bool.isRequired,
    staffNotes: PropTypes.string.isRequired,
    customerNotes: PropTypes.string.isRequired,
    onUpdateCustomerNotes: PropTypes.func.isRequired,
    onUpdateStaffNotes: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired
  };

  render() {
    const { displayNotes,
      staffNotes,
      customerNotes,
      onUpdateCustomerNotes,
      onUpdateStaffNotes,
      onShow,
      onHide } = this.props;

    return (
      <div className="notes-section panel">
        <h3>
          Notes <i
            onClick={displayNotes ? onHide : onShow}
            className={`title icon text-color-primary ${displayNotes ? 'icon-chevron-up' : 'icon-chevron-down'} link`}
          />
        </h3>
        {
          displayNotes ?
            <div className="notes">
              <section className="aaui-flexbox">
                <label htmlFor="staffNote">
                  Staff Note
                </label>
                <textarea
                  id="staffNote"
                  name="staffNote"
                  defaultValue={staffNotes}
                  maxLength="200"
                  onBlur={e => onUpdateStaffNotes(e.target.value)}
                />
              </section>
              <section className="aaui-flexbox">
                <label htmlFor="customerNote">
                  Customer Note
                </label>
                <textarea
                  id="customerNote"
                  name="customerNote"
                  defaultValue={customerNotes}
                  maxLength="200"
                  onBlur={e => onUpdateCustomerNotes(e.target.value)}
                />
              </section>

            </div>
            : null
        }
      </div>
    );
  }
}

