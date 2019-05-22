export default ({ originalBaseUrl, loginedCustomerId, type, callback }) =>
  `${originalBaseUrl}/ActiveNet_Home/AddFamilyMemberOnline.sdi?customer_id=${loginedCustomerId}&type=${type}&callback=${callback}&from_cui_redesign=true`;
