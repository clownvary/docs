import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import * as PropSpecType from '../../consts/PropSpecType';

const TAB_SETTINGS = 'tab_settings';
const TAB_CONSOLE = 'tab_console';

export default class SettingsPanel extends React.PureComponent {

  constructor(props) {
    super(props);

    this.refCache = {};
    this.state = {
      open: false,
      settings: cloneDeep(props.settings),
      activeTab: TAB_SETTINGS
    };

    this.logMsg = '';

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.renderPropOption = this.renderPropOption.bind(this);
    this.renderPropMoment = this.renderPropMoment.bind(this);
    this.renderPropText = this.renderPropText.bind(this);
    this.renderPropObject = this.renderPropObject.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
  }

  componentDidMount() {
    this.layoutSettings();
  }

  componentDidUpdate() {
    this.layoutSettings();
  }

  onTabClick(e) {
    if (e.currentTarget.id) {
      this.setState(
        {
          activeTab: e.currentTarget.id
        }
      );
    }
  }

  onChange(name, value, notify = true) {
    const { settings = {} } = this.state;
    const { onChange } = this.props;
    const spec = settings[name];
    if (spec) {
      spec.value = value;
      if (notify && isFunction(onChange)) {
        onChange({ name, value, spec, settings });
      }
    }
  }

  layoutSettings() {
    const { activeTab } = this.state;

    if (this.columns && activeTab === TAB_SETTINGS) {
      const groups = ReactDOM.findDOMNode(this.columns).querySelectorAll('.group');
      for (let i = 0; i < groups.length; i += 1) {
        const g = groups[i];
        const $g = $(g);
        $g.width('auto');
        const $last = $g.find('.field:last');
        if ($last.length > 0) {
          const newWidth = ($last.position().left - $g.position().left) +
          $last.outerWidth(true);
          $g.width(newWidth + 20);
        }
      }
    }
  }

  updateField(spec) {
    if (this[spec.name]) {
      switch (spec.type) {
        case PropSpecType.BOOLEAN:
          this[spec.name].checked = spec.value;
          break;
        default:
          this[spec.name].value = spec.toString();
          break;
      }
    }

    this.onChange(spec.name, spec.value, false);
  }

  log(s) {
    const m = moment();
    s = `< ${m.format('HH:MM:SS')} ${s}`;

    this.logMsg = this.logMsg ? `${this.logMsg}\n${s}` : s;
    this.setState({
      output: this.logMsg
    }, () => {
      this.consoleTextArea.scrollTop = this.consoleTextArea.scrollHeight;
    });
    this.forceUpdate();
  }

  renderLabel(spec) {
    const { name, label } = spec;
    return (
      <span htmlFor={name} className="field__label">{label || name}</span>
    );
  }

  renderPropCheckbox(spec) {
    const { name, value } = spec;
    const onChange = (ev) => {
      const newValue = ev.target.checked;
      this.onChange(name, newValue);
    };

    return (
      <div key={name} className="field">
        <input
          type="checkbox"
          onChange={onChange}
          checked={value}
          id={name}
          ref={(c) => { this[name] = c; }}
        />
        {this.renderLabel(spec)}
      </div>);
  }

  renderPropOption(spec) {
    const { name, value, options, asNumber } = spec;

    const onChange = (e) => {
      const targetValue = e.target.value;
      let newValue = asNumber ? parseInt(targetValue, 10) : targetValue;
      if (isArray(options)) {
        const targetOption = find(options, option =>
          (asNumber ? parseInt(option.value, 10) === newValue : option.value === targetValue));
        if (targetOption.originalValue) {
          newValue = targetOption.originalValue;
        }
      }
      this.onChange(name, newValue);
    };

    let listOption;
    if (isArray(options)) {
      listOption = options.map((o, index) => (
        <option
          key={`${name}_${index}`}
          value={isNil(o.value) ? o : o.value}
        >
          {isNil(o.text) ? o : o.text}
        </option>
      ));
    } else if (isObject(options)) {
      listOption = Object.keys(options).map((key, index) => (
        <option
          key={`${name}_${index}`}
          value={options[key]}
        >
          {key}
        </option>));
    }

    return (
      <div key={name} className="field spread">
        {this.renderLabel(spec)}
        <select
          defaultValue={value}
          onChange={onChange}
          ref={(c) => { this[name] = c; }}
        >
          {listOption}
        </select>
      </div>);
  }

  renderPropText(spec) {
    const { name, value } = spec;
    const onBlur = (e) => {
      this.onChange(name, e.target.value);
    };

    return (
      <div key={name} className="field spread">
        {this.renderLabel(spec)}
        <input
          onBlur={onBlur}
          defaultValue={value}
          ref={(c) => { this[name] = c; }}
        />
      </div>);
  }

  renderPropObject(spec) {
    const { name, value } = spec;
    const onBlur = (e) => {
      /* eslint-disable  no-eval */
      try {
        this.onChange(name, eval(`(${e.target.value})`));
      } catch (err) {
        this.log(err);
        this.onChange(name, e.target.value);
      }
    };

    return (
      <div key={name} className="field spread">
        {this.renderLabel(spec)}
        <input
          onBlur={onBlur}
          defaultValue={JSON.stringify(value)}
          ref={(c) => { this[name] = c; }}
        />
      </div>);
  }

