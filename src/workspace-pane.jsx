'use strict';
//
// Workspace Pane
//
import React from 'react';

import TabView from './tab-view.jsx';
import Editors from './editors.jsx';

const WorkspacePane = ({classStyle}) => (
  <workspace-pane class={`${classStyle || ''}`}>
    <TabView />
    <Editors />
  </workspace-pane>
);

module.exports = WorkspacePane;
