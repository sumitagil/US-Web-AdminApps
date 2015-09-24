'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('salesforceCtrl', function ($scope,$http) {
        $scope.opendiv = 'salesforce';
		var customerData = {
                            'token':'741889E3-4565-40A1-982A-F15F7A923D72',
                            'sdate':'9/17/2015',
                            'edate':'9/18/2015'
                           };
        $scope.showloadingmodal = true;
        var url = "http://beta.iservices.earlymoments.com/getCustomerOrders?callback=JSON_CALLBACK";
        $http.jsonp(url,{params : customerData})
             .success(function (data, status, headers, config) {
                    $scope.results = data;
                    $scope.showloadingmodal = false;
             });
    
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
    
        $scope.viewCustomerData = function(data){
            $scope.showCustomerModal = !$scope.showCustomerModal;
            $scope.modalrecords = angular.copy(data);
        };
    
});