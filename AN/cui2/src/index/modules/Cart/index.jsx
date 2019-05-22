import React from 'react';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import Balance from './Balance';
import { routes } from './routes';

export {
  ShoppingCart,
  Checkout,
  Confirmation,
  Balance,
  routes
};

export default class Cart extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  static defaultProps = {};

  render() {
    return (
      <div className="an-module-container">
        { this.props.children }
      </div>
    );
  }

}
