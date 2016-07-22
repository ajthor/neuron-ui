'use strict';
//
// Utils Library
//
// Library of utility functions, mainly used as addons for lodash.
const _ = require('lodash');

const forEachDeep = (obj, cb) => {
  _.forEach(obj, value => {
    if (_.isArray(value) || _.isPlainObject(value)) {
      const result = cb(value);
      return (result === false) ? false : forEachDeep(value, cb);
    }
  });
};

const findDeep = (obj, cb) => {
  let result;
  forEachDeep(obj, value => {
    if (_.find(value, cb)) {
      result = value;
      return false;
    }
  });

  return result;
};

const mapDeep = (obj, cb) => {
  return _.map(obj, value => {
    if (_.isArray(value) || _.isPlainObject(value)) {
      return mapDeep(value, cb);
    }
    return cb(value);
  });
};

const updateObject = (obj, search, cb) => {
  let result = Object.assign({}, obj);
  const srch = item => {
    return item === search;
  };
  forEachDeep(result, value => {
    if (_.find(value, srch)) {
      cb(value);
      return false;
    }
  });

  return result;
};

exports.findDeep = findDeep;
exports.forEachDeep = forEachDeep;
exports.mapDeep = mapDeep;
exports.updateObject = updateObject;
