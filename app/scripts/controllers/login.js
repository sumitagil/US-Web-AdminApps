'use strict';

/**
 * @ngdoc function
 * @name sandvikusaAdminAppsApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sandvikusaAdminAppsApp
 */

/*var app = angular.module('sandvikusaAdminAppsApp');

app.controller('loginCtrl', function ($scope, $location, Auth) {
    
    $scope.loginUser = function() {
        
        var user = $scope.username;
        var pwd = $scope.password;
       
        if( user === 'Admin' && pwd === 'Srikanth' ) {
             Auth.setUser(user);
        }
        else {
            alert("Invalid Credentilas");
        }
    }
});*/



var app = angular.module('sandvikusaAdminAppsApp');
    
app.controller('loginCtrl', loginCtrl).$inject = ['$location', 'AuthenticationService', 'FlashService'];
    
function loginCtrl($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }