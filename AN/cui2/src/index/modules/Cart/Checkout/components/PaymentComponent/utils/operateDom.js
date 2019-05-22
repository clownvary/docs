import PaymentModules from '../../../consts/paymentModules';

const scrollByClass = (className) => {
  const scrollY = document.getElementsByClassName(className)[0].offsetTop;
  window.scrollTo(0, scrollY);
};

const scrollByModule = (moduleName) => {
  let className;
  if (moduleName === PaymentModules.PRIMARY) {
    className = 'primary-payment';
  } else if (moduleName === PaymentModules.SECONDARY) {
    className = 'secondary-payment';
  }

  if (className) {
    scrollByClass(className);
  }
};

export default {
  scrollByClass,
  scrollByModule
};
