import { dialog } from 'src/services/dialog';
import AccountView from './AccountView';

import {
  createActionSpec
} from '../../App/utils/createPropSpec';

const onShow = () => {
  const d = dialog(
    'Create a new account',
    AccountView,
    {
      name: 'Sam',
      password: 'Hi',
      onChange: (data, view) => {
        if (data.name === 'james') {
          view && view.update({
            error: 'This person is registed already.'
          });
        }
      }
    },
    {
      confirmText: 'Create',
      cancelText: 'Cancel',
      showCancel: true
    });
};

const initSettings = {
  button: createActionSpec('button', 'Show DialogBox', onShow)
};

export default initSettings;
