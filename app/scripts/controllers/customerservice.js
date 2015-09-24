'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('customerserviceCtrl', function ($scope,$http) {
        angular.element('#datetimepicker1').datetimepicker({
            format: 'MM/DD/YYYY'
        });
        angular.element('#datetimepicker2').datetimepicker({
            format: 'MM/DD/YYYY',
            useCurrent: false
        });
        angular.element("#datetimepicker1").on("dp.change", function (e) {
            angular.element('#datetimepicker2').data("DateTimePicker").minDate(e.date);
        });
        angular.element("#datetimepicker2").on("dp.change", function (e) {
            angular.element('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
        });
        
        $scope.showdetailsdiv = false;
        $scope.showmore=function(p){
            if(p=='D')
                $scope.showdetailsdiv = true;  
            else
                $scope.showdetailsdiv = false;  
        };
       
        $scope.result = [];
        $scope.showmsgmodal = false;
        $scope.getAllRecords = function(){
            var customerData = {
                            'token':'741889E3-4565-40A1-982A-F15F7A923D72',
                            'sdate':angular.element('#startdate').val(),
                            'edate':angular.element('#enddate').val(),
                            'bill_name' : $scope.billingname,
                            'cart_id' : $scope.cartid,
                            'promotion_code' : $scope.promotioncode,
                            'cust_no' : $scope.customerno,
                            'email' : $scope.emailaddress
                           };
            $scope.showmsgmodal = true;
            angular.element("#msgcontent").html('<img src="http://preloaders.net/images/ajax-loader.gif" style="top:50%;"/>');
            var url = "http://beta.iservices.earlymoments.com/getCustomerOrders?callback=JSON_CALLBACK";
            $http.jsonp(url,{params : customerData})
                 .success(function (data, status, headers, config) {
                        $scope.results = data;
                        $scope.showmsgmodal = false;
                 });
        };
    
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
    
        $scope.viewCustomerData = function(data){
            $scope.showCustomerModal = !$scope.showCustomerModal;
            $scope.modalrecords = angular.copy(data);
        };
    
});