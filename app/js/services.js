'use strict';

angular.module('noPhoneWeek.services', [])
  .factory('User', UserFactory)
  .factory('Auth', AuthFactory);
;

UserFactory.$inject = ['ngResource', '$http', 'API_URL'];
AuthFactory.$inject = ['$http', 'API_URL'];


function UserFactory(ngResource, API_URL){
  return $resource($API_URL+'/users/:id');
}

function AuthFactory($http, API_URL){
  var service = {};
  service.login = function(params) {
    var callbacks = Array.prototype.slice.call(arguments, 1);
    var success = callbacks[0], fail = callbacks[1];
    $http.post(API_URL+'/auth').then(function(res){
      success(res);
    }, function(res){
      fail(res);
    });
  }
  return service;
}
