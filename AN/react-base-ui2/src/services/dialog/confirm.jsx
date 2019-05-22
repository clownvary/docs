import dialog from './dialog';

/**
 * @function confirm
 * @description Pops up confirmation dialogbox, and waits user's response in async mode.
 * @returns {Promise} Returns a promise where the success function
 * is called if the user choose the OK action,
 * or the failed function is called if the user choose the Cancel action.
 * @param {string} message -
 * A message string to indicate or query user's choice.
 * @param {object} [options] - Options that determine the behaviors of the confirmation.
 * @param {string} [options.title=Confirm] - Title text of the confirmation dialogbox.
 * @param {boolean} [options.showCancel=false] -
 * Whether to display the cancel button. By default, only the OK button is displayed.
 * @param {string} [options.cancelText=Cancel] -
 * The text of the Cancel button.
 * @param {string} [options.confirmText=OK] -
 * The text of the OK button.
 * @param {string} [options.className] - Custom class name
 * @memberof DialogBox
 * @example
 * import { confirm } from 'react-base-ui/lib/services/dialog'
 *
 * confirm('Session time out');
 *
 * //or
 *
 * confirm('Are you sure you want to delete the transaction?',
 * {showCancel: true, cancelText: 'DELETE'})
 * .then(()=>{//...do delete...})
 * .catch(()=>{//...canceled...});
 *
 */
const confirm = (message, options = {}) => {
  const { title = 'Confirm', value, ...rest } = options;

  return dialog(title, null, { message, value }, { ...rest });
};

export default confirm;
