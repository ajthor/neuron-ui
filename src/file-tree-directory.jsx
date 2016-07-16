'use strict';

const React = require('react');

const FileTreeItem = require('./file-tree-item.jsx');

let FileTreeDirectory = React.createClass({
  getInitialState: function() {
    return {
      dir: './',
      files: [
        {
          type: 'file',
          name: "someFile.js",
          path: "./someFile.js"
        },
        {
          type: 'file',
          name: "someOtherFile.js",
          path: "./someOtherFile.js"
        }
      ]
    };
  },

  componentDidMount: function() {
    // Get files in directory.
  },

  render: function() {
    let files = this.state.files.map((file) => {
      return (
        <FileTreeItem filePath={file.path} type={file.type} />
      );
    });

    return (
      <div class="tree-view-directory">
        <div class="tree-view-item">{this.state.dir}</div>
        <ol class={`${this.props.type}`} data-directory={this.state.directory}>
          { files }
        </ol>
      </div>
    );
  }
});

module.exports = FileTreeDirectory;
