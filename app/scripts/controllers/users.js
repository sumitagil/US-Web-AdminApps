'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('usersCtrl', function ($scope,$http) {
        $scope.opendiv = 'reports';
        $scope.tblevisible = false;
        $scope.showloadingmodal = true; $scope.CurrentDate = new Date();
        var customerData = {
            'token':'741889E3-4565-40A1-982A-F15F7A923D72',
            'email':"xyz@sandviks.com"
           };
        var url = "http://beta.iservices.earlymoments.com/getappregistrationlist?callback=JSON_CALLBACK";
        $http.jsonp(url,{params : customerData})
             .success(function (data, status, headers, config) {
                    $scope.results = data;
                    $scope.showloadingmodal = false;
                    $scope.tblevisible = true;    
     
                    $scope.models = {
                                      changeInfo: [],
                                      searchText: '',
                                      userlist: $scope.results
                                    };
                    $scope.usersTableColumnDefinition = [
                          {
                            columnHeaderDisplayName: 'Reg Id',
                            displayProperty: 'regId',
                            sortKey: 'regId',
                            columnSearchProperty: 'regId',
                            visible: true
                          },
                          {
                            columnHeaderDisplayName: 'Email',
                            displayProperty: 'email',
                            sortKey: 'email',
                            columnSearchProperty: 'email'
                          },
                          {
                            columnHeaderDisplayName: 'Pay Type',
                            displayProperty: 'paymentType',
                            sortKey: 'paymentType',
                            columnSearchProperty: 'paymentType'
                          },
                          {
                            columnHeaderDisplayName: 'Processed',
                            displayProperty: 'isProcessed',
                            sortKey: 'isProcessed',
                            columnSearchProperty: 'isProcessed'
                          },
                         {
                            columnHeaderDisplayName: 'Payment Id',
                            displayProperty: 'paymentId',
                            sortKey: 'paymentId',
                            columnSearchProperty: 'paymentId'
                          },
                          {
                            columnHeaderDisplayName: 'Updated',
                            displayProperty: 'parseUpdated',
                            sortKey: 'parseUpdated',
                            columnSearchProperty: 'parseUpdated'
                          },
                          {
                            columnHeaderDisplayName: 'ParseId',
                            displayProperty: 'parseId',
                            sortKey: 'parseId',
                            columnSearchProperty: 'parseId'
                          },
                          {
                            columnHeaderDisplayName: 'Req. Type',
                            displayProperty: 'requestType',
                            sortKey: 'requestType',
                            columnSearchProperty: 'requestType'
                          },
                          {
                            columnHeaderDisplayName: 'Sub. Plan',
                            displayProperty: 'subscriptionPlan',
                            sortKey: 'subscriptionPlan',
                            columnSearchProperty: 'subscriptionPlan'
                          },
                          {
                            columnHeaderDisplayName: 'Sub. Amt',
                            displayProperty: 'subscriptionAmount',
                            sortKey: 'subscriptionAmount',
                            columnSearchProperty: 'subscriptionAmount'
                          },
                          {
                            columnHeaderDisplayName: 'Promo Code',
                            displayProperty: 'promotionCode',
                            sortKey: 'promotionCode',
                            columnSearchProperty: 'promotionCode'
                          },
                          {
                            columnHeaderDisplayName: 'Exp. Date',
                            template: "{{formatDate(item.subscriptionExpirationDate) | date:'MM/dd/yyyy' }}",
                            //displayProperty: 'subscriptionExpirationDate',
                            sortKey: 'subscriptionExpirationDate',
                            columnSearchProperty: 'subscriptionExpirationDate'
                          },
                          {
                            columnHeaderDisplayName: 'Voucher',
                            displayProperty: 'voucher',
                            sortKey: 'voucher',
                            columnSearchProperty: 'voucher'
                          }
                        ];
            });
    
            $scope.formatDate = function(date){
                  var dateOut = new Date(date);
                  return dateOut;
            };
    
});