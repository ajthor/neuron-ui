'use strict';
//
// Tab View
//
import {parse} from 'path';
import {map} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {getDeep} from './utils';

import FileActions from './file-actions';

//
// Tab Component
//
const Tab = ({file, setActive, closeFile}) => (
  <li className={`tab-view-item ${file.active ? 'active' : 'inactive'}`} key={file.key} data-path={file.path}>
    <span className="tab-view-label" onClick={() => setActive(file)}>
      {parse(file.path).base}
    </span>
    <span className="tab-close-button" onClick={() => closeFile(file)}>
      {`\u{2A2F}`}
    </span>
  </li>
);

const mapDispatchToProps = dispatch => ({
  setActive: file => {
    dispatch(FileActions.setActive(file.path));
  },

  closeFile: file => {
    if (file.active) {
      dispatch(FileActions.setNextActive(file.path));
    }
    dispatch(FileActions.closeFile(file.path));
  }
});

const ConnectedTab = connect(null, mapDispatchToProps)(Tab);

//
// TabView Component
//
const TabView = ({openFiles}) => (
  <ul className="tab-view">
    {
      map(openFiles, file => {
        return (
          <ConnectedTab file={file} />
        );
      })
    }
  </ul>
);

const mapStateToProps = store => {
  const openFiles = getDeep(store, 'openFiles');
  return {
    openFiles
  };
};

module.exports = connect(mapStateToProps)(TabView);
