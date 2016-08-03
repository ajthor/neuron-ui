'use strict';

import {parse} from 'path';

import React from 'react';
import {connect} from 'react-redux';

import FileActions from './file-actions';

const FileTreeItem = ({path, openFile}) => (
  <li className={`tree-view-file tree-list-item`} onClick={() => openFile(path)}>
    <span className="name icon-file" data-path={path}>{parse(path).base}</span>
  </li>
);

const mapDispatchToProps = dispatch => ({
  openFile: file => {
    dispatch(FileActions.openFile(file));
    dispatch(FileActions.setActive(file));
  }
});

module.exports = connect(null, mapDispatchToProps)(FileTreeItem);
