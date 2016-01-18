cunyapp.controller('MainController', mainController);

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

// inject dependencies
mainController.$inject = ['$scope', '$http', 'HttpPromise'];

function mainController($scope, $http, HttpPromise) {
    var self = this;
    
    // construct promise
    var promise = HttpPromise.getData();

    // wait for callback, once http call is complete
    promise.then(function(data) {
        self.data = data;
        console.log(self.data);
    });
}