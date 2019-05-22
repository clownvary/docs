const validateAgreement = (agreement = {}) => !agreement.required || !!agreement.value;

export default validateAgreement;
