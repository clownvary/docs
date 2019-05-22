import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import take from 'lodash/take';
import debounce from 'lodash/debounce';
import { Icon } from 'react-base-ui/lib/components/SVG';
import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';

import Item from './Item';

import './index.less';

class ListBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    expandAble: PropTypes.bool,
    onExpandChange: PropTypes.func,
    maxDisplayCount: PropTypes.number,
    ariaLabelExpand: PropTypes.string,
    ariaLabelCollapse: PropTypes.string
  };

  static defaultProps = {
    horizontal: true,
    expandAble: false,
    ariaLabelExpand: 'toggle expand',
    ariaLabelCollapse: 'toggle collapse'
  }

  static Item = Item;

  constructor(props) {
    super(props);

    this.state= { expanded: false };
  }

  componentDidMount() {
    this.calcOffset();
  }

  componentDidUpdate() {
    this.calcOffset();
  }

  calcOffset = () => {
    const { expandAble } = this.props;

    if(expandAble && this.containerNode && this.collapseNode) {
      const listItems = this.containerNode.getElementsByClassName('listbox-item');
      const lastItem = listItems[listItems.length - 1];
      const itemHeight = lastItem.offsetHeight;

      this.collapseNode.style.height = `${itemHeight}px`;
    }
  }

  toggleCollapse = debounce(() => {
    const { expanded } = this.state;
    const { onExpandChange } = this.props;

    this.setState({ expanded: !expanded });
    onExpandChange && onExpandChange(!expanded);
  }, 100);

  getListItems(children) {
    return React.Children.toArray(children).filter(child =>
      child.type && child.type.displayName && child.type.displayName === Item.displayName
    );
  }

  onContainerRef = (node) => {
    this.containerNode = node;
  }

  onCollapseRef = (node) => {
    this.collapseNode = node;
  }

  render() {
    const  { expanded } = this.state;
    const {
      className, horizontal, children,
      expandAble, maxDisplayCount, ariaLabelExpand,ariaLabelCollapse,
      ...rest
    } = this.props;
    const classes = classNames(
      'listbox',
      { 'listbox-horizontal': horizontal },
      className
    );

    let listItems = this.getListItems(children);

    const isOutOfMaxDisplayCount = listItems.length > maxDisplayCount;

    if (expandAble && !expanded && maxDisplayCount) {
      listItems = take(listItems, maxDisplayCount + 1);
    }

    return (
      <div
        ref={this.onContainerRef}
        className="listWrapper"
      >
        <div
          className={classes}
          role="list"
          {...rest}
        >
          {listItems}
        </div>
        {
          isOutOfMaxDisplayCount && expandAble &&
            <div className="listbox-collapse an-col-1-1">
              {
                !expanded &&
                  <div
                    ref={this.onCollapseRef}
                    className="listbox-collapse__modal"
                  />
              }
              <div className="listbox-collapse__trigger">
                <a onClick={this.toggleCollapse} aria-expanded={expanded} href="javascript:void(0);">
                  <Icon
                    type="link"
                    name={`chevron-${expanded ? 'up' : 'down'}`}
                  />
                <WCAGHiddenLabel value={expanded ? ariaLabelCollapse : ariaLabelExpand} />
                </a>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default ListBox;
