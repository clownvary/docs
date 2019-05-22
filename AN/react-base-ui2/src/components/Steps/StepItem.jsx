import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  /**
   * to specify the status. It will be automatically set by current of Steps if
   * not configured. Optional values are, wait, process, finish, error, other
   */
  status: PropTypes.string,
  /**
   * icon of the step, optional property
   */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  /**
   * description of the step, optional property
   */
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  /**
   * title of the step
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ])
};

export default class StepItem extends React.Component {
  static propTypes = propTypes;

  render() {
    const { className, prefixCls, style, status, icon, description,
      title, currentIndex } = this.props;
    const stepItemCls = classNames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--${status}`]: true,
      [`${prefixCls}__item--one`]: currentIndex === 1
    }, className);

    const iconTypeCls = classNames('icon', {
      'icon-check-thin': status === 'finish',
      'icon-close': status === 'error'
    });

    return (
      <div
        className={stepItemCls}
        style={style}
      >
        <div className={`${prefixCls}__item-tail`} />
        <div className={`${prefixCls}__item-icon`}>
          {
            icon || (
              <div className="icon-box">
                <span>{currentIndex}</span>
                {
                  (status === 'finish' || status === 'error') &&
                  <div className="finish-icon">
                    <i className={iconTypeCls} />
                  </div>
                }
              </div>
            )
          }
        </div>
        <div className={`${prefixCls}__item-content`}>
          <div className={`${prefixCls}__item-content-box`}>
            <div className={`${prefixCls}__item-title`}>
              {title}
            </div>
            {description && <div className={`${prefixCls}__item-description`}>{description}</div>}
          </div>
        </div>
      </div>
    );
  }
}