  renderPropNumber(spec) {
    const { name, value } = spec;
    const onBlur = (e) => {
      this.onChange(name, parseInt(e.target.value, 10));
    };

    return (
      <div key={name} className="field spread">
        {this.renderLabel(spec)}
        <input
          type="number"
          onBlur={onBlur}
          defaultValue={value}
          ref={(c) => { this[name] = c; }}
        />
      </div>);
  }

  renderPropMoment(spec) {
    const { name, value, format = 'MM/DD/YYYY' } = spec;
    const onBlur = (e) => {
      const mResult = moment(e.target.value, format);
      if (!mResult.isValid()) {
        alert('Please input valid moment value');
        e.target.focus();
      } else {
        this.onChange(name, mResult);
      }
    };

    const mValue = moment(value);
    const text = mValue.format(format);
    return (
      <div key={name} className="field spread">
        {this.renderLabel(spec)}
        <input
          placeholder={format}
          onBlur={onBlur}
          defaultValue={text}
          ref={(c) => { this[name] = c; }}
        />
      </div>);
  }

  renderAction(spec) {
    const { name, label, callBack } = spec;
    const { settings = {} } = this.state;
    const onClick = () => {
      if (isFunction(callBack)) {
        callBack(settings, spec, this.log.bind(this));
      }
    };

    return (
      <div key={name} className="field">
        <button
          onClick={onClick}
          ref={(c) => { this[name] = c; }}
        > {label} </button>
      </div>);
  }

  render() {
    const { settings = {} } = this.state;
    const { className } = this.props;

    const textSettings = [];
    const objectSettings = [];
    const boolSettings = [];
    const numberSettings = [];
    const enumSettings = [];
    const momentSettings = [];
    const actions = [];

    Object.keys(settings).forEach((name) => {
      const spec = settings[name];
      switch (spec.type) {
        case PropSpecType.TEXT:
          textSettings.push(spec);
          break;

        case PropSpecType.OBJECT:
          objectSettings.push(spec);
          break;

        case PropSpecType.BOOLEAN:
          boolSettings.push(spec);
          break;

        case PropSpecType.NUMBER:
          numberSettings.push(spec);
          break;

        case PropSpecType.ENUM:
          enumSettings.push(spec);
          break;

        case PropSpecType.MOMENT:
          momentSettings.push(spec);
          break;

        case PropSpecType.ACTION:
          actions.push(spec);
          break;

        default:
          break;
      }
    });

    const { activeTab, output } = this.state;
    return (
      <div className={classNames('an-settingspanel', className)}>
        <div className="an-settingspanel__tabs">
          <span className={`tab label ${activeTab === TAB_SETTINGS ? 'label-success active' : 'label-danger'}`} id={TAB_SETTINGS} onClick={this.onTabClick}>
            Settings
          </span>
          <span className={`tab label ${activeTab === TAB_CONSOLE ? 'label-success active' : 'label-danger'}`} id={TAB_CONSOLE} onClick={this.onTabClick}>
            Console
          </span>
        </div>
        <div
          className={`an-settingspanel__tabcontent tab-settings ${activeTab !== TAB_SETTINGS ? 'u-hidden' : ''}`}
          ref={(c) => { this.columns = c; }}
        >
          {!isEmpty(boolSettings) &&
            <span className="group">
              <div className="col">
                <div className="group-label">ON/OFF</div>
                {boolSettings.map(this.renderPropCheckbox)}
              </div>
            </span>
          }
          {!isEmpty(enumSettings) &&
            <span className="group">
              <div className="col">
                <div className="group-label">Options</div>
                {enumSettings.map(this.renderPropOption)}
              </div>
            </span>
          }
          {(!isEmpty(numberSettings) ||
            !isEmpty(textSettings) ||
            !isEmpty(momentSettings) ||
            !isEmpty(objectSettings)
          ) &&
            <span className="group">
              <div className="col">
                <div className="group-label">Inputs</div>
                {textSettings.map(this.renderPropText)}
                {objectSettings.map(this.renderPropObject)}
                {numberSettings.map(this.renderPropNumber)}
                {momentSettings.map(this.renderPropMoment)}
              </div>
            </span>
          }
          {!isEmpty(actions) &&
            <span className="group">
              <div className="col">
                <div className="group-label">Actions</div>
                {actions.map(this.renderAction)}
              </div>
            </span>
          }
        </div>
        <div className={`an-settingspanel__tabcontent tab-console ${activeTab !== TAB_CONSOLE ? 'u-hidden' : ''}`}>
          <div
            className="col full" onDoubleClick={() => {
              this.logMsg = '';
              this.setState({ output: '' });
            }}
          >
            <div className="group-label">Output</div>
            <span className="tip">Double click to clear</span>
            <textarea
              className="console"
              readOnly
              value={output}
              ref={(c) => { this.consoleTextArea = c; }}
            />
          </div>
        </div>
      </div>
    );
  }
}
