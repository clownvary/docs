import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tag from '../Tag';

const SelectChoicePropTypes = {
  prefixCls: PropTypes.string,
  /**
   * current choice item value
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * determine the choice is the last one
   */
  last: PropTypes.bool,
  /**
   * callback function triggered by user click choice remove icon
   */
  onChoiceRemove: PropTypes.func,
  /**
   * function to customize the choice item
   */
  choiceRenderer: PropTypes.func
};

const SelectChoiceDefaultProps = {
  removeIcon: true,
  choiceRenderer: (props) => {
    const { choicePrefixCls, text } = props;
    return (<span className={`${choicePrefixCls}__content`}>{text}</span>);
  }
};

class SelectChoice extends Component {
  static propTypes = SelectChoicePropTypes;
  static defaultProps = SelectChoiceDefaultProps;

  onChoiceRemove = (e) => {
    const { value, onChoiceRemove } = this.props;
    e.preventDefault();
    e.stopPropagation();
    return onChoiceRemove && onChoiceRemove(value);
  }

  render() {
    const { prefixCls, last, choiceRenderer } = this.props;
    const choicePrefixCls = `${prefixCls}-selection-choice`;
    const choiceNode = choiceRenderer({ ...this.props, choicePrefixCls });
    return (
      <li
        className={classNames(choicePrefixCls, {
          [`${choicePrefixCls}__last`]: last
        })}
      >
        <Tag
          className={`${choicePrefixCls}__tag`}
          closable
          onClose={this.onChoiceRemove}
        >
          {choiceNode}
        </Tag>
      </li>
    );
  }
}

export default SelectChoice;
