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

app.controller('promocodeCtrl', function ($scope,$http,$location,$modal) {
    
            $scope.hdnCampaignDesc = ""; 
            $scope.hdnRefDesc = ""; 
            $scope.hdnPageDesc = "";
            $scope.pageids = "";
            $scope.msg="";          
            $scope.insertloading = true;
        
            //Campaign Ids
            $http.jsonp("http://beta.iservices.earlymoments.com/getcampaignlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.allcampaignids = data.response;
                $scope.insertloading = false;
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
                  var action='';
                    
                  if ($scope.promocodeForm.$valid) {
                       
                        var token='741889E3-4565-40A1-982A-F15F7A923D72';
                        var selpageId=0,selrefId=0,selshortnotes='';
                    
                        if($scope.page_id!="" && $scope.page_id!=null && $scope.page_id!=undefined){
                            selpageId=$scope.page_id.PageId;
                        }
                        if($scope.refid!="" && $scope.refid!=null && $scope.refid!=undefined){
                            selrefId=$scope.refid.EntryId;
                        }
                        if($scope.short_notes!="" && $scope.short_notes!=null && $scope.short_notes!=undefined){
                            selshortnotes=$scope.short_notes;
                        }
                        
                        var url = "http://beta.iservices.earlymoments.com/insertpromomapping?token="+token+"&PromoCode="+$scope.promo_code+"&CampaignId="+$scope.campaign_id.CampaignId+"&PageId="+selpageId+"&ConfirmReferenceId="+selrefId+"&ShortNotes="+selshortnotes+"&callback=JSON_CALLBACK";
                       
                        $http.jsonp(url)
                        .success(function (data, status, headers, config) {
                            alert("Record has been added Successfully");
                            $location.path("/promolist");
                        })
                        .error(function(data, status, headers, config){                     
                           alert( "failure message: " + JSON.stringify({data: data}));
                        });
                        
                    } else {
                        var errMsg="",i=0; 
                        if($scope.promo_code=="" || $scope.promo_code==undefined)
                            errMsg= ++i +" Promo Code is required. <br/>";
                        if($scope.campaign_id>0 || $scope.campaign_id==undefined)
                            errMsg=errMsg + ++i + " Campaign Id is required. <br/>";
                        
                        if(errMsg!="" && errMsg!='undefined' && errMsg!= undefined)
                            errMsg="Please address the error and then submit the form...<br/>"+errMsg;                           
                        $scope.msg=errMsg;   
                        var modalInstance = $modal.open({
                            templateUrl: 'myModalContent.html',
                            controller: 'ModalInstanceCtrl',
                            resolve: {
                                        msg: function () {
                                          return $scope.msg;
                                        }
                                     }
                        });
                        $scope.promocodeForm.submitted = false;
                    }
                  
             } 
            
            
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, msg) {
    
    $scope.msg = msg;
    $scope.ok = function () {
                $modalInstance.close();
    };
});