import React from 'react';
import { fromJS } from 'immutable';
import jsonConfigurations from 'common/get_configurations.json';// eslint-disable-line
import jsonSystemSettings from 'common/get_systemSettings.json';// eslint-disable-line

const { body: { configuration } } = jsonConfigurations;
const { body: { originalConfig } } = jsonSystemSettings;

export const configurations = fromJS(configuration);
export const systemSettings = fromJS(originalConfig);

export const getWording = (key, conf) => {
  const scopeConfigurations = conf || configurations;
  return key ? scopeConfigurations.get(key) : undefined;
};

export const isLoginUser = (sys) => {
  const scopeSystemSettings = sys || systemSettings;
  return scopeSystemSettings.getIn(['user', 'customerid']) !== -1;
};

export const theme = {
  name: systemSettings.getIn(['customizeStyle', 'current_theme']),
  customizedColors: systemSettings.getIn(['customizeStyle', 'customized_theme'])
};

export const childContextTypes = {
  configurations: React.PropTypes.object,
  systemSettings: React.PropTypes.object,
  theme: React.PropTypes.object,
  getWording: React.PropTypes.func,
  isLoginUser: React.PropTypes.func
};

export default {
  configurations,
  systemSettings,
  theme,
  getWording,
  isLoginUser
};
