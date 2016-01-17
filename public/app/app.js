var cunyapp = angular.module('cunyapp', ['ngRoute', 'ngTable']);

cunyapp.config(function($routeProvider) {
    $routeProvider
        // main landing page
        .when('/', {
            templateUrl: 'app/views/main.html',
            controller: "MainController as main"
        })

        .when('/table', {
            templateUrl: 'app/views/table.html',
            controller: "TableController as table"
        })
});