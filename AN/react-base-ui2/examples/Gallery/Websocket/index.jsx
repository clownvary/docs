import React from 'react';
import WSService from 'src/services/websocket';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';


export default class Page extends DemoPage {
  static meta = {
    name: 'Websocket Service',
    icon: 'icon-globe',
    description: 'This example demonstrates the features of Websocket Service.'
  }

  constructor(props) {
    super(props);

    const { settings } = this.state;
    this.state.url = settings.url.value;
    this.state.port = settings.port.value;

    WSService.setup({ url: this.state.url, port: this.state.port, isDebug: true });
  }

  getInitSettings() {
    return initSettings;
  }

  onSettingChange(e) {
    super.onSettingChange(e);

    if (e.name === 'url') {
      this.setState({
        url: e.url.toString()
      });
    }

    if (e.name === 'port') {
      this.setState({
        port: e.port
      });
    }

    if (e.name === 'customSymbol') {
      this.updateText();
    }
  }

  onIntlChange = () => {
    this.updateText();
  }

  send(url, port) {
    const ws = WSService.getInstance({ url, port, heartbeatInterval: 5, heartbeatMessage: 'test' });
    ws.send(JSON.stringify(this.getOpenCashDrawer()));
  }

  getInitMessage() {
    return {
      method: 'initialize',
      organization: 'linux05',
      workstationId: '26',
      parameter: [
        {
          processor: 'posprintreceipt',
          method: 'init',
          parameters: '26'
        }
      ]
    };
  }

  getOpenCashDrawer() {
    return {
      method: 'execute',
      organization: 'linux05',
      workstationId: '26',
      parameter: [
        {
          processor: 'posprintreceipt',
          method: 'init',
          parameters: 'open_cash_drawer_only=true&openCashDrawer=true&com_port=12'
        },
        {
          processor: 'posprintreceipt',
          method: 'print',
          parameters: 'open_cash_drawer_only=true&openCashDrawer=true&com_port=12'
        }
      ]
    };
  }

  renderContent() {
    const { url, port } = this.state;

    return (
      <div>
        Web Socket Service
        <button onClick={() => this.send(url, port)}>Send</button>
      </div>
    );
  }

}
