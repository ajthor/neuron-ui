'use strict';
import test from 'ava';

test.beforeEach(t => {
  t.context.obj = {
    openFiles: ['somefile.js', 'somefile2.js'],
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
                items: {
                  directories: [],
                  files: [
                    {
                      base: 'somefile2.js',
                      path: './somefile2.js',
                      loaded: false,
                      contents: '',
                      open: false
                    }
                  ]
                },
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
});

test('Utils successfully exports functions.', t => {
  t.notThrows(() => {
    const utils = require('../src/utils.js');
  });
});

test.beforeEach(t => {
  t.context.utils = require('../src/utils.js');
});

test('forEachDeep successfully iterates over deep values.', t => {
  t.context.utils.forEachDeep(t.context.obj, value => {
    // console.log(value);
  });
});

test('findDeep successfully finds deep values.', t => {
  const searchTerm = 'somedir';
  const result = t.context.utils.findDeep(t.context.obj, value => {
    // console.log(value, searchTerm);
    return value === searchTerm;
  });
  t.truthy(result);
  t.deepEqual(result, {
    base: 'somedir',
    path: './somedir',
    items: {
      directories: [],
      files: [
        {
          base: 'somefile2.js',
          path: './somefile2.js',
          loaded: false,
          contents: '',
          open: false
        }
      ]
    },
    loaded: false,
    expanded: false
  });
});

test('mapDeep successfully modifies deep values.', t => {
  const dummyText = 'test';
  const newObj = t.context.utils.mapDeep(t.context.obj, value => {
    return dummyText;
  });

  // let res = false;
  // const result = t.context.utils.forEachDeep(newObj, value => {
  //   res = (value !== dummyText);
  // });
  // t.is(res, false);
  // console.log(JSON.stringify(result, null, 2));
});
