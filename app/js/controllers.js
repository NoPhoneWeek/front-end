'use strict';

angular.module('noPhoneWeek.controllers', ['noPhoneWeek.services'])
  .controller('AppCtrl', AppController)
  .controller('LoginCtrl', LoginController)
;

AppController.$inject = ['$scope'];
LoginController.$inject = ['$scope', 'Auth'];

function AppController($scope){
  $scope.example = 'Hello';
}

function LoginController($scope, Auth){
  $scope.UserLogin = function() {
    Auth.login($scope.credentials, function(res){
      console.log(res);
    });
  };
}
