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
    .when('/offergroup', {
        templateUrl: 'views/offergroup.html',
        controller: 'OfferGroupCtrl'
      })
	.when('/insertcampaigns', {
        templateUrl: 'views/insertcampaigns.html',
        controller: 'insertCampaignsCtrl'
      })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        controllerAs:'vm'
      })
    .otherwise({
        redirectTo: '/'
    });
     
  });

//run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
app.run(function($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
});

/*app.run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        if (!Auth.isLoggedIn()) {
            $location.path('/login');
        }
        else{ 
            $location.path('/');
        }
    });
});

app.factory('Auth', function(){
    var user;
    return{
        setUser : function(aUser){
            user = aUser;
        },
        isLoggedIn : function(){
            return(user)? user : false;
        }
    }
});*/




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