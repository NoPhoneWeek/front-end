'use strict';

angular.module('noPhoneWeek', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // Fallback
  $urlRouterProvider.otherwise('/homepage');
  // Setting up states
  $stateProvider
    .state('home', {
      url: '/homepage',
      templateUrl: '/dist/templates/homepage.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/dist/templates/user-login.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/dist/templates/user-register.html'
    })
    .state('recover', {
      url: '/recover',
      templateUrl: '/dist/templates/user-recover.html'
    });
}]);
