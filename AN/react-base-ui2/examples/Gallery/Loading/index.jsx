import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Loading',
    icon: 'icon-loading-m icon-spin',
    description: 'This example demonstrates the features of Loading Service.'
  };

  getInitSettings() {
    return initSettings;
  }
}
