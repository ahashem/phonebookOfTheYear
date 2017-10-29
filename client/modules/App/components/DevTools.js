import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-k"
    changePositionKey="ctrl-i"
    changeMonitorKey="ctrl-m"
  >
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>
);
