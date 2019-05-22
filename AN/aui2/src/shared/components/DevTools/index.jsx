/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import Dispatcher from 'redux-devtools-dispatch';
import DockMonitor from 'redux-devtools-dock-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

export default createDevTools(
  <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-H" changePositionKey="ctrl-Q">
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher />
    </MultipleMonitors>
  </DockMonitor>
);
