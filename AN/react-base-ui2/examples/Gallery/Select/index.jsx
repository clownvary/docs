import React from 'react';
import classNames from 'classnames';
import Select from 'src/components/Select';
import selectMD from 'doc/api/components/Select/Select.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

const optionData = [];
for (let i = 10; i < 36; i += 1) {
  const option = i.toString(36) + i;
  optionData.push({
    text: `${option} text`,
    secondaryText: `secondary ${option} text`,
    value: option
  });
}

const couponData = [];
for (let i = 10; i < 36; i += 1) {
  couponData.push({
    text: 'All Daycare Program',
    dest: 'For Nolan Niu onlu',
    value: `No.${i}`,
    code: `${i}`,
    rebate: '-30%',
    number: `No.${i}`
  });
}

export default class Page extends DemoPage {
  static meta = {
    name: 'Select',
    icon: 'icon-bars',
    documents: [selectMD],
    description: 'This example demonstrates the features of Select.'
  };

  getInitSettings() {
    return initSettings;
  }

  componentDidMount() {
    const demoBody = document.querySelector('.an-demopage__body');
    demoBody.style.position = 'relative';
  }

  optionFooterRenderer = () => (
    <a href="javascript:void(0)" className="an-multi-select-option-footer">
      <div className="an-multi-select-option-footer__add-icon">
        <i className="icon icon-add" />
      </div>
      <div className="an-multi-select-option-footer__add-text">
        Add New Family Member
      </div>
    </a>
  );

  optionItemRenderer = (itemProps) => {
    const {
      optionItemPrefixCls, className, selected, option, disabled, active, mouseEvents
    } = itemProps;
    const itemClassName = classNames(`${optionItemPrefixCls}`, className, {
      [`${optionItemPrefixCls}__active`]: !disabled && active,
      [`${optionItemPrefixCls}__selected`]: selected,
      [`${optionItemPrefixCls}__disabled`]: disabled
    });
    return (
      <div
        className={itemClassName}
        {...mouseEvents}
      >
        <div className={`${optionItemPrefixCls}__selection`}>
          {selected && <i className="icon icon-check" />}
        </div>
        <div className={`${optionItemPrefixCls}__content`}>
          <div className={`${optionItemPrefixCls}__text`}>
            {option.text}
          </div>
          <div className={`${optionItemPrefixCls}__secondary`}>
            {option.secondaryText}
          </div>
        </div>
      </div>
    );
  };

  conponItemRenderer = (itemProps) => {
    const {
      optionItemPrefixCls, className, selected, option, disabled, active, mouseEvents
    } = itemProps;
    const itemClassName = classNames(`${optionItemPrefixCls}`, className, {
      [`${optionItemPrefixCls}__active`]: !disabled && active,
      [`${optionItemPrefixCls}__selected`]: selected,
      [`${optionItemPrefixCls}__disabled`]: disabled
    }, 'coupon-item');
    return (
      <div
        className={itemClassName}
        {...mouseEvents}
      >
        <div className={`${optionItemPrefixCls}__content`}>
          <div>
            <div className="coupon-item__text">
              {option.text}
            </div>
            <div className="coupon-item__desc">
              <div>{option.dest}</div>
              <div>{option.number}</div>
            </div>
          </div>
          <div>
            <div className="coupon-item__type">Up to</div>
            <div className="coupon-item__rebate">{option.rebate}</div>
          </div>
        </div>
      </div>
    );
  };

  handleComboboxChange = (value) => {
    this.log(`combobox change${value}`);
  }

  getMenuContainer = () => document.querySelector('.an-demopage__body');

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['resetFilterAfterSelect', 'placeholder', 'optionItemRenderer', 'optionFooterRenderer', 'inputValue']);
    return (
      <div>
        <div className="select-group">
          <span>multiple:</span>
          <Select
            {...props}
            optionData={optionData}
            getMenuContainer={this.getMenuContainer}
            optionFooterRenderer={props.optionFooterRenderer ? this.optionFooterRenderer : null}
            optionItemRenderer={props.optionItemRenderer ? this.optionItemRenderer : null}
          />
        </div>
        <div className="select-group">
          <span>combobox:</span>
          <Select
            {...props}
            className="coupon-select"
            creatable
            onChange={this.handleComboboxChange}
            optionData={couponData}
            getMenuContainer={this.getMenuContainer}
            optionFooterRenderer={false}
            optionItemRenderer={props.optionItemRenderer ? this.conponItemRenderer : null}
            optionFilterFn={(options, value) => options.filter(({ number }) => number.toLowerCase()
              .indexOf(value.toLowerCase()) > -1)}
          />
        </div>

        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc.'}</p>
      </div>
    );
  }
}
