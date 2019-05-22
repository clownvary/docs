import { fromJS } from 'immutable';

export function getRequiredWaivers(waivers) {
  const errors = {};
  const waiversItems = waivers || fromJS([]);
  waiversItems.forEach((item) => {
    const waiverIndex = item.get('waiverIndex');
    const displayPermitSelected = item.get('displayPermitSelected');
    const agreeToWaiverSelected = item.get('agreetowaiverSelected');
    const isRequired = item.get('isRequired');

    if (displayPermitSelected && isRequired && !agreeToWaiverSelected) {
      errors[waiverIndex] = 'Required';
    }
  });
  return errors;
}
