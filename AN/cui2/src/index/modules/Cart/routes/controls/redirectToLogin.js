import isLoginCustomerId from 'shared/utils/isLoginCustomerId';

const redirectToLogin = (callback, systemSettings) => {
  const customerId = systemSettings.getIn(['user', 'customerid']);
  if (!isLoginCustomerId(customerId)) {
    window.location = systemSettings.get('login_url');
  } else {
    callback();
  }
};

export default redirectToLogin;
