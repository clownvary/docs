import React from 'react';
import PCIIframe from 'src/components/PCI';
import PCIIframeMd from 'doc/api/components/PCIIframe/PCIIframe.md';
import DemoPage from '../../App/components/DemoPage';

export default class Page extends DemoPage {
  static meta = {
    name: 'PCI Iframe',
    icon: 'icon-cc-visa',
    documents: [PCIIframeMd],
    description: 'This example demonstrates the features of PCIIframe. Please access http://localhost:8080/linux05/servlet/getPCICheckoutIframeUrl.sdi to get the latest Iframe Url by manual.'
  }

  renderContent() {
    return (
      <div>
        <span className="field">
          <PCIIframe
            getPCICheckoutIframeUrl={() => Promise.resolve('https://checkoutcui-vip.int.aw.dev.activenetwork.com/checkout/index/payment-method?code=b00c11c5-62fe-43a5-9d64-9be62f1d946d')}
            getPCICheckoutPaymentInfoBySessionId={() => Promise.resolve({
              amsAccountId: 'test',
              creditCardTypeId: 1,
              creditCardTypeName: 'test',
              maskedCardNumber: 'xxx1111',
              expiration: '092025'
            })}
            source="an-react-base-ui"
            debug
            getInstance={(instance) => { this.instance = instance; }}
          />
        </span>
        <div>
          <button onClick={() => this.instance.showIframePromise()}>show</button>
          <button
            onClick={() => this.instance.submitIframePromise()
              .then(data => console.log('get data', data))
              .catch(err => console.error('get error', err))
            }
          >submit</button>
        </div>
      </div>
    );
  }
}
