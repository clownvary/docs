import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StepItem from './StepItem';
import { DefaultCSSPrefix } from '../../consts';

const propTypes = {
  prefixCls: PropTypes.string,
  /**
   * className to apply
   */
  className: PropTypes.string,
  /**
   * to specify the direction of the step bar, horizontal or vertical
   */
  direction: PropTypes.string,
  /**
   * place title and description with horizontal or vertical direction
   */
  labelPlacement: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
   /**
   * to specify the status of current step, can be set to one of
   * the following values, wait process finish error
   */
  currentStatus: PropTypes.oneOf(['wait', 'process', 'finish', 'error']).isRequired,
  style: PropTypes.object,
   /**
   * to set the current step, counting from 1. You can overwrite this state by using status of Step
   */
  current: PropTypes.number,
  /**
   * Data record array to be displayed
   */
  dataSource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node
      ]),
      style: PropTypes.object,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node
      ]),
      status: PropTypes.string,
      description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node
      ]),
      className: PropTypes.string
    }))
  ])
};

export default class Steps extends React.Component {
  static propTypes = propTypes;
  static StepItem = StepItem;
  static defaultProps = {
    prefixCls: `${DefaultCSSPrefix}-steps`,
    dataSource: [],
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    style: {},
    current: 1,
    currentStatus: 'process'
  }

  getSetpItemClassName(className, index) {
    const { prefixCls, dataSource, children } = this.props;
    let nextItem;
    if (children) {
      const nextChilren = children[index + 1] || {};
      nextItem = nextChilren.props || {};
    } else {
      nextItem = dataSource[index + 1] || {};
    }

    return classNames(className, {
      [`${prefixCls}__item-next--${nextItem.status}`]: nextItem.status
    });
  }

  getSetpStatus(item, index) {
    const { currentStatus, current } = this.props;
    let status;
    if (item.status) {
      status = item.status;
    } else if (index + 1 === current) {
      status = currentStatus;
    } else if (index + 1 < current) {
      status = 'finish';
    } else {
      status = 'wait';
    }
    return status;
  }

  renderItems() {
    const { prefixCls, dataSource, children } = this.props;

    if (children) {
      const newChildren = [];
      React.Children.forEach(children, (child, index) => {
        const childProps = {
          prefixCls,
          key: index,
          currentIndex: index + 1,
          className: this.getSetpItemClassName(child.className, index),
          status: this.getSetpStatus(child.props, index)
        };
        newChildren.push(React.cloneElement(child, childProps));
      });
      return newChildren;
    }

    return dataSource.map((item, index) => {
      if (!item) {
        return null;
      }
      return (
        <StepItem
          key={index}
          currentIndex={index + 1}
          style={item.style}
          className={this.getSetpItemClassName(item.className, index)}
          prefixCls={prefixCls}
          title={item.title}
          icon={item.icon}
          status={this.getSetpStatus(item, index)}
          description={item.description}
        />
      );
    });
  }

  render() {
    const { prefixCls, style, className, direction, labelPlacement,
      dataSource, children } = this.props;

    if (!dataSource.length && !children) {
      return null;
    }
    const classString = classNames(
      prefixCls,
      `${prefixCls}--${direction}`,
      `${prefixCls}-label--${labelPlacement}`,
      className
    );

    return (
      <div className={classString} style={style}>
        {this.renderItems()}
      </div>
    );
  }
}
