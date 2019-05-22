import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Sticky, StickyContainer } from 'react-base-ui/lib/components/Sticky';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import PageFooter from 'shared/components/PageFooter';
import { tealiumService } from 'shared/services';
import TealiumPages from 'shared/services/tealium/consts/pages';
import classNames from 'classnames';
import NoTransactions from './components/NoTransactions';
import OrderSummary from './components/OrderSummary';
import QuickDonation from './components/QuickDonation';
import Transactions from './components/Transactions';
import Waiver from './components/Waiver';

import { initCartPageAsyncAction } from './actions/common';

import './index.less';

export class ShoppingCart extends React.PureComponent {

  static contextTypes = {
    getWording: PropTypes.func,
    configurations: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isSticky: false
    };
  }

  componentDidMount() {
    this.props.initCartPageAsyncAction()
      .then(() => tealiumService.sendView(TealiumPages.SHOPPINGCART));
  }

  handleChange = ({ isSticky }) => {
    this.setState({
      isSticky
    });
  }

  render() {
    const {
      quickdonation,
      transactions,
      waiver,
      coupon,
      checkout,
      responsive: { isSm, isMd },
      ordersummary
    } = this.props;
    const { configurations } = this.context;
    const { isSticky } = this.state;
    const isMobileOrTablet = isSm || isMd;

    return (
      <div className="module-shopping-cart">
        <StickyContainer>
          <div>
            {
              transactions.get('participants').size || transactions.get('payOnAccount').size ?
                <div className="an-grid an-col-mg-30">
                  <div className="an-col an-col-8-12 an-md-col-1-1 an-sm-col-1-1 an-md-col-order-1 an-sm-col-order-1">
                    <Transactions transactions={transactions} />
                    <Waiver waiver={waiver} checkout={checkout} />
                  </div>
                  <div className="an-col an-col-4-12 an-md-col-1-1 an-sm-col-1-1 an-lg-col-order-1">
                    {
                      isMobileOrTablet ?
                        <div className="ordersummary--sm-and-md-mod">
                          <Sticky
                            topOffset={0}
                            fullScreen={isMobileOrTablet}
                            onChange={this.handleChange}
                          >
                            <div
                              className={classNames('ordersummary-donation-wrapper', {
                                'ordersummary-donation--sticky': isSticky
                              })}
                            >
                              <OrderSummary
                                data={ordersummary}
                                isSticky={isSticky}
                                isCollapsable={isMobileOrTablet}
                                waiver={waiver}
                                coupon={coupon}
                              />
                            </div>
                          </Sticky>
                          <QuickDonation quickdonation={quickdonation} />
                        </div>
                      :
                        <Sticky topOffset={-30} onChange={this.handleChange}>
                          <div className="ordersummary-donation-wrapper">
                            <OrderSummary
                              data={ordersummary}
                              isSticky={isSticky}
                              isCollapsable={isMobileOrTablet}
                              waiver={waiver}
                              coupon={coupon}
                            />
                            <QuickDonation quickdonation={quickdonation} />
                          </div>
                        </Sticky>
                    }
                  </div>
                </div> : <NoTransactions />
            }
            <PageFooter specificContent={configurations.get('page_newcuishoppingcart_footer')} />
          </div>
        </StickyContainer>
      </div>
    );
  }
}

export default withResponsiveProvider(connect(
  // istanbul ignore next
  state => ({
    transactions: state.modules.Cart.ShoppingCart.transactions,
    quickdonation: state.modules.Cart.ShoppingCart.quickdonation,
    waiver: state.modules.Cart.ShoppingCart.waiver,
    checkout: state.modules.Cart.ShoppingCart.checkout,
    ordersummary: state.modules.Cart.ShoppingCart.ordersummary,
    coupon: state.modules.Cart.ShoppingCart.coupon
  }),
  {
    initCartPageAsyncAction
  }
)(ShoppingCart));
