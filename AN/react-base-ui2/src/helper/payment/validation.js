const trimString = sInString => sInString.replace(/\s+$/g, '');

export const maskCard = (ccNumber) => {
  ccNumber = trimString(ccNumber);
  const digitsToShow = ccNumber.length > 4 ? 4 : ccNumber.length;
  return `xxx${ccNumber.substring(ccNumber.length - digitsToShow)}`;
};

// //////////////////////////////////////////////////////////////////
//
//  Determine credit card types
//
// //////////////////////////////////////////////////////////////////
const ccValidationVisa = 1;
const ccValidationMc = 2;
const ccValidationAmex = 3;
const ccValidationDiners = 4;
const ccValidationDiscover = 5;
const ccValidationJcb = 6;

const validChecksum = (myCcNumber) => {
  let checkSum = 0;
  let oddToggle = false;
  for (let i = myCcNumber.length - 1; i >= 0; i -= 1, oddToggle = !oddToggle) {
    const digit = parseInt(myCcNumber.charAt(i), 10);
    if (isNaN(digit)) return false;
    if (oddToggle) {
      if (digit * 2 > 9) {
        checkSum += 1 + ((digit * 2) % 10);
      } else {
        checkSum += digit * 2;
      }
    } else {
      checkSum += digit;
    }
  }

  return (checkSum % 10) === 0;
};

const masterCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 16) return false;
  return cc.indexOf('51') === 0
        || cc.indexOf('52') === 0
        || cc.indexOf('53') === 0
        || cc.indexOf('54') === 0
        || cc.indexOf('55') === 0;
};

export const amexCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 15) return false;
  return cc.indexOf('34') === 0
        || cc.indexOf('37') === 0;
};

export const visaCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 13 && cc.length !== 16) return false;
  return cc.indexOf('4') === 0;
};

export const dinersCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 14) return false;
  return cc.indexOf('300') === 0
        || cc.indexOf('301') === 0
        || cc.indexOf('302') === 0
        || cc.indexOf('303') === 0
        || cc.indexOf('304') === 0
        || cc.indexOf('305') === 0
        || cc.indexOf('36') === 0
        || cc.indexOf('38') === 0;
};

export const discoverCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 16) return false;
  return cc.indexOf('6011') === 0
        || cc.indexOf('622') === 0
        || cc.indexOf('64') === 0
        || cc.indexOf('65') === 0;
};

export const jcbCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length === 16 && cc.indexOf('3') === 0) return true;
  if (cc.length !== 15) return false;
  return cc.indexOf('2131') === 0 || cc.indexOf('1800') === 0;
};

export const cardValidation = (cc) => {
    // remove all space in the credit card number
  cc = cc.replace(/\s/g, '');
  if (masterCard(cc)) return ccValidationMc;
  if (amexCard(cc)) return ccValidationAmex;
  if (visaCard(cc)) return ccValidationVisa;
  if (dinersCard(cc)) return ccValidationDiners;
  if (discoverCard(cc)) return ccValidationDiscover;
  if (jcbCard(cc)) return ccValidationJcb;
  return 0;
};
