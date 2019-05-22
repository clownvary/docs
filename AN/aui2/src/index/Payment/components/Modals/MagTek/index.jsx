import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import { webStartServiceInstallHelpUrl } from 'shared/utils/webStartServiceHelper';
import { WSIHelper } from 'shared/components/WSIHelper';
import MagtekIPAD from './MagtekIPAD';
import MagtekDynamag from './MagtekDynamag';

import * as magtekActions from '../../../actions/modals/Magtek';
import { fetchCardtypeAction } from '../../../actions/modals/NewCreditCard';
import { retrieveCommunicationIframe } from '../../../utils/magtekFun';

export class MagTek extends UIComponent {

  componentDidMount() {
    retrieveCommunicationIframe();
  }

  /**
   * Windows Service client helper.
   */
  renderWSIHelper = (isShow) => {
    const { initialData } = this.props;
    const webStartServicehelpURL = `${initialData.helpFileFolder}${webStartServiceInstallHelpUrl}`;

    return isShow && <WSIHelper url={webStartServicehelpURL} />;
  }

  render() {
    const { data, initialData: { ccMagesafeDeviceType } } = this.props;
    const cardTypeList = data.get('cardTypeList') ? data.get('cardTypeList').data : [];
    return (
      <div className={data.get('isShowModal') ? '' : 'u-hidden'}>
        {
          ccMagesafeDeviceType === 'MagtekDynamag' ?
            <MagtekDynamag
              cardType={'Credit Card'}
              cardTypeList={cardTypeList}
              payAccmount={data.get('totalFee')}
              setCardInfo={this.props.setCardInfo}
              hideModalAction={this.props.hideMagtekModalAction}
              payment={this.props.payment}
              generateWalletID={this.props.generateWalletID}
              setAMSAccountInfo={this.props.setAMSAccountInfo}
              showModal={data.get('isShowModal')}
              serverError={data.get('error')}
              setServerError={this.props.setServerError}
              renderWSIHelper={this.renderWSIHelper}
              isShowSaveCardInformation={data.get('isShowSaveCardInformation')}
            /> :
            <MagtekIPAD
              cardType={'Credit Card'}
              cardTypeList={cardTypeList}
              payAccmount={data.get('totalFee')}
              setCardInfo={this.props.setCardInfo}
              hideModalAction={this.props.hideMagtekModalAction}
              payment={this.props.payment}
              generateWalletID={this.props.generateWalletID}
              setAMSAccountInfo={this.props.setAMSAccountInfo}
              showModal={data.get('isShowModal')}
              serverError={data.get('error')}
              setServerError={this.props.setServerError}
              renderWSIHelper={this.renderWSIHelper}
              isShowSaveCardInformation={data.get('isShowSaveCardInformation')}
            />
        }
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchCardtypeAction();
  }
}

export default connect(
  null,
  {
    fetchCardtypeAction,
    ...magtekActions
  }
)(MagTek);
