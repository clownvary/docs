import React from 'react';
import { string, bool, func, number, shape, oneOfType } from 'prop-types';
import Checkbox from '../Checkbox';
import { DataAccess as da, decodeHtmlStr } from '../../utils';


/**
 * Default PropTypes of Dropdown item.
 */
const ItemPropTypes = {
  /**
   * Id identifier.
   */
  id: string,
  /**
   * Item data list.
   */
  data: shape({ text: string, value: oneOfType([string, number]) }),
  /**
   * Whether or not to show text tip when hovering the item.
   */
  showTextTip: bool,
  /**
   * Custom class name..
   */
  ccs: string.isRequired,
  /**
   * Click event handler.
   */
  click: func.isRequired,
  key: number
};


/** Default Props for Dropdown */
const ItemProps = {
  data: [],
  showTextTip: true
};

/** UI component that displays Dropdown Item with variant settings.*/
class Item extends React.PureComponent {
  static displayName = 'Dropdown-item'
  static defaultProps = ItemProps;
  static propTypes = ItemPropTypes;

  constructor(props) {
    super(props);

    const { isCheck } = props;
    this.state = {
      isCheck
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isCheck: nextProps.isCheck });
  }

  render() {
    const { id, data, showTextTip, ccs, click, errorInfo, key, ...rest } = this.props;
    const text = decodeHtmlStr(da.get(data, 'text'));
    return (
      <li
        id={id}
        key={key || da.get(data, 'value')}
        title={showTextTip && text}
        className={`${ccs} aaui-flexbox`}
        onClick={() => { click(da.get(data, 'value')); }}
        {...rest}
      >
        <Checkbox
          checked={this.state.isCheck}
          value={false}
          disabled={!this.state.isCheck && errorInfo.length > 0}
        >
          <span className="dropdown-item__label">{text}</span>
        </Checkbox>
      </li>
    );
  }
}

export default Item;
