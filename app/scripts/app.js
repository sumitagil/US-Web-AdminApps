'use strict';

/**
 * @ngdoc overview
 * @name sandvikusaAdminAppsApp
 * @description
 * # sandvikusaAdminAppsApp
 *
 * Main module of the application.
 */
angular
  .module('sandvikusaAdminAppsApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
