import Loading from './Loading';
import { show, hide, reset } from './util';

Loading.show = function () {
  return show.apply(undefined, arguments);
};

Loading.hide = function () {
  return hide();
};

Loading.reset = function () {
  return reset();
};

export default Loading;