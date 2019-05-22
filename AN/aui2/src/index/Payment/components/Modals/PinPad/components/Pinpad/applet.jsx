import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import './index.less';

const navigatorName = window.navigator.appName.toLowerCase();
const isIE = navigatorName.indexOf('internet explorer') !== -1;
const isNetScape = navigatorName.indexOf('netscape') !== -1;
/* eslint-disable */
export default class Applet extends UIComponent {
  render() {
    return (
      <div
        className="pinpad-transaction-fail"
        dangerouslySetInnerHTML={{ __html: this.renderApplet() }}
      />
    );
  }

  renderApplet() {
    const { applet_name, applets } = this.props.appletInfo;

    if (isIE || isNetScape) {
      if (isNetScape) {
        return `<applet
          ${applets}
          archive=${applet_name}.jar
          code=${applet_name}.class
          id=APDInterfaceApplet
          name=APDInterfaceApplet
          height=0
          width=0
          scriptable=true
          mayscript=mayscript
          pluginspage=http://java.com/en/download/index.jsp>
          ${this.renderParams()}
        </applet>`;
      }
      return `<object
        codebase={code_base}
        type=application/x-java-applet;version=1.5
        archive=${applet_name}.jar
        code=${applet_name}.class
        id=APDInterfaceApplet
        name=APDInterfaceApplet
        height=0
        width=0>
          <param name=mayscript value=true/>
          ${this.renderParams()}
        </object>`;
    }
    return '';
  }

  renderParams() {
    const {
      device_type_id,
      terminal_location_address,
      device_id,
      terminal_location_city,
      terminal_location_state,
      terminal_location_zip,
      card_acceptor_name,
      merchant_descriptor,
      merchant_user,
      merchant_password,
      ams_url,
      ams_port,
      ams_timeout,
      terminal_number,
      usb_port_name,
      pinpad_data_entry_timeout,
      pinpad_swipe_card_timeout,
      pinpad_pin_entry_timeout,
      write_to_log
    } = this.props.appletInfo;

    const ccScanWithoutEmv = device_type_id === 1 || device_type_id === 2;
    return `${ccScanWithoutEmv ? '<param name="separate_jvm" value="true"><param name="cache_option" value="No"><param name="classloader_cache" value="true">' : ''}
      <param name="dll_ver" value="1.0.0">
      <param name="dll_auto_update" value="Yes">
      <param name="AMSURL" value="${ams_url}">
      <param name="AMSPort" value="${ams_port}">
      <param name="AMSTimeout" value="${ams_timeout}">
      <param name="CardAcceptorName" value="${card_acceptor_name}">
      <param name="TerminalLocationAddress" value="${terminal_location_address}">
      <param name="TerminalLocationCity" value="${terminal_location_city}">
      <param name="TerminalLocationState" value="${terminal_location_state}">
      <param name="TerminalLocationZIP" value="${terminal_location_zip}">
      <param name="MerchantDescriptor" value="${merchant_descriptor}">
      <param name="MerchantUser" value="${merchant_user}">
      <param name="MerchantPassword" value="${merchant_password}">
      <param name="TerminalNumber" value="${terminal_number}">
      <param name="DeviceId" value="${device_id}">
      <param name="USBPortName" value="${usb_port_name}">
      <param name="PinpadDataEntryTimeout" value="${pinpad_data_entry_timeout}">
      <param name="PinpadPINEntryTimeout" value="${pinpad_pin_entry_timeout}">
      <param name="PinpadSwipeCardTimeout" value="${pinpad_swipe_card_timeout}">
      <param name="WriteToLog" value="${write_to_log}">`;
  }
}
/* eslint-enable */


/*
  the relationship between pinpad device type with applet name:
  {
    "1": "APDInterfaceApplet", //paymentech
    "2": "APDMonerisInterfaceApplet",
    "3": "APDEMVInterfaceApplet", //paymentech EMV
    "4": "APDEMVElavonInterfaceApplet"
  }
*/
