import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import { DefaultCSSPrefix } from '../../consts';

/**
 * PropertyList
 * @name PropertyList
 *
 * @example
 *
 * const items = [
 *  {
 *    name: 'Company Name',
 *    value: 'companyName',
 *    className: 'item-class-test'
 *  },
 *  {
 *    name: 'Customer Type',
 *    value: 'customerType',
 *    onRenderValue: item => (<span>{item.value || '-'}</span>)
 *  },
 * {
 *     name: 'Company Address',
 *     value: 'companyAddress'
 *   },
 *   { name: 'Profession', value: 'profession' },
 *   { name: 'Phone', value: 'phone' },
 *   { name: 'Address', value: '', showNullName: true }
 * ];
 * ]
 *
 * <PropertyList showColon items={items} />
 */

 /**
 * @desc Props for PropertyList
 * @name PropertyList Props
 * @const
 */

const propTypes = {
  /**
   * @type {String}
   * @desc Specified class name for the PropertyList.
   */
  className: PropTypes.string,
  /**
   * @type {String}
   * @desc Determines the skin prefix of PropertyList.
   */
  prefix: PropTypes.string,
  /**
   * @type {Boolean}
   * @desc whether to display : after label text
   */

  showColon: PropTypes.bool,

  /**
   * @type {Array}
   * @desc Determines the data of list. It's element is an object, a total of these attributes:
   *
   * @property {String|Number|Element} name label name
   * @property {String|Number|Element|Array} value label value
   * @property {String} className Specify item specified class name
   * @property {Boolean} showNullName When the item value is empty, the control name is displayed
   * @property {Function} onRenderValue Function to customize the cell value
   * @property {Function} onRenderName Function to customize the cell name
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.element
      ]),
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.array,
        PropTypes.element
      ]),
      className: PropTypes.string,
      onRenderValue: PropTypes.func,
      onRenderName: PropTypes.func
    })
  ).isRequired
};

/**
 * UI Component PropertyList
 * */
export default class PropertyList extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = {
    prefix: `${DefaultCSSPrefix}`,
    showColon: false,
    items: []
  }

  static renderValue(itemValue) {
    let value = itemValue;
    if (isArray(value)) {
      value = (
        <div className="an-property-list__item__list">
          {
            value.map((chlidnValue, index) => (
              <span key={index}>{chlidnValue}</span>
            ))
          }
        </div>
      );
    }

    if (value) {
      return (
        <span>{value}</span>
      );
    }

    return null;
  }

  renderName(item) {
    const { showColon } = this.props;
    const { onRenderName } = item;
    let name;
    if (showColon && isString(item.name)) {
      name = `${item.name}:`;
    } else {
      name = item.name;
    }

    if (isFunction(onRenderName)) {
      name = onRenderName(item);
    }

    if (name) {
      return (<span>{name}</span>);
    }

    return null;
  }

  render() {
    const { items, prefix, className } = this.props;
    const listClassName = `${prefix}-property-list`;

    const propertyListCls = classNames(listClassName, className);

    return (
      <div className={propertyListCls}>
        {
          items.map((item, index) => {
            const { onRenderValue } = item;
            let { value } = item;

            if (isFunction(onRenderValue)) {
              value = onRenderValue(item);
            }

            if (!isEmpty(value) || isNumber(value) || item.showNullName) {
              return (
                <div key={index} className={classNames(`${listClassName}__item`, item.className)}>
                  {this.renderName(item)}
                  {
                    PropertyList.renderValue(value)
                  }
                </div>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}
