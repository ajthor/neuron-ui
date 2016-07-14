'use strict';

angular.module('neuronApp')
  .factory('mySocket', function (socketFactory) {
    // var myIoSocket = io.connect('http://localhost:4195');
    var socket = io.connect('http://localhost:4195');

    return socketFactory({
      ioSocket: socket
    });

  });
