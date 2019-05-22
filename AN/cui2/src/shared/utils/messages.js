import {
  showError as showMessage,
  showSuccess,
  showInfo,
  showWarning,
  clearSuccess,
  clearInfo,
  clearWarning,
  clearError,
  clearAll,
  configMessageService
} from 'react-base-ui/lib/services/message';


export const showError = (message, options = { appendMode: true }, isScrollToTop = true) => {
  showMessage(message, options);
  isScrollToTop && window.scrollTo(0, 0);
};

export {
  showSuccess,
  showInfo,
  showWarning,
  clearSuccess,
  clearInfo,
  clearWarning,
  clearError,
  clearAll,
  configMessageService
};
