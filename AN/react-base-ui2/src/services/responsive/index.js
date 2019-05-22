import Responsive from './Responsive';
import withResponsiveProvider, { responsivePropTypes } from './components/Provider';
import {
  attachResizeEvent,
  detachResizeEvent
} from './resizeEvent';

export {
  Responsive,
  attachResizeEvent,
  detachResizeEvent,
  withResponsiveProvider,
  responsivePropTypes
};

export default Responsive.getInstance();
