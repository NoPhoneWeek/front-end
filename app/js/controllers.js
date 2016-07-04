angular.module('noPhoneWeek.controllers', [])
 .controller('AppCtrl', AppController);

AppController.$inject = ['$scope'];

function AppController($scope){
  $scope.example = 'Hello';
}
