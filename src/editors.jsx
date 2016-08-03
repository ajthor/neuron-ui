'use strict';

import {parse} from 'path';
import {map} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {getDeep} from './utils';

import TextEditor from './text-editor.jsx';
import NetworkEditor from './network-editor.jsx';

const Editors = ({openFiles}) => (
  <div className="editors">
    {
      map(openFiles, file => {
        const extension = parse(file.path).ext;
        if (extension === '.nw') {
          return (
            <NetworkEditor {...file} />
          );
        }
        return (
          <TextEditor {...file} />
        );
      })
    }
  </div>
);

const mapStateToProps = store => {
  const openFiles = getDeep(store, 'openFiles');
  return {
    openFiles
  };
};

export default connect(mapStateToProps)(Editors);
