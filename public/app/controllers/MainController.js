cunyapp.controller('MainController', mainController);

// inject dependencies
mainController.$inject = ['$scope', '$http', 'HttpPromise', 'JsonToTable', '$location'];

cunyapp.factory('HttpPromise', function($http) {
    // function to start http request
    return {
        getData: function getData() {
            return $http.get('api/search-request').then(function(response) {
                // parse and return serialized string to json object
                return JSON.parse(response.data);
            });
        }
    };
});

function mainController($scope, $http, HttpPromise, JsonToTable) {
    var self = this;
    self.institutions = [];

    $http.get('info/inst').then(function(response) {
        var institutions = response.data[0]; // list of insts
        var instList = response.data[1]; // mongo doc object
        
        for(var i = 0; i < institutions.length; i++) {
            self.institutions.push(institutions[i].inst);
        }
    });

    self.postResults = function() {
        // construct promise
        var promise = HttpPromise.getData();

        // wait for callback - when http call is complete
        promise.then(function(data) {
            JsonToTable.loadDataInTable(data);
        });
    };
}