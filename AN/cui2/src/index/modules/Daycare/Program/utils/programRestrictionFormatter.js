const formatGradeRestriction = (minGradeRestriction, maxGradeRestriction) => {
  if (!minGradeRestriction && !maxGradeRestriction) {
    return '';
  }
  if (minGradeRestriction && !maxGradeRestriction) {
    return `Grade ${minGradeRestriction}+`;
  }
  if (!minGradeRestriction && maxGradeRestriction) {
    return `Up to Grade ${maxGradeRestriction}`;
  }
  if (maxGradeRestriction !== minGradeRestriction) {
    return `Grade ${minGradeRestriction} - ${maxGradeRestriction}`;
  }
  return `Grade ${minGradeRestriction}`;
};

const checkAgeRestrictionSpecified = ageRestriction =>
  ageRestriction.filter(val => val !== 0).length > 0;

const checkAgeRestrictionSpecifiedYearOnly = ageRestriction =>
  ageRestriction[0] >= 1 && ageRestriction.filter(val => val !== 0).length === 1;

const getAgeRestrictionYearOnlyDisplayText = ageRestriction =>
  `${ageRestriction[0]} yr${ageRestriction[0] > 1 ? 's' : ''}`;

const ageRestrictionUnits = ['y', 'm', 'w'];

const getAgeRestrictionDisplayText = ageRestriction => ageRestrictionUnits.reduce(
  (result, unit, idx) => {
    if (ageRestriction[idx] === 0) {
      return result;
    }
    return `${result} ${ageRestriction[idx]}${unit}`;
  },
  '').trim();

const formatAgeRestriction = (minAgeRestriction, maxAgeRestriction) => {
  const minAgeRestrictionSpecified = checkAgeRestrictionSpecified(minAgeRestriction);
  const maxAgeRestrictionSpecified = checkAgeRestrictionSpecified(maxAgeRestriction);
  if (!minAgeRestrictionSpecified && !maxAgeRestrictionSpecified) {
    return '';
  }
  const minAgeRestrictionSpecifiedYearOnly =
    checkAgeRestrictionSpecifiedYearOnly(minAgeRestriction);
  if (minAgeRestrictionSpecified && !maxAgeRestrictionSpecified) {
    const minAgeText = minAgeRestrictionSpecifiedYearOnly ?
      getAgeRestrictionYearOnlyDisplayText(minAgeRestriction) :
      getAgeRestrictionDisplayText(minAgeRestriction);
    return `${minAgeText} +`;
  }
  const maxAgeRestrictionSpecifiedYearOnly =
    checkAgeRestrictionSpecifiedYearOnly(maxAgeRestriction);
  if (!minAgeRestrictionSpecified && maxAgeRestrictionSpecified) {
    const maxAgeText = maxAgeRestrictionSpecifiedYearOnly ?
      getAgeRestrictionYearOnlyDisplayText(maxAgeRestriction) :
      getAgeRestrictionDisplayText(maxAgeRestriction);
    return `Up to ${maxAgeText}`;
  }
  if (minAgeRestrictionSpecifiedYearOnly && maxAgeRestrictionSpecifiedYearOnly) {
    if (minAgeRestriction[0] === maxAgeRestriction[0]) {
      return getAgeRestrictionYearOnlyDisplayText(minAgeRestriction);
    }
    return `${minAgeRestriction[0]} - ${getAgeRestrictionYearOnlyDisplayText(maxAgeRestriction)}`;
  }
  return `${getAgeRestrictionDisplayText(minAgeRestriction)} - ${getAgeRestrictionDisplayText(maxAgeRestriction)}`;
};

export {
  formatAgeRestriction,
  formatGradeRestriction
};
