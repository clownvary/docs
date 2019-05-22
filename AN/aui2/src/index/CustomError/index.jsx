import React from 'react';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import UIComponent from 'shared/components/UIComponent';
import './index.less';

export default class CustomError extends UIComponent {
  render() {
    const errorMessage = __customerror__.__initialState__.errorMessage;
    return (
      <SafeText tagName="span" text={errorMessage} />
    );
  }
}
