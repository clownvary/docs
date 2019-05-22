import Modal from './Modal';
import confirm from './confirm';

Modal.confirm = function (props) {
  return confirm(props);
};

export default Modal;