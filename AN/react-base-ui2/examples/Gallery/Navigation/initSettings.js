

import Navigation from 'src/services/navigation';
import { createActionSpec, createTextPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';
import pickProps from '../../App/utils/pickProps';


const onRedirect = (settings) => {
  const props = pickProps(settings, ['redirectUrl', 'showConfirm', 'showLoading', 'useReplace']);
  Navigation.redirect(props.redirectUrl, { ...props });
};

const onReload = (settings) => {
  const props = pickProps(settings, ['showLoading', 'showConfirm']);
  Navigation.reload({ ...props });
};

const onState = (settings) => {
  const props = pickProps(settings, ['isRunning']);
  Navigation.setState(props.isRunning);
  alert(`isRunning: ${Navigation.isRunning}`);
};

const initSettings = {
  redirectUrl: createTextPropSpec('redirectUrl', 'redirectUrl', 'http://css/'),
  showConfirm: createBooleanPropSpec('showConfirm', 'showConfirm', false),
  showLoading: createBooleanPropSpec('showLoading', 'showLoading', true),
  useReplace: createBooleanPropSpec('useReplace', 'useReplace', false),
  redirect: createActionSpec('redirect', 'redirect', onRedirect),
  reload: createActionSpec('reload', 'reload', onReload),
  isRunning: createBooleanPropSpec('isRunning', 'isRunning', false),
  setState: createActionSpec('setState', 'setState', onState)

};

export default initSettings;
