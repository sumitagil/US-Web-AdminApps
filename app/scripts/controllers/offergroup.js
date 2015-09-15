'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('OfferGroupCtrl', function ($scope,$http,$filter,$route) {  
        $scope.maindiv = false;    
        $scope.editing = false;
        $scope.showModal = false;
        $scope.searchText = '';
        $scope.models=[];
        angular.element(".msg").html("");
        
        //Add a function
        $scope.rowExpanded = function (item) {
            //console.log(item);
            //alert(item.OfferGroupId + ' row expanded');
            $scope.models.offergrouplist.forEach(function (selectedItem) {
                if (item.OfferGroupId != selectedItem.OfferGroupId) {
                    $(".glyphicon-minus-sign").attr("ng-class","iconClasses.expand");
                    $(".glyphicon-minus-sign").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign"); 
                     $(".glyphicon-minus-sign").attr("ng-if","iconClasses.expand");
                }
            });
        };
    
        //Get All Project
         var tokendata = {token : '741889E3-4565-40A1-982A-F15F7A923D72' };
         /*$http.jsonp("http://beta.iservices.earlymoments.com/getprojectlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")*/
        $http.jsonp("http://beta.iservices.earlymoments.com/getprojectlist?callback=JSON_CALLBACK",{params : tokendata})
         .success(function(data) {
            $scope.allProjects = data.response;
         }); //end
        //Get All Credit Rule
         $http.jsonp("http://beta.iservices.earlymoments.com/getcreditruleslist?callback=JSON_CALLBACK",{params : tokendata})
         .success(function(data) {
            $scope.allCreditrules = data.response;
         }); //end
    
         //Get All Email Template
          $http.jsonp("http://beta.iservices.earlymoments.com/getemailtemplates?callback=JSON_CALLBACK",{params : tokendata})
          .success(function(data) {
            $scope.allEmailTemps = data;
          }); //end
    
        $scope.getrecords = function(event){
            if(event.keyCode==13){
            if($scope.searchText!=''){
                    $scope.loading = true;
                    //Get All data
                    var url = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
                    $http.jsonp(url)
                    .success(function(data) {
                        $scope.results = data;
                        if($scope.results.length > 0){
                             $scope.loading = false;
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
                        alert("Error");
                    });   
            }
            }
        }   
    
       
    
        //for second layer : offer soring..
        $scope.orderByField = 'offerId';
        $scope.reverseSort = false;
     
    
        //////// third Layer...
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
       //////// third Layer.....
     
        
      //Edit Section and Save Edit..
        $scope.itemstatus = [
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
        };
     //Edit Section and Save Edit..
    
    //Edit campaign data..
    $scope.editCampaignData = function(campaignData,action){
            angular.element(".msg").html("");    
            $scope.showModal = !$scope.showModal;
            $scope.actionVal=false;
            $scope.action = action;
            $scope.campaignDatas = angular.copy(campaignData);
            
            if(action==='View'){ 
                $scope.actionVal=true;
                angular.element("#cke_1_top").hide();
            }else{
             angular.element("#cke_1_top").show();   
            }
    };
    
    //Update Campaign Data...
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
                             'opt_out':this.campaignDatas.opt_out,
                             'IsClubShopOffer':this.campaignDatas.IsClubShopOffer,
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
                            'autoRenewal':this.campaignDatas.autoRenewal
                           };
        var url = "http://beta.iservices.earlymoments.com/updatecampaigndetails?callback=JSON_CALLBACK";
        $http.jsonp(encodeURI(url),{params : campaignData})
        .success(function (data, status, headers, config) {
            angular.element(".msg").html("<b>Update successfully</b>");
            //show the updated data...
            for(var i=0;i<$scope.models.offergrouplist.length;i++){
                if($scope.models.offergrouplist[i].OfferGroupId === campaignData.OfferGroupId){
                    for(var j=0;j<$scope.models.offergrouplist[i].campaigns.length;j++){
                        if($scope.models.offergrouplist[i].campaigns[j].CampaignId === campaignData.CampaignId){
                                $scope.models.offergrouplist[i].campaigns[j].CampaignDesc = campaignData.CampaignDesc;
                                $scope.models.offergrouplist[i].campaigns[j].CreditRule = campaignData.CreditRule;
                                $scope.models.offergrouplist[i].campaigns[j].ShortNotes = campaignData.ShortNotes;
                                $scope.models.offergrouplist[i].campaigns[j].Project = campaignData.Project;
                                $scope.models.offergrouplist[i].campaigns[j].TAC = decodeURIComponent(campaignData.TAC);
                            
                                $scope.models.offergrouplist[i].campaigns[j].EmailTemplate = campaignData.EmailTemplate;
                                $scope.models.offergrouplist[i].campaigns[j].DefaultPromoCode = campaignData.DefaultPromoCode;
                                $scope.models.offergrouplist[i].campaigns[j].conf_pg_tac = campaignData.conf_pg_tac;
                                $scope.models.offergrouplist[i].campaigns[j].billPlan = campaignData.billPlan;
                                $scope.models.offergrouplist[i].campaigns[j].special_text = campaignData.special_text;
                                $scope.models.offergrouplist[i].campaigns[j].title = campaignData.title;
                                $scope.models.offergrouplist[i].campaigns[j].opt_out = campaignData.opt_out;
                                $scope.models.offergrouplist[i].campaigns[j].IsClubShopOffer = campaignData.IsClubShopOffer;
                                $scope.models.offergrouplist[i].campaigns[j].isActice = campaignData.isActice;
                                $scope.models.offergrouplist[i].campaigns[j].ccOnBMConfirm = campaignData.ccOnBMConfirm;
                                $scope.models.offergrouplist[i].campaigns[j].applyEnhancedCTI = campaignData.applyEnhancedCTI;
                                $scope.models.offergrouplist[i].campaigns[j].maxItemsAllowedInCart = campaignData.maxItemsAllowedInCart;
                                $scope.models.offergrouplist[i].campaigns[j].campaign_type = campaignData.campaign_type;
                                $scope.models.offergrouplist[i].campaigns[j].details = campaignData.details;
                                $scope.models.offergrouplist[i].campaigns[j].splBookDispPropId = campaignData.splBookDispPropId;
                                $scope.models.offergrouplist[i].campaigns[j].useLitlePaymentService = campaignData.useLitlePaymentService;
                                $scope.models.offergrouplist[i].campaigns[j].numberOfShipments = campaignData.numberOfShipments;
                                $scope.models.offergrouplist[i].campaigns[j].autoRenewal = campaignData.autoRenewal;
                                $scope.models.offergrouplist[i].campaigns[j].baseOfrClub = campaignData.baseOfrClub;
                                $scope.models.offergrouplist[i].campaigns[j].baseReleaseDate = campaignData.baseReleaseDate;
                                $scope.models.offergrouplist[i].campaigns[j].upsellId = campaignData.upsellId;
                                $scope.models.offergrouplist[i].campaigns[j].freeBooksCount = campaignData.freeBooksCount;
                                $scope.models.offergrouplist[i].campaigns[j].shippingChargeId = campaignData.shippingChargeId;
                                break;
                        }
                    }
                }
            }//end
            $scope.showModal=false;
        }).error(function (data, status, headers, config) {
             alert("Error to update");
        }); 
    };
    
    //Edit Offer Data...
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
    
    //Edit Page Data...
    $scope.editPageData = function(pageData,action){
            angular.element(".msg").html("");
            $scope.showPageModal = !$scope.showPageModal;
            $scope.actionVal=false;
            $scope.action = action;
            $scope.pageData = angular.copy(pageData);
            if(action==='View') $scope.actionVal=true;
    };
    
    //Update Page Data...
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
            angular.element(".msg").html("<b>Update successfully</b>");
            //show the updated data...
            var f=0;
            for(var i=0;i<$scope.models.offergrouplist.length;i++){
                for(var j=0;j<$scope.models.offergrouplist[i].campaigns.length;j++){
                    if($scope.models.offergrouplist[i].campaigns[j].CampaignId === pageData.CampaignId){
                        for(var k=0;k<$scope.models.offergrouplist[i].campaigns[j].OfferPages.length;k++){
                                if($scope.models.offergrouplist[i].campaigns[j].OfferPages[k].PageId === pageData.PageId){
                                    $scope.models.offergrouplist[i].campaigns[j].OfferPages[k].PageName = pageData.PageName;
                                    $scope.models.offergrouplist[i].campaigns[j].OfferPages[k].PageDesc = pageData.PageDesc;
                                    $scope.models.offergrouplist[i].campaigns[j].OfferPages[k].PageShortNotes = pageData.PageShortNotes;
                                    $scope.models.offergrouplist[i].campaigns[j].OfferPages[k].PageUrl = pageData.PageUrl;
                                    $scope.models.offergrouplist[i].campaigns[j].OfferPages[k].PayOnForm = pageData.PayOnForm;
                                    break;
                                }
                        }
                        f=1;
                        break;
                    }
                }
                if(f===1){
                 break;   
                }
            }//end
            $scope.showPageModal=false;
        }).error(function (data, status, headers, config) {
             alert("Error to update");
        }); 
    };
    
});


app.directive('modal', function () {
    return {
      template: '<div class="modal fade campaignModal">' + 
          '<div class="modal-dialog {{class}}">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.class = attrs.rel;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
