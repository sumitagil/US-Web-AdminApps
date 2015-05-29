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

app.controller('promolistCtrl', function ($scope, $http, $route, $filter, ngTableParams, $timeout) {
    $scope.listAll = true;
    $scope.editAll = false;
    $scope.loading = true;
    $scope.editLoading=false;
     //Get All data
    $http.jsonp("http://beta.iservices.earlymoments.com/getpromomappings?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
        .success(function(data) {
            $scope.results = data.response;
            $scope.loading = false; 
            var arr=$scope.results;
            //pagination start...
            /*$scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.maxPage = numberOfPages($scope.results,$scope.pageSize);*/
           //end pagination
            
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
                $scope.hdnCampaignDesc = ""; 
                $scope.hdnRefDesc = ""; 
                $scope.hdnPageDesc = "";
                $scope.pageids = "";
        
               if ($scope.promocodeForm.$valid) {                      
                        var token='741889E3-4565-40A1-982A-F15F7A923D72';
                        var selpageId=0,selrefId=0,selshortnotes='',selcampaignId;
                        console.log($scope.page_id);
                        if($scope.campaign_id.CampaignId=="" || $scope.campaign_id.CampaignId==null || $scope.campaign_id.CampaignId==undefined){
                            selcampaignId=$scope.campaign_id;
                        }
                        
                        if($scope.page_id=="" || $scope.page_id==null || $scope.page_id==undefined || $scope.page_id==0){
                            selpageId=0;
                        }else if($scope.page_id>0){
                            selpageId=$scope.page_id;
                        }
                        else{
                            selpageId=$scope.page_id.PageId;
                        }
                        if($scope.refid!="" && $scope.refid!=null && $scope.refid!=undefined){
                            selrefId=$scope.refid.EntryId;
                        }
                        if($scope.short_notes!="" && $scope.short_notes!=null && $scope.short_notes!=undefined){
                            selshortnotes=$scope.short_notes;
                        }
                        //console.log(selpageId+"=="+$scope.page_id.PageId +'=='+$scope.page_id);
                       
                        var url = "http://beta.iservices.earlymoments.com/UpdatePromoMapping?token="+token+"&EntryId="+$scope.EntryId+"&PromoCode="+$scope.promo_code+"&CampaignId="+selcampaignId+"&PageId="+selpageId+"&ConfirmReferenceId="+selrefId+"&ShortNotes="+selshortnotes+"&callback=JSON_CALLBACK";
                        
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


app.filter('firstPage', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});

function numberOfPages(results,pageSize){
    return Math.ceil(results.length/pageSize);                
}