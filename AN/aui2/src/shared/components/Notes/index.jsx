import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { STAFF_NOTE, CUSTOMER_NOTE } from 'shared/consts/noteTypes';
import UIComponent from 'shared/components/UIComponent';
import Collapse from 'react-base-ui/lib/components/Collapse';

import './index.less';

export default class Notes extends UIComponent {

  static propTypes = {
    permitDetailsChanged: PropTypes.func.isRequired,
    saveNotes: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const data = this.props.notes.toJS();
    this.state = {
      [STAFF_NOTE]: data[STAFF_NOTE],
      [CUSTOMER_NOTE]: data[CUSTOMER_NOTE],
      isChanged: false,
      lastNoteType: null
    };
  }

  render() {
    // data.isExpand is for modify reservation detail page
    const { showSection, isExpand } = this.props.notes.toJS();
    const textAreaCls = classNames({ 'textarea-disabled': this.props.readOnly });

    return (
      <div className={classNames('notes-section', { 'u-hidden': !showSection })}>
        <Collapse activeKey={isExpand ? 'notes' : ''}>
          <Collapse.Panel Header="Event Notes" key="notes">
            <div className="section-container">
              <section>
                <label htmlFor="staffNote">
                  Staff Note
                </label>
                <textarea
                  id="staffNote"
                  name="staffNote"
                  value={this.state[STAFF_NOTE]}
                  maxLength="20000"
                  className={textAreaCls}
                  disabled={this.props.readOnly}
                  onChange={e => this.onChange(STAFF_NOTE, e)}
                  onBlur={e => this.updateNote(STAFF_NOTE, e)}
                />
              </section>
              <section>
                <label htmlFor="customerNote">
                  Customer Note
                </label>
                <textarea
                  id="customerNote"
                  name="customerNote"
                  value={this.state[CUSTOMER_NOTE]}
                  maxLength="20000"
                  className={textAreaCls}
                  disabled={this.props.readOnly}
                  onChange={e => this.onChange(CUSTOMER_NOTE, e)}
                  onBlur={e => this.updateNote(CUSTOMER_NOTE, e)}
                />
              </section>
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.notes.toJS();
    const oldData = this.props.notes.toJS();

    const newState = {};

    if (data[STAFF_NOTE] !== oldData[STAFF_NOTE]) {
      newState[STAFF_NOTE] = data[STAFF_NOTE] || '';
    }

    if (data[CUSTOMER_NOTE] !== oldData[CUSTOMER_NOTE]) {
      newState[CUSTOMER_NOTE] = data[CUSTOMER_NOTE] || '';
    }

    if (newState[STAFF_NOTE] || newState[CUSTOMER_NOTE]) {
      newState.isChanged = false;
    }
    this.setState(newState);
  }

  onChange = (noteType, e) => {
    const { immediate } = this.props;
    const text = e.target.value.substr(0, 20000);
    this.setState({
      [noteType]: text,
      isChanged: true,
      lastNoteType: noteType
    }, immediate ? this.permitDetailsChanged : null);
  };

  updateNote = (noteType, e) => {
    const text = e.target.value;
    const { eventID, newEntryID, eventIndex } = this.props;

    if (this.state.isChanged) {
      this.props.saveNotes({
        note_text: text,
        note_type: noteType,
        event_index: eventIndex,
        new_entry_id: newEntryID,
        event_id: eventID
      }).then(this.onNotesSaved);
    }
  }

  onNotesSaved = () => {
    const { showUpdated, setActionBarDisabled } = this.props;
    this.setState({
      isChanged: false
    }, () => {
      showUpdated && showUpdated(this.props.eventIndex);
      setActionBarDisabled && setActionBarDisabled();
      this.permitDetailsChanged();
    });
  }

  permitDetailsChanged = () => {
    const { permitDetailsChanged } = this.props;
    permitDetailsChanged && permitDetailsChanged();
  }
}
