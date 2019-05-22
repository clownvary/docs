import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageFooter from 'shared/components/PageFooter';
import { tealiumService } from 'shared/services';
import TealiumPages from 'shared/services/tealium/consts/pages';
import Receipt from './components/receipt';

export class Balance extends React.PureComponent {

  static contextTypes = {
    configurations: PropTypes.object
  }

  componentDidMount() {
    tealiumService.sendView(TealiumPages.BALANCE);
  }

  render() {
    const { configurations } = this.context;

    return (
      <div>
        <Receipt balance={this.props.balance} />
        <PageFooter specificContent={configurations.get('page_onlinepayonaccount_footer')} />
      </div>
    );
  }
}

export default connect(
  state => ({
    balance: state.modules.Cart.Balance.balance
  })
)(Balance);
