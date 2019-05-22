import radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { initCartPageAsyncAction } from 'index/modules/Cart/ShoppingCart/actions/common';
import { Link } from 'shared/components/Link';
import PropTypes from 'prop-types';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

import reloadMyCart from '../../common/reloadMyCart';

export class MyCartItem extends BaseItem {
  static propTypes = {
    item: PropTypes.shape({}),
    itemStyles: PropTypes.shape({}),
    cartCount: PropTypes.number
  }

  reloadMyCart = reloadMyCart;

  render() {
    const { getWording } = this.context;
    const { item, itemStyles, cartCount } = this.props;
    const wording = getWording('my_cart_label');

    return (
      <li style={itemStyles.myCart} className="mycart">
        <Link
          to={item.get('url')}
          activeClassName="active"
          onClick={() => this.reloadMyCart(item.get('url'))}
        >
          <Icon
            name="shopping-cart"
            aria-label="shopping cart icon"
          />
          <FormattedDyncMessage value={wording || item.get('title')} />
          { cartCount ? ` (${cartCount})` : '' }
        </Link>
      </li>
    );
  }
}

export default connect(
  null,
  {
    initCartPageAsyncAction
  }
)(withRouter(radium(MyCartItem)));
