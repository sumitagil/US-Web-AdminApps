'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('offerimportCtrl', function ($scope,$http,$filter) {
        $scope.errormsg = '';
        $scope.errModal = false;   
    
        $scope.searchImportData = function(){
            if($scope.offercode=="" || $scope.offercode==undefined || $scope.offercode=="undefined"){
                $scope.errormsg="Please enter offer code.";
                $scope.errModal = true;
            }else{
                $scope.errModal = false;
            }
        };
});