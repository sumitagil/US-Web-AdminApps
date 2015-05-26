'use strict';

/**
 * @ngdoc function
 * @name sandvikusaAdminAppsApp.controller:promocodeCtrl
 * @description
 * Controller of the sandvikusaAdminAppsApp
 */

var app = angular.module('sandvikusaAdminAppsApp');


app.controller('promocodeCtrl', function ($scope,$http) {
    
            $scope.hdnCampaignDesc = ""; 
            $scope.hdnRefDesc = ""; 
            $scope.hdnPageDesc = "";
            $scope.pageids = "";
            
            
            //Campaign Ids
            $http.jsonp("http://beta.iservices.earlymoments.com/getcampaignlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.allcampaignids = data.response;
            });
            
            //reference Ids
            $http.jsonp("http://beta.iservices.earlymoments.com/getorderformdetails?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.allrefids = data.response;
            });
    
            //Campaign Details
            $scope.getCampaignDetails=function(item){
                
                $scope.hdnCampaignDesc = item.CampaingDesc;            
                
                //call page data...
                $http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&CampaignId="+item.CampaignId+"&format=json&callback=JSON_CALLBACK")
                
                .success(function(data) {
                    $scope.pageids = data.response;
                });
            } 
            
            //Page Details
            $scope.getPageDetails=function(item){
                $scope.hdnPageDesc = item.PageDesc;
            }
            
            //Reference Details
            $scope.getRefDetails=function(item){
                $scope.hdnRefDesc = item.ShortNotes;
            } 
    
            //Add records  
            $scope.submitted = false;
            $scope.addPromoCode = function() {
                  
                    if ($scope.promocodeForm.$valid) {
                        alert("Success");
                        
                    } else {
                        $scope.promocodeForm.submitted = true;
                        alert("Please fill the required fields.");
                    }
                  
             }        
});

/*var url = "http://beta.iservices.earlymoments.com/addfilterlist";
                    var data = {
                                    promo_code  : $scope.promo_code,
                                    campaign_id : $scope.campaign_id,
                                    page_id     : $scope.page_id,
                                    refid       : $scope.refid,
                                    short_notes : $scope.short_notes,
                                    callback    : JSON_CALLBACK
                                };
                             
                                    
                    $http.jsonp(url,data)
               
                    .success(function (data, status, headers, config) {
                        //alert("Record has been added Successfully");
                        //$location.path("/filterlist");
                        $scope.message = data;
                    })

                    .error(function(data, status, headers, config){                     
                       alert( "failure message: " + JSON.stringify({data: data}));
                    });
                    
                    // Making the fields empty
                    $scope.promo_code='';
                    $scope.campaign_id='';
                    $scope.page_id='';
                    $scope.refid='';
                
                    */