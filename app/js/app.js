'use strict';

angular.module('noPhoneWeek', []);
angular.module('noPhoneWeek', ['ngRoute', 'homepage', 'userLogin']);
angular.module('noPhoneWeek').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/', {
                template: '<homepage></homepage>'
            }).
            when('/login', {
                template: '<user-login></user-login>'
            }).
            otherwise('/')
        ;
    }
]);

// module
angular.module('homepage', []);
// component
angular.module('homepage').component('homepage', {
    templateUrl: '/dist/tpl/homepage.html',
    controller: [
        function DevicesListController(){
            this.content = 'Hello world';
        }
    ]
});

angular.module('userLogin', []);
angular.module('userLogin').component('userLogin', {
    templateUrl: '/dist/tpl/user-login.html'
});
