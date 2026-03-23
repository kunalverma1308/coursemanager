(function () {

    'use strict';

    angular
        .module('courseApp')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {

        var resolver = {
            auth: function (AuthService, $location) {
                if (!AuthService.isLoggedIn()) {
                    $location.path('/login');
                }
            }
        };


        $routeProvider

            .when('/', {
                templateUrl: 'app/views/dashboard.html'
            })

            .when('/courses', {
                templateUrl: 'app/views/courses.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    auth: resolver.auth
                }

            })

            .when('/add-course', {
                templateUrl: 'app/views/add-course.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    auth: resolver.auth
                }
            })

            .when('/profile', {
                templateUrl: 'app/views/profile.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    auth: resolver.auth
                }
            })

            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })

            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })

            .otherwise({
                redirectTo: '/'
            });
    }

})();