'use strict';

/**
 * @ngdoc function
 * @name sandvikusaAdminAppsApp.controller:promocodeCtrl
 * @description
 * Controller of the sandvikusaAdminAppsApp
 */

var app = angular.module('sandvikusaAdminAppsApp');

app.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('promocodeCtrl', function ($scope,$http,$location) {
    
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
                $scope.hdnPageDesc = "";
                
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
                        
                        var token='741889E3-4565-40A1-982A-F15F7A923D72';
                        
                        var url = "http://beta.iservices.earlymoments.com/insertpromomapping?token="+token+"&PromoCode="+$scope.promo_code+"&CampaignId="+$scope.campaign_id.CampaignId+"&PageId="+$scope.page_id.PageId+"&ConfirmReferenceId="+$scope.refid.EntryId+"&ShortNotes="+$scope.short_notes+"&callback=JSON_CALLBACK";
                        
                        console.log(url);
                       
                        $http.jsonp(url)
                        .success(function (data, status, headers, config) {
                            alert("Record has been added Successfully");
                            $location.path("/promolist");
                            //$scope.message = data;
                        })
                        .error(function(data, status, headers, config){                     
                           alert( "failure message: " + JSON.stringify({data: data}));
                        });
                        
                    } else {
                        $scope.promocodeForm.submitted = true;
                        alert("Please fill the required fields.");
                    }
                  
             }        
});



/*var url = "http://beta.iservices.earlymoments.com/addfilterlist";
 var data = {
                    PromoCode   : $scope.promo_code,
                    CampaignId : $scope.campaign_id,
                    PageId      : $scope.page_id,
                    ConfirmRefId: $scope.refid,
                    ShortNotes  : $scope.short_notes
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