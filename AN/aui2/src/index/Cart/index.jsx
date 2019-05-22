import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import BreadCrumb from 'shared/components/BreadCrumb';
import HelpLink from 'shared/components/HelpLink';
import Reservation from './components/Reservation';
import './index.less';

class Cart extends UIComponent {
  render() {
    const { error, reservation, breadCrumb, initialData } = this.props;

    return (
      <section className="an-page cart-page" style={{ height: window.forcedSetIFrameHeight }}>
        {__STATIC__ ?
          undefined :
          <BreadCrumb
            isPromptUser
            breadCrumb={breadCrumb}
            isSilientOutsideWorkflow={initialData.isOutOfWorkflow}
          />
        }
        <div className="page-title">
          <h1>Cart</h1>
          <HelpLink pageName="Cart.jsp" />
        </div>
        <Reservation reservation={reservation} initialData={initialData} />
        <Error error={error} />
      </section>
    );
  }
}

export default connect(
  state => ({
    reservation: state.reservation,
    error: state.error,
    breadCrumb: state.breadCrumb,
    initialData: state.initialData
  })
)(Cart);
