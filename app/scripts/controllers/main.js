'use strict';

/**
 * @ngdoc function
 * @name sandvikusaAdminAppsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandvikusaAdminAppsApp
 */
var app=angular.module('sandvikusaAdminAppsApp');

app.controller('MainCtrl', function ($scope,$location) {
    $scope.$location = $location;
});