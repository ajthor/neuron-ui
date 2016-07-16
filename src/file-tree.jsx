'use strict';

const React = require('react');

const FileTreeDirectory = require('./file-tree-directory.jsx');

let FileTree = React.createClass({
  getInitialState: function() {
    return {
      text: `Hello, world! I am a FileTree. Treeees!
      I love trees. They are so cuddly.
      Why do we cut them down?
      Can't we all just get along?`,
      directories: ["./"]
    };
  },

  componentDidMount: function() {
    // Get directory.
  },

  render: function() {
    let directories = this.state.directories.map((file) => {
      return (
        <li class="file-tree-directory">
          <FileTreeDirectory directory={this.state.directory} />
        </li>
      );
    })

    return (
      <file-tree class="file-tree">
        <ol class="file-tree-directory">
          { directories }
        </ol>
      </file-tree>
    );
  }
});

module.exports = FileTree;
