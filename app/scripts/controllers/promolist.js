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

app.controller('promolistCtrl', function ($scope,$http,$route,$modal,$timeout,$window) {
    
    $scope.promoloading = false;
    $scope.results = [];
    $scope.allcampaignids = [];
    $scope.pageids = [];
    $scope.allrefids = [];
    $scope.showPromoModal = false;
    
    
     //Get All data
    $http.jsonp("http://beta.iservices.earlymoments.com/getpromomappings?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
        .success(function(data) {
            $scope.results = data.response ;
            $scope.promoloading = false;  
        }).error(function(){
            $scope.promoloading = false;
            alert("Error");
        });  
    
    //All Campaign Ids
    $http.jsonp("http://beta.iservices.earlymoments.com/getcampaignlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
    .success(function(data) {
          $scope.allcampaignids = data.response;
          $scope.editLoading=false;
    });

     //All page Ids
    /*$http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&CampaignId="+ $scope.campaign_id+"&format=json&callback=JSON_CALLBACK")
    .success(function(data) {
        $scope.pageids = data.response;
    });*/
                
    //All reference Ids
    $http.jsonp("http://beta.iservices.earlymoments.com/getorderformdetails?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
    .success(function(data) {
        $scope.allrefids = data.response;
    });

    //Get Page Id wrt Campaign Id
    $scope.getPageId=function(item){
         //if(angular.isObject(item)){
            $http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&CampaignId="+item+"&format=json&callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.pageids = data.response;
            });
    }; 
    
    //Edit Data
    $scope.editpromodata = function(data) {     
            $scope.editPromoModal = !$scope.editPromoModal;
            $scope.editrecords = angular.copy(data);
            $http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&CampaignId="+ $scope.editrecords.CampaignId+"&format=json&callback=JSON_CALLBACK")
            .success(function(data1) {
                $scope.pageids = data1.response;
            });
    }; 
    
 
    //update Data
    $scope.updatePromoData = function() { 
                
               //if ($scope.promocodeForm.$valid) 
               //{                      
                        $scope.responsemsg = "";                
                        var token='741889E3-4565-40A1-982A-F15F7A923D72';                   
                        if($scope.PageId=="" || $scope.PageId==null || $scope.PageId==undefined)
                            $scope.PageId=0;
                        if($scope.ConfirmRefId=="" && $scope.ConfirmRefId==null || $scope.ConfirmRefId==undefined)
                            $scope.ConfirmRefId=0;
                        if($scope.ShortNotes==null || $scope.ShortNotes==undefined)
                            $scope.ShortNotes="";
                       
                        var url = "http://beta.iservices.earlymoments.com/UpdatePromoMapping?token="+token+"&EntryId="+$scope.editrecords.EntryId+"&PromoCode="+$scope.editrecords.PromoCode+"&CampaignId="+$scope.editrecords.CampaignId+"&PageId="+$scope.editrecords.PageId+"&ConfirmReferenceId="+$scope.editrecords.ConfirmRefId+"&ShortNotes="+$scope.editrecords.ShortNotes+"&callback=JSON_CALLBACK";
                                                                   
                        $http.jsonp(url)
                        .success(function (data, status, headers, config) { 
                            $scope.responsemsg = "Record has been updated Successfully";
                            $timeout(function() {
                                $scope.editPromoModal = false;
                                $window.location.reload();
                            },500);
                        })
                        .error(function(data, status, headers, config){                     
                           alert( "failure message: " + JSON.stringify({data: data}));
                        });
                        
               /* } 
                else{
                        var errMsg="",i=0; 
                        if($scope.PromoCode=="" || $scope.PromoCode==undefined)
                            errMsg= ++i +" Promo Code is required. <br/>";
                        if($scope.CampaignId=="" || $scope.CampaignId==undefined)
                            errMsg=errMsg + ++i + " Campaign Id is required. <br/>";
                        if(errMsg!="" && errMsg!= undefined)
                            errMsg="Please address the error and then submit the form...<br/><br/>"+errMsg;                           
                        
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
                }*/
        }
    
    $scope.addPromoModal = function(){
        $scope.showPromoModal=!$scope.showPromoModal;
        $scope.addarrData=[];
    };
    
    $scope.addPromoData = function() {  
            $scope.responsemsg="";
            var token='741889E3-4565-40A1-982A-F15F7A923D72';           
            if($scope.page_id=="" || $scope.page_id==null || $scope.page_id==undefined)
                $scope.page_id=0;
            if($scope.refid=="" || $scope.refid==null || $scope.refid==undefined)
                $scope.refid=0;
            if($scope.short_notes=="" || $scope.short_notes==null || $scope.short_notes==undefined)
                $scope.short_notes="";

            var url = "http://beta.iservices.earlymoments.com/insertpromomapping?token="+token+"&PromoCode="+$scope.addarrData.promo_code+"&CampaignId="+$scope.addarrData.campaign_id+"&PageId="+$scope.addarrData.page_id+"&ConfirmReferenceId="+$scope.addarrData.refid+"&ShortNotes="+$scope.addarrData.short_notes+"&callback=JSON_CALLBACK";
            $http.jsonp(url)
            .success(function (data, status, headers, config) {
                $scope.responsemsg = "Record has been added Successfully";
                 $timeout(function() {
                                $scope.showPromoModal = false;
                                $window.location.reload();
                            },500);
            })
            .error(function(data, status, headers, config){                     
                alert("failure message: " + JSON.stringify({data: data}));
            });
       
     };
    
 });    