'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('OfferGroupCtrl', function ($scope,$http,$filter,commonService,$route,$timeout) { 
        $scope.currentPage = 1;
        $scope.loading=false;
        $scope.getrecords = function(event){
            if(event.keyCode==13 || event.type=='click'){
                $scope.loading=true;
                if($scope.searchText!=''){
                        var url = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
                        $http.jsonp(url).success(function(data) {   
                            $scope.models = data;
                            $scope.loading=false;
                        });
                }else{
                   $scope.loading=false; 
                }
            }
        };
    
        var tokendata = {token : '741889E3-4565-40A1-982A-F15F7A923D72' };
        $scope.selectTableRow = function (offerGroupId) { 
            var c = $("#icon_"+offerGroupId); 
            if(c.attr('class')=="glyphicon glyphicon-plus-sign"){
                c.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
                $("#level2_"+offerGroupId).show();
            }else{
                c.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
                $("#level2_"+offerGroupId).hide();
            }
        };
    
        $scope.selectTableRowCampaign = function (campaignId) {
            var c = $("#icon_"+campaignId); 
            if(c.attr('class')=="glyphicon glyphicon-plus-sign"){
                c.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
                $("#level3_"+campaignId).show();
            }else{
                c.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
                $("#level3_"+campaignId).hide();
            }
        };
    
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
        $scope.levelid=this.campaignDatas.OfferGroupId;
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
                           };
        //console.log(campaignData);
        var url = "http://beta.iservices.earlymoments.com/updatecampaigndetails?callback=JSON_CALLBACK";
        $http.jsonp(encodeURI(url),{params : campaignData})
        .success(function (data, status, headers, config) {
            //alert(data+"Update successfully");
            $scope.showModal = false;
            $scope.showmsgmodal = true;
            /* ================= */
            angular.element("#msgcontent").html('<img src="http://preloaders.net/images/ajax-loader.gif" style="top:50%;"/><b>Updating</b>');
            
            var url1 = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
            $http.jsonp(url1).success(function(data) {   
                $scope.models = data;
                if($scope.models.length > 0){
                    $timeout(function() {
                        $scope.showmsgmodal = false;
                        angular.element("#icon_"+$scope.levelid).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign"); 
                        angular.element('#firstli_'+$scope.levelid).removeClass( "active" );
                        angular.element('#secondli_'+$scope.levelid).addClass( "active" );
                        var v = '#offers_'+$scope.levelid;
                        var v1 = '#campaigns_'+$scope.levelid;
                        angular.element("a[href='"+v+"']").attr('aria-expanded',"false");
                        angular.element("a[href='"+v1+"']").attr('aria-expanded',"true");
                        angular.element("#offers_"+$scope.levelid).removeClass("active");
                        angular.element("#campaigns_"+$scope.levelid).addClass("active");
                        angular.element("#level2_"+$scope.levelid).show(); 
                    }, 1000);
                }else{
                    $scope.showmsgmodal = false;
                }
            });
            /* ================= */
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
    $scope.editPageData = function(pageData,action,offergroupid){
            angular.element(".msg").html("");
            $scope.showPageModal = !$scope.showPageModal;
            $scope.actionVal=false;
            $scope.action = action;
            $scope.pageData = angular.copy(pageData);
            $scope.levelid=offergroupid;
            if(action==='View') $scope.actionVal=true;
    };
    
    /*Update Page Data...*/
     $scope.updatePageData= function() {
        $scope.campId=this.pageData.CampaignId;
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
            angular.element("#msgcontent").html('<img src="http://preloaders.net/images/ajax-loader.gif" style="top:50%;"/><b>Updating</b>');
            
            var url1 = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
            $http.jsonp(url1).success(function(data) {   
                $scope.models = data;
                if($scope.models.length > 0){
                    $timeout(function() {
                        $scope.showmsgmodal = false;
                        angular.element("#icon_"+$scope.levelid).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign"); 
                        angular.element('#firstli_'+$scope.levelid).removeClass( "active" );
                        angular.element('#secondli_'+$scope.levelid).addClass( "active" );
                        var v = '#offers_'+$scope.levelid;
                        var v1 = '#campaigns_'+$scope.levelid;
                        angular.element("a[href='"+v+"']").attr('aria-expanded',"false");
                        angular.element("a[href='"+v1+"']").attr('aria-expanded',"true");
                        angular.element("#offers_"+$scope.levelid).removeClass("active");
                        angular.element("#campaigns_"+$scope.levelid).addClass("active");
                        angular.element("#level2_"+$scope.levelid).show(); 
                        angular.element("#icon_"+$scope.campId).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign"); 
                        angular.element("#level3_"+$scope.campId).show();
                    }, 1000);
                }else{
                    $scope.showmsgmodal = false;
                }
            });
            
        }).error(function (data, status, headers, config) {
             alert("Error to update");
        }); 
    };
    
     $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
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
                             $scope.models = data;
                        }
                    }).error(function(){
                        return "Error";
                    });
        }
    };
 });
