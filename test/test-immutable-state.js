'use strict';
import test from 'ava';
import {fromJS, Map} from 'immutable';

test.beforeEach(t => {
  t.context.stateObject = {
    openFiles: ['somefile.js'],
    filetree: {
      projectDirectories: [
        {
          base: './',
          path: './',
          items: {
            directories: [
              {
                base: 'somedir',
                path: './somedir',
                items: {},
                loaded: false,
                expanded: false
              }
            ],
            files: [
              {
                base: 'somefile.js',
                path: './somefile.js',
                loaded: false,
                contents: '',
                open: false
              }
            ]
          },
          loaded: false,
          expanded: false
        }
      ]
    }
  };
  t.context.state = fromJS(t.context.stateObject);
});

test('State\'s members are accessible.', t => {
  t.truthy(t.context.state.get('filetree'));
});

test('State can find its members.', t => {
  const item = t.context.state.find((value, key) => {
    return key === 'filetree';
  });
  t.truthy(item);
});

test('State\'s members are resolvable.', t => {
  const item = t.context.state.find((value, key) => {
    return key === 'filetree';
  }).toJS();
  t.deepEqual(item, t.context.stateObject.filetree);
});

test('State\'s deep members are accessible.', t => {
  const item = t.context.state.getIn(['filetree', 'projectDirectories']);
  t.truthy(item.toJS());
});

// test('State\'s members are searchable.', t => {
//   const item = t.context.state.findIn((value, key) => {
//     return key === 'filetree';
//   });
//   t.truthy(item);
//   t.deepEqual(item.toJS(), t.context.stateObject.filetree.projectDirectories);
// });

test('State\'s deep members are accessible.', t => {
  const item = t.context.state.getIn(['filetree', 'projectDirectories']);
  t.truthy(item);
  t.deepEqual(item.toJS(), t.context.stateObject.filetree.projectDirectories);
});
