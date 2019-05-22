import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';

const ListItemPropTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  disabled: PropTypes.bool,
  showTips: PropTypes.bool,
  selected: PropTypes.bool,
  focused: PropTypes.bool,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onRender: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onRender: PropTypes.func
  }))
};

const ListItemProps = {
  item: {},
  index: 0,
  focused: false,
  selected: false,
  disabled: false,
  showTips: false,
  onFocus: identity,
  onClick: identity,
  onRender: null,
  columns: []
};

export default class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = ListItemPropTypes;
  static defaultProps = ListItemProps;

  onFocus = (e) => {
    const { index, focused, onFocus } = this.props;
    focused || onFocus(e, { index });
  }

  onClick = (e) => {
    const { item, index, onClick } = this.props;
    onClick(e, { item, index });
  }

  renderItem = (item, itemProps, context) =>
    context.columns.map((column, columnIndex) => {
      const value = item[column.field];
      const props = {
        key: columnIndex,
        disabled: itemProps.disabled,
        className: classNames('item-column', column.className)
      };
      context.column = column;
      context.columnIndex = columnIndex;
      return column.render(value, props, context);
    })

  render() {
    const {
      item,
      index,
      columns,
      showTips,
      focused,
      selected,
      disabled,
      onRender
    } = this.props;

    const itemProps = { disabled };
    const context = { item, index, columns };

    return (
      <li
        role="option"
        tabIndex={0}
        onClick={this.onClick}
        onFocus={this.onFocus}
        aria-selected={selected}
        title={showTips ? item.text : null}
        className={classNames('item', item.className, {
          disabled,
          selected,
          focused
        })}
      >
        {
          isFunction(onRender)
            ? onRender(item, itemProps, context)
            : this.renderItem(item, itemProps, context)
        }
      </li>
    );
  }
}
