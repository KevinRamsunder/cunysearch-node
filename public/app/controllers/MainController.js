cunyapp.controller('MainController', mainController);

// inject dependencies
mainController.$inject = ['$scope', '$http', 'HttpPromise', 'JsonToTable', '$location'];

// function to start http request
cunyapp.factory('HttpPromise', function($http) {
    return {
        getData: function getData(data) {
            return $http.post('api/search-request', {data: data}).then(function(response) {
                // parse and return serialized string to json object
                return JSON.parse(response.data);
            });
        }
    };
});

function mainController($scope, $http, HttpPromise, JsonToTable) {
    var self = this;

    // selected values for each input box
    self.instSelected = undefined;
    self.termSelected = undefined;
    self.deptSelected = undefined;

    // select bar data
    self.institutions = [];
    self.terms = [];
    self.depts = [];

    // array for school index retrieval
    self.instKeys = [];

    // get institutions, terms, and departments
    $http.get('info/inst').then(function(response) {
        self.instList = response.data[1]; // mongo doc object
        self.institutionList = response.data[0]; // list of insts
        
        for(var i = 0; i < self.institutionList.length; i++) {
            self.institutions.push(self.institutionList[i].inst);
            self.instKeys.push(self.institutionList[i].index);
        }
    });

    // process on change event for institution select bar
    self.processInstitutionChange = function() {
        var selectedIndex = self.institutions.indexOf(self.instSelected.inst);
        var indexToInstList = self.instKeys[selectedIndex];

        self.updateTerms(indexToInstList);
        self.updateDepts(indexToInstList);
    };

    self.updateTerms = function(indexToInstList) {
        self.terms = [];
        self.termSelected = undefined;
        termList = self.instList[indexToInstList].term;

        for(var i = 0; i < termList.length; i++) {
            self.terms.push({term: termList[i].Name, htmlKey: termList[i].HtmlKey});
        }
    }

    self.updateDepts = function(indexToInstList) {
        self.depts = [];
        self.deptSelected = undefined;
        deptList = self.instList[indexToInstList].department;

        for(var i = 0; i < deptList.length; i++) {
            self.depts.push({dept: deptList[i].Name, htmlKey: deptList[i].HtmlKey});
        }
    }

    // post search request to server
    self.postResults = function() {
        // construct data from currently selected options
        var data = {
            inst: self.instSelected,
            term: self.termSelected,
            dept: self.deptSelected
        }

        // construct promise
        var promise = HttpPromise.getData(data);

        // wait for callback - when http call is complete
        promise.then(function(data) {
            JsonToTable.loadDataInTable(data);
        });
    };
}