'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('customerserviceCtrl', function ($scope) {
        $('#datetimepicker1').datepicker();
        $('#datetimepicker2').datepicker();
        
        $scope.showdetailsdiv = false;
        $scope.showmore=function(p){
            if(p=='D')
                $scope.showdetailsdiv = true;  
            else
                $scope.showdetailsdiv = false;  
        };
    
});