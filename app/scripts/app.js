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
     .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
     .when('/orderforms', {
        templateUrl: 'views/orderforms.html',
        controller: 'OrderFormsCtrl'
      })
     .when('/insertorderforms', {
        templateUrl: 'views/insertorderforms.html',
        controller: 'insertOrderFormsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
     
  });
