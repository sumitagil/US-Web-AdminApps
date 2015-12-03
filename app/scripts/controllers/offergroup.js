'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('OfferGroupCtrl', function ($scope,$http,$filter,commonService,$route,$timeout) {  
        $scope.maindiv = false;    
        $scope.editing = false;
        $scope.showModal = false;
        $scope.searchText = '';
        $scope.models=[];
        angular.element(".msg").html("");
        $scope.showmsgmodal = false;
        
        /* Add a function */
        $scope.rowExpanded = function (item) {
            //alert(item.OfferGroupId + ' row expanded');
            $scope.models.offergrouplist.forEach(function (selectedItem) {
                if (item.OfferGroupId != selectedItem.OfferGroupId) {
                    $(".glyphicon-minus-sign").attr("ng-class","iconClasses.expand");
                    $(".glyphicon-minus-sign").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign"); 
                    $(".glyphicon-minus-sign").attr("ng-if","iconClasses.expand");
                }
            });
        };
    
       
        var tokendata = {token : '741889E3-4565-40A1-982A-F15F7A923D72' };
    
        /* Get All Project */
        $http.jsonp("http://beta.iservices.earlymoments.com/getprojectlist?callback=JSON_CALLBACK",{params : tokendata})
         .success(function(data) {
            $scope.allProjects = data.response;
         });
    
        /* Get All Credit Rule */
         $http.jsonp("http://beta.iservices.earlymoments.com/getcreditruleslist?callback=JSON_CALLBACK",{params : tokendata})
         .success(function(data) {
            $scope.allCreditrules = data.response;
         }); 
    
         /* Get All Email Template */
          $http.jsonp("http://beta.iservices.earlymoments.com/getemailtemplates?callback=JSON_CALLBACK",{params : tokendata})
          .success(function(data) {
            $scope.allEmailTemps = data;
          }); 
    
        $scope.getrecords = function(event){
            if(event.keyCode==13){
                if($scope.searchText!=''){
                        $scope.loading = true;
                        commonService.displayAllRecords($scope, $http);                    
                }
            }
        }
           
    
        /* for second layer : offer soring.. */
        $scope.orderByField = 'offerId';
        $scope.reverseSort = false;
     
    
        /* third Layer... */
        $scope.tableRowExpanded = false;
        $scope.tableRowIndexExpandedCurr = "";
        $scope.tableRowIndexExpandedPrev = "";
        $scope.storeIdExpanded = "";
    
        $scope.dayDataCollapseFn = function (index) {
            $scope.dayDataCollapse = [];
            for (var i = 0; i < $scope.models.offergrouplist[index].campaigns[index].OfferPages.length; i += 1) {
                $scope.dayDataCollapse.push(false);
            }
        };
    
        $scope.selectTableRow = function (index, campaignId) {
            if (typeof $scope.dayDataCollapse === 'undefined') {
                $scope.dayDataCollapseFn(index);
            }

            if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "" && $scope.storeIdExpanded === "") {
                $scope.tableRowIndexExpandedPrev = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexExpandedCurr = index;
                $scope.storeIdExpanded = campaignId;
                $scope.dayDataCollapse[index] = true;
                $("#icon_"+campaignId).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
            } 
            else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexExpandedCurr === index && $scope.storeIdExpanded === campaignId) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexExpandedCurr = "";
                    $scope.storeIdExpanded = "";
                    $scope.dayDataCollapse[index] = false;
                    $("#icon_"+campaignId).removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
                } else {
                    $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
                    $scope.tableRowIndexExpandedCurr = index;
                    $scope.storeIdExpanded = campaignId;
                    $scope.dayDataCollapse[$scope.tableRowIndexExpandedPrev] = false;
                    $scope.dayDataCollapse[$scope.tableRowIndexExpandedCurr] = true;
                    $(".listSerialicon").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
                    $("#icon_"+campaignId).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
                }  
            }

        };
       /* third Layer..... */
     
        
      //Edit Section and Save Edit..
        /*$scope.itemstatus = [
            {value: 'Y', text: 'Yes'},
            {value: 'N', text: 'No'},
            {value: 'X', text: 'X'}
          ];
        $scope.allstatus = [
            {value: 'Y', text: 'Yes'},
            {value: 'N', text: 'No'}
          ];
        $scope.showStatus = function(itemSelected,c) {
            var selected = [];
            if(itemSelected) {
              if(c==1)
                  selected = $filter('filter')($scope.itemstatus, {value: itemSelected});
              else
                  selected = $filter('filter')($scope.allstatus, {value: itemSelected});
            }
            return selected.length ? selected[0].text : 'Not set';
        };
        $scope.saveUser = function(data, id) {
            //angular.extend(data, {id: id});
            //return $http.post('/saveUser', data);
            alert("please wait...");
            //return false;
        };*/
     //Edit Section and Save Edit..
    
    /*Edit campaign data..*/
    $scope.editCampaignData = function(campaignData,action){
            if(action === 'changeview'){
                action = 'Edit';
            }else{
                $scope.showModal = !$scope.showModal;   
            }
            angular.element(".msg").html("");    
            $scope.actionVal = false;
            $scope.action = action;
            $scope.campaignDatas = angular.copy(campaignData);
            
            if(action==='View'){ 
                $scope.actionVal = true;
                angular.element("#cke_1_top").hide();
            }else{
                angular.element("#cke_1_top").show();   
            }
    };
    
    /* Update Campaign Data... */
    $scope.updateCampaignData= function() {
        var campaignData = {
                            'token':'741889E3-4565-40A1-982A-F15F7A923D72',
                            'CampaignId':this.campaignDatas.CampaignId,
                            'OfferGroupId':this.campaignDatas.OfferGroupId,
                            'CampaignDesc':this.campaignDatas.CampaignDesc,
                            'CreditRule':this.campaignDatas.CreditRule,
                            'ShortNotes':this.campaignDatas.ShortNotes,
                            'Project':this.campaignDatas.Project,
                            'TAC':encodeURIComponent(this.campaignDatas.TAC),
                            'EmailTemplate':this.campaignDatas.EmailTemplate,
                            'DefaultPromoCode':this.campaignDatas.DefaultPromoCode,
                            'conf_pg_tac':this.campaignDatas.conf_pg_tac,
                            'billPlan':this.campaignDatas.billPlan,
                            'special_text':this.campaignDatas.special_text,
                            'title':this.campaignDatas.title,
                             'opt_out':this.campaignDatas.opt_out
                             /*'IsClubShopOffer':this.campaignDatas.IsClubShopOffer,
                             'isActice':this.campaignDatas.isActice,
                             'ccOnBMConfirm':this.campaignDatas.ccOnBMConfirm,
                             'applyEnhancedCTI':this.campaignDatas.applyEnhancedCTI,
                             'maxItemsAllowedInCart':this.campaignDatas.maxItemsAllowedInCart,
                             'campaign_type':this.campaignDatas.campaign_type,
                            'details':this.campaignDatas.details,
                            'splBookDispPropId':this.campaignDatas.splBookDispPropId,
                            'useLitlePaymentService':this.campaignDatas.useLitlePaymentService,
                            'numberOfShipments':this.campaignDatas.numberOfShipments,
                            'baseOfrClub':this.campaignDatas.baseOfrClub,
                            'baseReleaseDate':this.campaignDatas.baseReleaseDate,
                            'upsellId':this.campaignDatas.upsellId,
                            'freeBooksCount':this.campaignDatas.freeBooksCount,
                            'shippingChargeId':this.campaignDatas.shippingChargeId,
                            'autoRenewal':this.campaignDatas.autoRenewal*/
                           };
        //console.log(campaignData);
        var url = "http://beta.iservices.earlymoments.com/updatecampaigndetails?callback=JSON_CALLBACK";
        $http.jsonp(encodeURI(url),{params : campaignData})
        .success(function (data, status, headers, config) {
            //alert(data+"Update successfully");
            $scope.showModal = false;
            $scope.showmsgmodal = true;
            if(commonService.displayAllRecords($scope,$http)!="Error"){
                angular.element("#msgcontent").html('<img src="http://preloaders.net/images/ajax-loader.gif" style="top:50%;"/><b>Updating</b>');
                $timeout(function() {
                    $scope.showmsgmodal = false;
                }, 3000);
            }
        }).error(function (data, status, headers, config) {
             alert("Error to update");
        }); 
    };
    
    /*Edit Offer Data...*/
    $scope.editOfferData = function(offerData,action){
            $scope.showOfferModal = !$scope.showOfferModal;
            $scope.actionVal=false;
            $scope.action = action;
            $scope.OfferId = offerData.OfferId;
            $scope.OfferDescCode = offerData.OfferDescCode;
            $scope.DisplayOrder = offerData.DisplayOrder;
            $scope.ItemSelected = offerData.ItemSelected;
            $scope.IsBonusBundled = offerData.IsBonusBundled;
            $scope.DisplayInCart = offerData.DisplayInCart;
            $scope.IsBaseOffer = offerData.IsBaseOffer;
            $scope.InUse = offerData.InUse;
            $scope.SpecialText = offerData.SpecialText;
            if(action==='View') $scope.actionVal=true;
    };
    
    /*Edit Page Data...*/
    $scope.editPageData = function(pageData,action){
            angular.element(".msg").html("");
            $scope.showPageModal = !$scope.showPageModal;
            $scope.actionVal=false;
            $scope.action = action;
            $scope.pageData = angular.copy(pageData);
            if(action==='View') $scope.actionVal=true;
    };
    
    /*Update Page Data...*/
     $scope.updatePageData= function() {
        var pageData = {
                            'token':'741889E3-4565-40A1-982A-F15F7A923D72',
                            'CampaignId':this.pageData.CampaignId,
                            'PageId':this.pageData.PageId,
                            'PageName':this.pageData.PageName,
                            'PageDesc':this.pageData.PageDesc,
                            'PayOnForm':this.pageData.PayOnForm,
                            'PageShortNotes':this.pageData.PageShortNotes,
                            'PageUrl':this.pageData.PageUrl
                           };
        var url = "http://beta.iservices.earlymoments.com/updatepagedetails?callback=JSON_CALLBACK";
        $http.jsonp(encodeURI(url),{params : pageData})
        .success(function (data, status, headers, config) {
            $scope.showPageModal = false;
            $scope.showmsgmodal = true;
            if(commonService.displayAllRecords($scope,$http)!="Error"){
                angular.element("#msgcontent").html('<img src="http://preloaders.net/images/ajax-loader.gif" style="top:50%;"/><b>Updating</b>');
                $timeout(function() {
                    $scope.showmsgmodal = false;
                }, 3000);
            }
        }).error(function (data, status, headers, config) {
             alert("Error to update");
        }); 
    };
    
});


