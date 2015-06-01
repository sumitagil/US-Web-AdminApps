'use strict';

/**
 * @ngdoc function
 * @name sandvikusaAdminAppsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sandvikusaAdminAppsApp
 */
angular.module('sandvikusaAdminAppsApp')
  .controller('CheckPageCtrl', function ($scope) {
        $scope.checkPageResult=false;
        
    
        $scope.checkurl = function(cid) { 
            $scope.checkPageResult=true;
        }
        
  });
