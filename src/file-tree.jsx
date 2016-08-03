'use strict';

import {map} from 'lodash';

import React from 'react';
import {connect} from 'react-redux';

import {getDeep} from './utils';

import FileTreeDirectory from './file-tree-directory.jsx';

//
// File Tree Component
//
// Designed to hold the top-level project directories. We will add these using
// a menu item later, but this component merely renders the project
// directories' contents.
const FileTree = ({projectDirectories}) => (
  <file-tree>
    <div className="file-tree-container">
      <ol className="tree-view">
        {
          map(projectDirectories, directory => {
            return (
              <FileTreeDirectory path={directory} projectDirectory={true} />
            );
          })
        }
      </ol>
    </div>
  </file-tree>
);

const mapStateToProps = (store, ownProps) => {
  const projectDirectories = getDeep(store, 'projectDirectories');
  return {
    projectDirectories
  };
};

module.exports = connect(mapStateToProps)(FileTree);
