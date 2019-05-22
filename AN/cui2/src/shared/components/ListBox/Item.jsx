import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'react-base-ui/lib/components/SVG';

class Item extends React.PureComponent {
  static displayName = 'ListBox.Item';

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string
  };

  render() {
    const { children, className, icon, ...rest } = this.props;
    return (
      <div
        className={classNames('listbox-item', className)}
        role="listitem"
        {...rest}
      >
        {icon && (
          <div className="listbox-item__icon">
            <Icon name={icon} />
          </div>
        )}
        <div className="listbox-item__content">
          {children}
        </div>
      </div>
    );
  }
}

export default Item;
