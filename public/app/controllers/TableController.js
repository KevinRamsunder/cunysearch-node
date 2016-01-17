cunyapp.controller('TableController', tableController);

console.log('debug 2');

// inject dependencies
tableController.$inject = ['$scope', '$http', 'ngTableParams'];

function tableController($scope, $http, NgTableParams) {
    var self = this;
    
    // read in json object from route
    $http.get('script.json').success(function(data) {
        // read results array from json object
        self.data = data.results;

        // construct table object from self.data
        self.tableParams = new NgTableParams({}, {dataset: self.data});
    });
}