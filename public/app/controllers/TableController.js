cunyapp.controller('TableController', tableController);

// inject dependencies
tableController.$inject = ['$scope', '$http', 'ngTableParams', 'JsonToTable', 'JsonToModal', 'HttpPromise'];

function tableController($scope, $http, NgTableParams, JsonToTable, JsonToModal, HttpPromise) {
    var self = this;

    // bind json data to this controller
    self.data = JsonToTable.jsonData;

    // construct table object from self.data
    self.tableParams = new NgTableParams({}, {dataset: self.data});

    // post search request to server
    self.getEnrollmentInformation = function(seatKey, classID) {
        // construct data from currently selected options
        var data = {seatKey: seatKey, classID: classID};

        // construct promise
        var promise = HttpPromise.getSeats(data);

        // wait for callback - when http call is complete
        promise.then(function(data) {
            JsonToModal.loadDataInModal(data);
        });
    };
}