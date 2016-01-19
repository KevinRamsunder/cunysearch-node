cunyapp.controller('TableController', tableController);

// inject dependencies
tableController.$inject = ['$scope', '$http', 'ngTableParams', 'JsonToTable'];

function tableController($scope, $http, NgTableParams, JsonToTable) {
    var self = this;

    // bind json data to this controller
    self.data = JsonToTable.jsonData;

    // construct table object from self.data
    self.tableParams = new NgTableParams({}, {dataset: self.data});
}