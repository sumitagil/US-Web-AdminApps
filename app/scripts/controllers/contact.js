'use strict';

/**
 * @ngdoc function
 * @name globsynApp.controller:ContactCtrl
 * @description
 * # AboutCtrl
 * Controller of the globsynApp
 */
var app=angular.module('sandvikusaAdminAppsApp');

app.config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
  
app.controller('ContactCtrl', function ($scope) {
            
  });
