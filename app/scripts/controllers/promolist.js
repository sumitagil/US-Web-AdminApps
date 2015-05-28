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

app.controller('promolistCtrl', function ($scope,$http,$route) {
    $scope.listAll = true;
    $scope.editAll = false;
    $scope.loading = true;
    $scope.editLoading=false;
     //Get All data
    $http.jsonp("http://beta.iservices.earlymoments.com/getpromomappings?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
        .success(function(data) {
            $scope.results = data.response ;
            $scope.loading = false;  
        }).error(function(){
            alert("Error");
        });  
    
    
    //Edit Data
    $scope.editpromodata = function(index) {  
               
         $scope.editLoading=true;
            $http.jsonp('http://beta.iservices.earlymoments.com/getpromomappings?token=741889E3-4565-40A1-982A-F15F7A923D72&EntryId='+index+'&format=json&callback=JSON_CALLBACK')   
            
            .success(function (data, status, headers, config) {             
                $scope.listAll = false;
                $scope.editAll = true;  
              
                $scope.EntryId           =   data.response[0].EntryId;
                $scope.promo_code        =   data.response[0].PromoCode;
                $scope.campaign_id       =   data.response[0].CampaignId;
                $scope.page_id           =   data.response[0].PageId;
                $scope.refid             =   data.response[0].ConfirmRefId;
                $scope.short_notes       =   data.response[0].ShortNotes; 
                
                //////////////////////////////////////////////////////////
                    $scope.hdnCampaignDesc = ""; 
                    $scope.hdnRefDesc = ""; 
                    $scope.hdnPageDesc = "";
                    $scope.pageids = "";


                    //Campaign Ids
                    $http.jsonp("http://beta.iservices.earlymoments.com/getcampaignlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
                    .success(function(data) {
                        $scope.allcampaignids = data.response;
                          $scope.editLoading=false;
                    });

                    //reference Ids
                    $http.jsonp("http://beta.iservices.earlymoments.com/getorderformdetails?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
                    .success(function(data) {
                        $scope.allrefids = data.response;
                    });
                
                    //page Ids
                    $http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&CampaignId="+ $scope.campaign_id+"&format=json&callback=JSON_CALLBACK")
                    .success(function(data) {
                        $scope.pageids = data.response;
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
                /////////////////////////////////////////////////////////
            })
            .error(function(data, status, headers, config){
               alert("Error");
            });
    } 
    
    //update Data
    $scope.editPromoCode = function() {
                
               if ($scope.promocodeForm.$valid) {                      
                        var token='741889E3-4565-40A1-982A-F15F7A923D72';
                        
                        var url = "http://beta.iservices.earlymoments.com/UpdatePromoMapping?token="+token+"&EntryId="+$scope.EntryId+"&PromoCode="+$scope.promo_code+"&CampaignId="+$scope.campaign_id.CampaignId+"&PageId="+$scope.page_id.PageId+"&ConfirmReferenceId="+$scope.refid.EntryId+"&ShortNotes="+$scope.short_notes+"&callback=JSON_CALLBACK";
                        
                        //console.log(url);
                       
                        $http.jsonp(url)
                        .success(function (data, status, headers, config) {
                            alert("Record has been updated Successfully");
                            $route.reload();
                            $scope.listAll = true;
                            $scope.editAll = false;
                        })
                        .error(function(data, status, headers, config){                     
                           alert( "failure message: " + JSON.stringify({data: data}));
                        });
                        
                } else {
                    $scope.promocodeForm.submitted = true;
                    alert("Please fill the required fields.");
                }
        }
        
    //Refresh Page
    $scope.refreshdata = function(){
        $route.reload();
    }
    
 });



