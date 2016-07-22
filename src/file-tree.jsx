'use strict';

const _ = require('lodash');

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const FileTreeDirectory = require('./file-tree-directory.jsx');
const FileTreeItem = require('./file-tree-item.jsx');

//
// File Tree Component
//
// Designed to hold the top-level project directories. We will add these using
// a menu item later, but this component merely renders the project
// directories' contents.
class FileTree extends React.Component {
  render() {
    const directories = _.map(this.props.projectDirectories, dir => {
      return (
        <FileTreeDirectory path={dir} />
      );
    });

    return (
      <file-tree>
        <div className="scrollable">
          <ol className="tree-view tree-list">
            {directories}
          </ol>
        </div>
      </file-tree>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const projectDirectories = utils.getDeep(store, 'projectDirectories');
  return {
    projectDirectories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTree);