app.service('commonService', function () {
    return {
        displayAllRecords: function ($scope,$http) { 
                    var url = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
                    $http.jsonp(url)
                    .success(function(data) {
                        $scope.results = data;
                        $scope.loading = false;
                        if($scope.results.length > 0){  
                             $scope.maindiv = true;
                             $scope.models = {
                                              changeInfo: [],
                                              searchText: $scope.searchText,
                                              offergrouplist : $scope.results,
                                              state: {
                                                sortKey: 'offergroupId',
                                                sortDirection: 'DEC' 
                                              }
                            };
                            $scope.offerGroupTableColumnDefinition = [
                                                          {
                                                            columnHeaderDisplayName: 'Offer Group Id',
                                                            displayProperty: 'OfferGroupId',
                                                            sortKey: 'OfferGroupId',
                                                            width: '20em',
                                                            visible: true
                                                          },
                                                          {
                                                            columnHeaderDisplayName: 'Offer Group Desc',
                                                            displayProperty: 'GroupDesc',
                                                            visible: true
                                                          },
                                                          {
                                                            columnHeaderDisplayName: 'campaigns',
                                                            displayProperty: 'campaigns',
                                                            sortKey: 'campaigns',
                                                            visible: false
                                                          }
                                                        ];
                        }
                    }).error(function(){
                        return "Error";
                    });
        }
    };
 });
