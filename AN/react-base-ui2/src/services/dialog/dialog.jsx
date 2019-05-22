import DialogBox from '../../components/DialogBox';

const dialog = (title = 'Dialog', contentView, contentProps, options = {}) => {
  const instance = DialogBox.popup({}, {
    title,
    contentView,
    contentProps,
    ...options
  });

  return instance.result;
};

export default dialog;
