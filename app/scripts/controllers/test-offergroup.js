'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('testoffergroupCtrl', function ($scope,$http,$filter,$route) {  
        $scope.maindiv = false;    
        $scope.editing = false;
        $scope.showModal = false;
        $scope.searchText = '';
        $scope.models=[];
        angular.element(".msg").html("");
        
    
        $scope.getrecords = function(){
            if($scope.searchText!=''){
                    $scope.loading = true;
                    var url = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
                    $http.jsonp(url)
                    .success(function(data) {
                        $scope.results = data;
                        if($scope.results.length > 0){
                             $scope.loading = false;
                             $scope.maindiv = true;
                             $scope.offergrouplist = $scope.results;
                        }
                    }).error(function(){
                        alert("Error");
                    });   
            }
        }   
    
    
});