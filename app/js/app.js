'use strict';

angular.module('noPhoneWeek', []);
angular.module('noPhoneWeek', ['ngRoute', 'homepage', 'userLogin', 'userRegister', 'userRecover']);
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
            when('/register', {
                template: '<user-register></user-register>'
            }).
            when('/recover', {
                template: '<user-recover></user-recover>'
            }).
            otherwise('/')
        ;
    }
]);

// module
angular.module('homepage', []);
// component
angular.module('homepage').component('homepage', {
    templateUrl: '/dist/templates/homepage.html',
    controller: [
        function DevicesListController(){
            this.content = 'Hello world';
        }
    ]
});

angular.module('userLogin', []);
angular.module('userLogin').component('userLogin', {
    templateUrl: '/dist/templates/user-login.html'
});

angular.module('userRegister', []);
angular.module('userRegister').component('userRegister', {
    templateUrl: '/dist/templates/user-register.html'
});

angular.module('userRecover', []);
angular.module('userRecover').component('userRecover', {
    templateUrl: '/dist/templates/user-recover.html'
});
