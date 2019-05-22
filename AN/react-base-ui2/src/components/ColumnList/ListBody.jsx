import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import throttle from 'lodash/throttle';
import ListItem from './ListItem';

const ListBodyPropTypes = {
  WCAG: PropTypes.bool,
  disabled: PropTypes.bool,
  showTips: PropTypes.bool,
  shouldRenderCheckAll: PropTypes.bool,
  activeIndex: PropTypes.number,
  keyField: PropTypes.string,
  maxHeight: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  selectedKeys: PropTypes.array,
  onBlur: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemRender: PropTypes.func,
  onEndReached: PropTypes.func
};

const ListBodyProps = {
  WCAG: false,
  disabled: false,
  showTips: false,
  shouldRenderCheckAll: false,
  activeIndex: 0,
  keyField: 'id',
  maxHeight: '',
  data: [],
  columns: [],
  selectedKeys: [],
  onBlur: null,
  onItemClick: null,
  onItemRender: null,
  onEndReached: null
};

class ListBody extends React.PureComponent {
  static displayName = 'ListBody';
  static propsType = ListBodyPropTypes;
  static defaultProps = ListBodyProps;

  componentDidMount() {
    const { onEndReached } = this.props;
    this.addOnScrollListener(onEndReached);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onEndReached && nextProps.onEndReached !== this.props.onEndReached) {
      this.addOnScrollListener(nextProps.onEndReached);
    }
  }

  addOnScrollListener(onEndReached) {
    if (isFunction(onEndReached)) {
      this.body.onscroll = throttle(() => {
        const { clientHeight, scrollHeight, scrollTop } = this.body;
        (scrollHeight - clientHeight - scrollTop <= 50) && onEndReached();
      }, 300);
    } else {
      this.body.onscroll = null;
    }
  }

  renderCheckAll() {
    const {
      columns,
      showTips,
      disabled,
      activeIndex,
      allChecked,
      onItemFocus,
      onCheckAllChange
    } = this.props;

    const key = 'all';
    const index = -1;
    const focused = index === activeIndex;
    const itemAll = {
      text: 'All',
      checked: allChecked
    };

    return (<ListItem
      key={key}
      item={itemAll}
      index={index}
      columns={columns}
      showTips={showTips}
      focused={focused}
      disabled={disabled}
      selected={allChecked}
      onClick={onCheckAllChange}
      onFocus={(e) => { onItemFocus(e, { index }); }}
    />);
  }

  render() {
    const {
      data,
      onBlur,
      columns,
      keyField,
      showTips,
      maxHeight,
      activeIndex,
      selectedKeys,
      showCheckAll,
      onItemClick,
      onItemFocus,
      onItemRender,
      disabled: globalDisabled
    } = this.props;

    return (
      <div
        ref={(body) => { this.body = body; }}
        className={'an-columnlist__body'}
        style={{ maxHeight }}
        onBlur={onBlur}
      >
        <ul role="list">
          {showCheckAll && this.renderCheckAll()}
          {data.map((item, index) => {
            const disabled = globalDisabled || item.disabled;
            const focused = index === activeIndex;
            const selected = selectedKeys.indexOf(item[keyField]) > -1;

            return (<ListItem
              key={item[keyField]}
              item={item}
              index={index}
              columns={columns}
              showTips={showTips}
              disabled={disabled}
              focused={focused}
              selected={selected}
              onClick={onItemClick}
              onFocus={onItemFocus}
              onRender={onItemRender}
            />);
          })}
        </ul>
      </div>
    );
  }
}

export default ListBody;
