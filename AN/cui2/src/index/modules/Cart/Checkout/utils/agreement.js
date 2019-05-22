import agreementTypes from '../consts/agreementTypes';

const getAgreementType = (configurations, text, isLabelText) => {
  const isShowPADAgreement = configurations.get('show_pad_agreement_for_ecp');
  let result = '';
  if (isShowPADAgreement) {
    result = text.replace('{agreementType}', agreementTypes.PAD);
  } else {
    result = isLabelText ? result = text.replace('{agreementType}', '') :
    text.replace('{agreementType}', agreementTypes.ACH);
  }

  return result;
};


export default {
  getAgreementType
};
