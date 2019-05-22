import { createOptionPropSpec, createTextPropSpec, createActionSpec } from '../../App/utils/createPropSpec';
import { Loading } from '../../../src/services/loading';
import pickProps from '../../App/utils/pickProps';

const delayTimeOptions = [
  { text: '0.5s', value: 500 },
  { text: '1s', value: 1000 },
  { text: '2s', value: 2000 },
  { text: '5s', value: 5000 }
];

const pageLoading = new Loading({});

const onShowLoading = (settings) => {
  const props = pickProps(settings, ['delayTime', 'text']);
  pageLoading.options = props;
  pageLoading.show();
  setTimeout(() => pageLoading.hide(), props.delayTime);
};

const initSettings = {
  text: createTextPropSpec('text', 'Loading Text', 'Loading...'),
  delayTime: createOptionPropSpec('delayTime', 'Delay Time', 1000, delayTimeOptions, true),
  onShowLoading: createActionSpec('onShowLoading', 'Show Loading', onShowLoading)
};

export default initSettings;
