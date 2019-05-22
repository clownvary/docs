import React from 'react';
import moment from 'moment';
import Calendar, { SelectionMode } from '../../src/components/Calendar';

import '../base.less';
import '../layout.less';
import './app.less';

const splitter = '\n';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstDayOfWeek: moment().localeData().firstDayOfWeek(),
      minDate: moment(new Date(1900, 0, 1)),
      maxDate: moment(new Date(2099, 11, 31)),
      disabledDates: [3, 4, 5, 6].map(c => moment().add(c, 'days')),
      selectMode: SelectionMode.SINGLE,
      value: [moment().add(2, 'days')]
    };
  }

  onChangefirstDayOfWeek(e) {
    this.updateConfig('firstDayOfWeek', parseInt(e.target.value, 10));
  }

  onChangedisabledDates(e) {
    const strdisabledDates = e.target.value;
    const arr = strdisabledDates.split(splitter);
    const disabledDates = arr.map(d => moment(d)).filter(m => m.isValid());
    this.updateConfig('disabledDates', disabledDates);
  }

  onChangeMinDate(e) {
    const minDate = moment(e.target.value);
    if (minDate.isValid()) {
      this.updateConfig('minDate', minDate);
    }
  }

  onChangeMaxDate(e) {
    const maxDate = moment(e.target.value);
    if (maxDate.isValid()) {
      this.updateConfig('maxDate', maxDate);
    }
  }

  onChangeSelectMode(e) {
    this.updateConfig('selectMode', e.target.value);
  }

  onChangeValue(e) {
    const values = e.target.value.split(splitter).map(d => moment(d)).filter(m => m.isValid());
    this.updateConfig('value', values);
  }

  updateConfig(configName, newConfigValue) {
    this.setState({ [configName]: newConfigValue });
  }

  render() {
    const {
      minDate,
      maxDate,
      disabledDates,
      firstDayOfWeek,
      selectMode,
      viewMode,
      value
    } = this.state;

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
      <div>
        <div className="sample-content">
          <Calendar
            firstDayOfWeek={firstDayOfWeek}
            disabledDates={disabledDates}
            min={minDate}
            max={maxDate}
            selectMode={selectMode}
            viewMode={viewMode}
            value={value}
            valueChanged={(dates) => {
              this.updateConfig('value', dates);
              this.value.value = dates.map(d => d.format('MM/DD/YYYY')).join(splitter);
            }}
          />
        </div>

        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span className="label">First Day of Week</span>
              <select defaultValue={firstDayOfWeek} onChange={e => this.onChangefirstDayOfWeek(e)}>
                {
                  weekDays.map((weekName, index) => (
                    <option
                      key={index}
                      value={index}
                    >
                      {weekName}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="row">
              <span>Min Date </span>
              <input
                defaultValue={minDate.format('MM/DD/YYYY')}
                onBlur={e => this.onChangeMinDate(e)}
              />
            </div>
            <div className="row">
              <span>Max Date </span>
              <input
                defaultValue={maxDate.format('MM/DD/YYYY')}
                onBlur={e => this.onChangeMaxDate(e)}
              />
            </div>
            <div className="row">
              <span className="label">Select Mode</span>
              <select defaultValue={selectMode} onChange={e => this.onChangeSelectMode(e)}>
                {
                  Object.keys(SelectionMode).map((key, index) => (
                    <option
                      key={index}
                      value={SelectionMode[key]}
                    >
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="row">
              <span>value {selectMode === SelectionMode.MULTIPLE && '(split by \n)'}</span>
              {
                selectMode === SelectionMode.MULTIPLE &&
                <textarea
                  ref={(v) => { this.value = v; }}
                  defaultValue={value.map(d => d.format('MM/DD/YYYY')).join(splitter)}
                  onBlur={e => this.onChangeValue(e)}
                />
              }
              {
                selectMode === SelectionMode.SINGLE &&
                <input
                  ref={(v) => { this.value = v; }}
                  defaultValue={value[0] && value[0].format('MM/DD/YYYY')}
                  onBlur={e => this.onChangeValue(e)}
                />
              }
            </div>
            <div className="row">
              <span>Disable Dates (split by \n) </span>
              <textarea
                defaultValue={disabledDates.map(d => d.format('MM/DD/YYYY')).join(splitter)}
                onBlur={e => this.onChangedisabledDates(e)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
