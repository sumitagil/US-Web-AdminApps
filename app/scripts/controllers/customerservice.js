'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('customerserviceCtrl', function ($scope) {
        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker2').datetimepicker({viewMode: 'years'});
        $('#datetimepicker3').datetimepicker({
            viewMode: 'years',
           format: 'MM/YYYY'
        });
    $scope.showdetailsdiv = false;
    $scope.showmore=function(p){
        if(p=='D')
            $scope.showdetailsdiv = true;  
        else
            $scope.showdetailsdiv = false;  
    };
    
});