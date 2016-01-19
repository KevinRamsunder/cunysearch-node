cunyapp.controller('MainController', mainController);

// inject dependencies
mainController.$inject = ['$scope', '$http', 'HttpPromise', 'JsonToTable', '$location'];

cunyapp.factory('HttpPromise', function($http) {
    // function to start http request
    return {
        getData: function getData() {
            return $http.get('/search-request').then(function(response) {
                // parse and return serialized string to json object
                return JSON.parse(response.data);
            });
        }
    };
});

function mainController($scope, $http, HttpPromise, JsonToTable) {
    var self = this;
    
    // construct promise
    var promise = HttpPromise.getData();

    // wait for callback - when http call is complete
    promise.then(function(data) {
        JsonToTable.loadDataInTable(data);
    });
}