'use strict';

import {find} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {getDeep} from './utils';

const StatusBar = ({activeFile}) => (
  <status-bar class="status-bar">
    <div className="status-bar-container">
      <div className="status-bar-left">
        <span className="status-file-name">{activeFile ? activeFile.path : ''}</span>
      </div>
      <div className="status-bar-right">
        <span className="status-file-encoding">{activeFile ? activeFile.encoding : ''}</span>
      </div>
    </div>
  </status-bar>
);

const mapStateToProps = store => {
  const openFiles = getDeep(store, 'openFiles');
  const activeFile = find(openFiles, {active: true});
  return {
    activeFile
  };
};

module.exports = connect(mapStateToProps)(StatusBar);
