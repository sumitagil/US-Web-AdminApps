'use strict';

/**
 * @ngdoc overview
 * @name sandvikusaAdminAppsApp
 * @description
 * # sandvikusaAdminAppsApp
 *
 * Main module of the application.
 */
var app = angular.module('sandvikusaAdminAppsApp', [
                        'ngCookies',
                        'ngMessages',
                        'ngResource',
                        'ngRoute',
                        'ngSanitize',
                        'ngTouch',
                        'ngTable',
                        'ui.bootstrap'
                      ]);

  app.config(function ($routeProvider) {
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
     .when('/promocode', {
        templateUrl: 'views/promocode.html',
        controller: 'promocodeCtrl'
      })
    .when('/promolist', {
        templateUrl: 'views/promolist.html',
        controller: 'promolistCtrl'
      })
     .when('/pages', {
        templateUrl: 'views/pages.html',
        controller: 'pageCtrl'
      })
      .when('/checkpage', {
        templateUrl: 'views/checkpage.html',
        controller: 'CheckPageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
     
  });

//Common filters...
app.filter('pagination', function()
{
     return function(input, start)
     {
         if (!input || !input.length) { return; }
      start = +start;
      return input.slice(start);
     };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, msg) {  
    $scope.msg = msg;
    $scope.ok = function () {
                $modalInstance.close();
    };
});
