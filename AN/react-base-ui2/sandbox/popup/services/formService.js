import { createPopupService } from 'src/services/popup';
import Form from '../components/form';

const onCancel = popup => () => {
  popup.cancel();
};
const onOK = popup => (value) => {
  popup.change(value);
};

const formService = createPopupService(Form, { onCancel, onOK });

export default formService;
