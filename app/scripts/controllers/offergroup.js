'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('OfferGroupCtrl', function ($scope,$http,$filter) {
        $scope.maindiv = false;    
        $scope.editing = false;
        $scope.showModal = false;
        $scope.searchText = '';
        $scope.models=[];
        
        //Add a function
        /*$scope.rowExpanded = function (item) {
            //console.log(item);
            alert(item.offergroupId + ' row expanded');
            $scope.models.offergrouplist.forEach(function (selectedItem) {
                if (item.offergroupId != selectedItem.offergroupId) {
                    $(".glyphicon-minus-sign").attr("ng-class","iconClasses.expand");
                    $(".glyphicon-minus-sign").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");                  
                }
            });
        };*/
    
        $scope.getrecords = function(){
            if($scope.searchText!=''){
                   //Get All data
                    var url = "http://beta.iservices.earlymoments.com/getSamsOfferGroups?token=741889E3-4565-40A1-982A-F15F7A923D72&campdesc="+$scope.searchText+"&format=json&callback=JSON_CALLBACK";
                    console.log(url);
                    $http.jsonp(url)
                    .success(function(data) {
                        $scope.results = data;
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
                            console.log($scope.models);
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
            for (var i = 0; i < $scope.models.offergrouplist[index].campaigns[[index]].OfferPages.length; i += 1) {
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
            $scope.showModal = !$scope.showModal;
            $scope.actionVal=false;
            $scope.action = action;
            $scope.campaignId = campaignData.campaignId;
            $scope.CampaingDesc = campaignData.CampaingDesc;
            $scope.CampaignCreditRule = campaignData.CampaignCreditRule;
            $scope.CampaignShortNotes = campaignData.CampaignShortNotes;
            $scope.Project = campaignData.Project;
            $scope.IsClubShopOffer = campaignData.IsClubShopOffer;
            if(action==='View') $scope.actionVal=true;
            //alert(action+' changed');
    };
    $scope.updateCampaignData= function() {
        var campaignData = {'campaignId':this.campaignId,
                            'CampaingDesc':this.CampaingDesc,
                            'CampaignCreditRule':this.CampaignCreditRule,
                            'CampaignShortNotes':this.CampaignShortNotes,
                            'Project':this.Project,
                            'IsClubShopOffer':this.IsClubShopOffer
                           };
        //alert("please wait...");
        this.editCampaignData(campaignData,'View');
    };
    
});


app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
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