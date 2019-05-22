import { fromJS } from 'immutable';
import expect from 'expect';

import agreenment from 'index/modules/Cart/Checkout/utils/agreement';

const configurations = fromJS({ show_pad_agreement_for_ecp: true });

const text = 'Test {agreementType} one world';

describe('index/modules/Cart/Checkout/utils/agreenment', () => {
  it('Show agreement ECP correcttlly ', () => {
    const result = agreenment.getAgreementType(configurations, text, false);
    expect(result).toEqual(text.replace('{agreementType}', 'PAD'));
  });

  it('Show agreement ACH correcttlly and isLabelText is false ', () => {
    const configuration = fromJS({ show_pad_agreement_for_ecp: false });
    const result = agreenment.getAgreementType(configuration, text, false);
    expect(result).toEqual(text.replace('{agreementType}', 'ACH'));
  });

  it('Show agreement ACH correcttlly and isLabelText is true', () => {
    const configuration = fromJS({ show_pad_agreement_for_ecp: false });
    const result = agreenment.getAgreementType(configuration, text, true);
    expect(result).toEqual(text.replace('{agreementType}', ''));
  });
});
