var cunyapp = angular.module('cunyapp', ['ngRoute', 'ngTable', 'ui.bootstrap']);

// route provider
cunyapp.config(function($routeProvider) {
    $routeProvider
        // main landing page
        .when('/', {
            templateUrl: 'app/views/main.html',
            controller: 'MainController as main'
        })

        // search result pages
        .when('/table', {
            templateUrl: 'app/views/table.html',
            controller: 'TableController as table'
        })
});

// function to start http request
cunyapp.factory('HttpPromise', function($http) {
    return {
        getClasses: function getClasses(data) {
            return $http.post('api/search-request', {data: data}).then(function(response) {
                // parse and return serialized string to json object
                return JSON.parse(response.data);
            });
        },

        getSeats: function getSeats(data) {
            return $http.post('api/enrollment-request', {data: data}).then(function(response) {
                // parse and return serialized string to json object
                return JSON.parse(response.data);
            });  
        }
    };
});

// service to provide communication between table and main controller
cunyapp.service('JsonToTable', function(NgTableParams, $location) {
    var self = this;

    // default value
    self.jsonData = {default: ""};

    self.loadDataInTable = function(jsonData) {
        // read results array from json object
        self.jsonData = jsonData.results; 

        // change route to /table controller
        $location.path('/table');
    }
});

// service to provide communication between table and main controller
cunyapp.service('JsonToModal', function() {
    var self = this;

    self.loadDataInModal = function(jsonData) {
        console.log(jsonData);
    };
});