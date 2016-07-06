'use strict';

angular.module('noPhoneWeek.services', [])
.factory('User', userFactory);

userFactory.$inject = ['ngResource', 'ngRoute', '$API_URL'];

function userFactory(ngResource, ngRoute, $API_URL){
  // return $resource($API_URL+'/users', null, {method: 'POST'});
}
