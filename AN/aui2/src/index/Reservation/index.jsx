import React from 'react';
import { connect } from 'react-redux';
import { isIE } from 'react-base-ui/lib/utils/browser';
import Alert from 'react-base-ui/lib/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import { Authority, AuthorityID, AuthorityType } from 'shared/authorities';
import { raiseUnrecognizedAuthCode } from 'shared/actions/Authority';
import BreadCrumb from 'shared/components/BreadCrumb';
import HelpLink from 'shared/components/HelpLink';
import Sticky from 'shared/components/Sticky';
import { AUIModuleLink } from 'shared/consts';
import 'shared/components/CancelPermit/index.less';
import PermitFilter from './components/PermitFilter';
import PermitAction from './components/PermitAction';
import PermitGrid from './components/PermitGrid';
import LinkGroup from './components/LinkGroup';

import './index.less';

export class Reservation extends UIComponent {

  constructor(props) {
    super(props);
    this.state = {
      topOffset: isIE() ? 218 : 214,
      bottomOffset: 150
    };
  }

  render() {
    const {
      filters,
      actions,
      permits,
      error,
      runningCart,
      breadCrumb,
      initialData
    } = this.props;

    if (Authority.isDisplayed(AuthorityID.RESERVATIONS_PAGE)) {
      return (
        <section className="reservation-page">
          <div className="an-page">
            <Sticky
              stickyStyle={{ zIndex: 2 }}
              ref={(s) => { this._refs.fixedHeader = s; }}
            >
              <div className="fixed-header">
                <div className="page-title">
                  <h1>Reservations</h1>
                  <div className="tool-bar">
                    <LinkGroup runningCart={runningCart} initialData={initialData} />
                    <HelpLink pageName="Permits.jsp" />
                  </div>
                </div>
                {
                  permits.get('isPermitAccessible') === 'false' &&
                  <Alert type="warning" noClose className="permit-access-message">
                    <span>{permits.get('message')}</span>
                  </Alert>
                }
                <PermitFilter filters={filters} initialData={initialData} />
                <PermitAction
                  createdByMe={filters.get('createdByMe')}
                  selectedPermit={permits.get('selectedPermit')}
                  actions={actions}
                  initialData={initialData}
                />
              </div>
            </Sticky>
            <PermitGrid
              permits={permits}
              filters={filters}
              topOffset={this.state.topOffset}
              bottomOffset={this.state.bottomOffset}
            />
            <Error error={error} reload />
          </div>
          {
            !__STATIC__ &&
              (<BreadCrumb
                isPromptUser={false}
                breadCrumb={breadCrumb}
                tabLabel={AUIModuleLink.facility}
              />)
          }
        </section>
      );
    } else if (Authority.isHidden(AuthorityID.RESERVATIONS_PAGE)) {
      return null;
    }
    return <Error error={error} />;
  }

  componentDidMount() {
    const types = [AuthorityType.DISPLAYED, AuthorityType.HIDDEN];
    if (Authority.typeNotIn(AuthorityID.RESERVATIONS_PAGE, types)) {
      this.props.raiseUnrecognizedAuthCode(AuthorityID.RESERVATIONS_PAGE);
    }

    if (isIE()) {
      // In IE we need to force the Sticky to "recomputeState" to get a proper width
      // after all elements rendered. It is because IE ignores the scroll bar width
      // at the beginning of rendering the _refs.fixedHeader thus lead the _refs.fixedHeader
      // got a wrong width
      this._refs.fixedHeader.recomputeState();
    }
  }

  componentDidUpdate() {
    const topOffset = this._refs.fixedHeader.refs.children.scrollHeight;
    if (this.props.permits.get('message') && topOffset !== this.state.topOffset) {
      const bottomOffset = this.state.bottomOffset + (topOffset - this.state.topOffset);
      /* eslint-disable */
      this.setState({ topOffset, bottomOffset }, this._refs.fixedHeader.recomputeState);
    }
  }
}

export default connect(
  state => ({
    filters: state.filters,
    actions: state.actions,
    permits: state.permits,
    error: state.error,
    runningCart: state.runningCart,
    breadCrumb: state.breadCrumb,
    initialData: state.initialData
  }),
  {
    raiseUnrecognizedAuthCode
  }
)(Reservation);
