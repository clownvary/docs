import React from 'react';
import reduce from 'lodash/reduce';
import moment from 'moment';
import Dropdown from 'src/components/Dropdown';
import { Calendar, SelectionMode } from '../../src/components/Calendar';
import Input from '../../src/components/Input';
import Checkbox from '../../src/components/Checkbox';
import { Dock } from '../../src/consts';

import '../base.less';
import '../layout.less';
import './app.less';

const splitter = '\n';

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.dockStyles = reduce(Dock, (result, value, key) => {
      if (key !== '__esModule') {
        result.push({ text: key, value });
      }

      return result;
    }, []);

    this.state = {
      isCalendarConfigChanged: false
    };
  }

  onPopUpDatepicker(e) {
    const popupOptions = {
      target: e.target,
      ...this.popupOptions };

    this.datePicker = Calendar.popup(this.calendarProps, popupOptions);
    this.datePicker.result.catch(() => {});
  }
  /* eslint-disable  react/sort-comp */
  popupOptions = {
    showMask: false,
    noCollision: true,
    showShadow: false,
    distance: 0,
    autoClose: 0,
    closeByClick: true,
    dockStyle: Dock.BOTTOM_LEFT,
    onBeforeCancel: () => {
      console.log('samples on before cancel ', Date.now());
      return true;
    },
    onAfterCancel: () => {
      console.log('samples on onAfterCancel ', Date.now());
      return true;
    }
  }

  calendarProps = {
    firstDayOfWeek: moment().localeData().firstDayOfWeek(),
    min: moment().add(-10, 'days'),
    max: moment().add(10, 'days'),
    disabledDates: [3, 4, 5, 6].map(c => moment().add(c, 'days')),
    selectMode: SelectionMode.SINGLE,
    value: [moment().add(2, 'days')],

    valueChanged: (value) => {
      console.log(value.map(d => d.format('MM/DD/YYYY')));
      this.updateConfig('value', value);
      if (this.calendarProps.selectMode === SelectionMode.SINGLE) {
        this.updateConfig('calendarInputValue', value[0].format('MM/DD/YYYY'));
      } else {
        this.updateConfig('calendarInputValue', `Selected ${value.length} dates`);
      }

      if (this.calendarProps.selectMode === SelectionMode.SINGLE && this.datePicker) {
        this.datePicker.cancel();
      }
    }
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
      this.updateConfig('min', minDate);
    }
  }

  onChangeMaxDate(e) {
    const maxDate = moment(e.target.value);
    if (maxDate.isValid()) {
      this.updateConfig('max', maxDate);
    }
  }

  onChangeSelectMode(e) {
    this.updateConfig('selectMode', parseInt(e.target.value, 10));
  }

  onChangeValue(e) {
    const values = e.target.value.split(splitter).map(d => moment(d)).filter(m => m.isValid());
    this.updateConfig('value', values);
  }

  updateConfig(configName, newConfigValue) {
    this.calendarProps[configName] = newConfigValue;

    this.setState({
      isCalendarConfigChanged: !this.state.isCalendarConfigChanged
    });
  }

  render() {
    const {
      min: minDate,
      max: maxDate,
      disabledDates,
      firstDayOfWeek,
      selectMode,
      value: calendarValue,
      calendarInputValue
    } = this.calendarProps;
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div>
        <div>
          <Input
            className="target"
            value={calendarInputValue}
            ref={(el) => { this.targetElement = el; }}
            onFocus={e => this.onPopUpDatepicker(e)}
          />
        </div>
        <div className="side-bar side-bar-popup">
          <div className="options">
            <div className="row">
              <span>Dock Style</span>
              <Dropdown
                data={this.dockStyles}
                defaultValue={this.popupOptions.dockStyle}
                onChange={({ value }) => { this.popupOptions.dockStyle = value; }}
              />
            </div>
            <div className="row">
              <Checkbox
                value={this.popupOptions.showMask}
                defaultChecked={this.popupOptions.showMask}
                onChange={(e) => { this.popupOptions.showMask = e.target.checked; }}
              >Show Mask</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.popupOptions.showShadow}
                defaultChecked={this.popupOptions.showShadow}
                onChange={(e) => { this.popupOptions.showShadow = e.target.checked; }}
              >Show Shadow</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.popupOptions.distance !== 0}
                defaultChecked={this.popupOptions.distance !== 0}
                onChange={(e) => { this.popupOptions.distance = e.target.checked ? 10 : 0; }}
              >Distance (10px)</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.popupOptions.noCollision}
                defaultChecked={this.popupOptions.noCollision}
                onChange={(e) => { this.popupOptions.noCollision = e.target.checked; }}
              >No Collision</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.popupOptions.autoClose !== 0}
                defaultChecked={this.popupOptions.autoClose !== 0}
                onChange={(e) => { this.popupOptions.autoClose = e.target.checked ? 2000 : 0; }}
              >Auto Close (2s)</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.popupOptions.closeByClick}
                defaultChecked={this.popupOptions.closeByClick}
                onChange={(e) => { this.popupOptions.closeByClick = e.target.checked; }}
              >Close by Click</Checkbox>
            </div>
          </div>
        </div>
        <div className="side-bar side-bar-calendar">
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
              <span>value {selectMode === SelectionMode.MULTIPLE && '(split by \\n)'}</span>
              {
                selectMode === SelectionMode.MULTIPLE &&
                <textarea
                  ref={(v) => { this.value = v; }}
                  defaultValue={calendarValue.map(d => d.format('MM/DD/YYYY')).join(splitter)}
                  value={calendarValue.map(d => d.format('MM/DD/YYYY')).join(splitter)}
                  onBlur={e => this.onChangeValue(e)}
                />
              }
              {
                selectMode === SelectionMode.SINGLE &&
                <input
                  ref={(v) => { this.value = v; }}
                  defaultValue={calendarValue[0].format('MM/DD/YYYY')}
                  value={calendarValue[0].format('MM/DD/YYYY')}
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
