export const getDigitalStyleByDiscountType = (discountType) => {
  let style;
  switch (discountType) {
    case 0:
      style = 'currency';
      break;
    case 1:
      style = 'percent';
      break;
    default:
      break;
  }
  return style;
};

export const getParticipantsString = appliableParticipants => appliableParticipants.map(({
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName
  }) => {
  let name = '';
  if (firstName) {
    name = firstName;
  }
  if (middleName) {
    name += `${name ? ' ' : ''}${middleName}`;
  }
  if (lastName) {
    name += `${name ? ' ' : ''}${lastName}`;
  }
  return name;
}).filter(s => !!s).join(', ');

export const generateCouponUniqueId = coupon =>
  `coupon-unique-id_${coupon.coupon_id}_${coupon.dcprogram_id}`;
