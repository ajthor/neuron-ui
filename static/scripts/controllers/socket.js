'use strict';

angular.module('neuronApp')
  .controller('SocketController', function ($scope, mySocket) {

    $scope.sendMessage = function() {
      mySocket.emit('message', $scope.message);
      $scope.message = '';
    };
  });
