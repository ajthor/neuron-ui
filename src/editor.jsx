'use strict';

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const Input = require('./input.jsx');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // handleKeyUp: function(e) {
  //   e.preventDefault();
  //   if (e.key == 'Enter') {
  //     let text = this.state.text;
  //     this.props.onSubmit({text: text});
  //
  //     this.setState({text: ''});
  //   }
  // },

  componentWillReceiveProps() {
    
  }

  formatContents() {
    this.contents = this.props.contents;
  }

  render() {
    return (
      <editor className="editor">
        <Input onSubmit={ this.props.onSubmit }/>
        <div>{this.props.contents}</div>
      </editor>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  const activeFile = _.find(openFiles, {'active': true});
  return {
    contents: activeFile ? activeFile.contents : ''
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Editor);
