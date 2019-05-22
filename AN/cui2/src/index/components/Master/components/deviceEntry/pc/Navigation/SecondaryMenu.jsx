import radium from 'radium';
import React, { Component } from 'react';
import classNames from 'classnames';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { getSecondaryMenuStyles } from 'index/initializers/theme/customize';
import SecondaryMenuColumn from './SecondaryMenuColumn';

export class SecondaryMenu extends Component {

  static contextTypes = {
    theme: PropTypes.object
  }

  static propTypes = {
    row: PropTypes.number,
    column: PropTypes.number,
    items: PropTypes.shape([React.PropTypes.object]),
    className: PropTypes.string,
    expandSecondaryMenuAction: PropTypes.func
  }

  static defaultProps = {
    row: 5,
    column: 3
  }

  onKeyDown(e) {
    const index = parseInt(e.target.getAttribute('data-index'), 0);
    const keyCode = e.keyCode || e.which;
    const { pranetMenuName, items = fromJS([]) } = this.props;
    const size = items.size;
    const isFocusNextDom = (keyCode === 9 && !e.shiftKey && index === size - 1);
    const isFocusLastDom = (keyCode === 9 && e.shiftKey && index === 0);

    (isFocusNextDom || isFocusLastDom) && this.props.expandSecondaryMenuAction(e, pranetMenuName);
  }

  /**
   * Filter and groupby items according to row and column properties.
   * @return {[immutable]}
   */
  getGroupedItems() {
    const { row, column, items = fromJS([]) } = this.props;
    let _increase = 0;
    // Always use itmes.last ("See All Categories") to replace the last one of the filtered items.
    return items.filter((item, i) => i < row * column).map((item, i, l) =>
      ((i + 1 === l.size) ? items.last() : item)
    ).groupBy((item, i) => {
      if (i >= _increase * row) {
        _increase += 1;
      }
      return _increase;
    });
  }

  render() {
    const { theme } = this.context;
    const { className } = this.props;

    return (
      <div
        className={classNames('nav-secondary-menu', className)}
        style={getSecondaryMenuStyles(theme)}
        onKeyDown={e => this.onKeyDown(e)}
      >
        {
          this.getGroupedItems().toArray().map((items, i) => (
            <SecondaryMenuColumn key={i} items={items} />
            ))
        }
      </div>
    );
  }
}

export default radium(SecondaryMenu);
