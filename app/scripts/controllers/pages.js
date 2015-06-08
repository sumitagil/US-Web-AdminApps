'use strict';

/**
 * @ngdoc function
 * @name globsynApp.controller:promolistCtrl
 * @description
 * # AboutCtrl
 * Controller of the globsynApp
 */
var app=angular.module('sandvikusaAdminAppsApp');

app.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('pageCtrl', function ($scope,$http,$route) {
        
        $scope.results = [];
        $scope.allPageIds = [];
        $scope.loading = true;
        $scope.oneAtATime = true;
        $scope.curPage = 0;
        $scope.pageSize = 5;
        $scope.MaxPage = 0;
        $scope.Run=1;    

        //Get All data start
        $http.jsonp("http://beta.iservices.earlymoments.com/getcampaignlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
        .success(function(data) {
            $scope.results = data.response ;                     
            $scope.numberOfPages=function(){
                return Math.ceil($scope.results.length / $scope.pageSize);
            }
            $scope.MaxPage=$scope.numberOfPages();
            $scope.loading = false;                 
        }).error(function(){
            alert("Error");
        }); 
       //Get All data end
    
    
       // Onclick get page data start
        $scope.getPageData = function(cid) { 
            //All page Ids
            $http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&CampaignId="+ cid+"&format=json&callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.allPageIds = data.response;
            });
         }
        // Onclick get page data end
        
         $scope.editModeBtn = function() {
            $scope.editMode = true;
         }
         $scope.saveModeBtn = function() {
            $scope.editMode = false;
         }
         $scope.cancelModeBtn = function() {
            $scope.editMode = false;
         }
        
});