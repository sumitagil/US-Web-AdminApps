'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('usersCtrl', function ($scope,$http) {
        $scope.opendiv = 'reports';
        $scope.tblevisible = false;
        $scope.selpageno = 10;
        angular.element("#showdiv").hide();
    
        $scope.getrecords = function(event){
            if(event.keyCode==13){
                if($scope.searchText!=''){
                        $scope.showloadingmodal = true;
                        var customerData = {
                            'token':'741889E3-4565-40A1-982A-F15F7A923D72',
                            'email':$scope.searchText
                           };
                        console.log(customerData);
                        var url = "http://beta.iservices.earlymoments.com/getappregistrationlist?callback=JSON_CALLBACK";
                        $http.jsonp(url,{params : customerData})
                             .success(function (data, status, headers, config) {
                                    $scope.results = data;
                                    $scope.showloadingmodal = false;
                                    $scope.tblevisible = true;
                             });                    
                }
            }
        }
    
    
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
    
        $scope.viewCustomerData = function(data){
            $scope.showCustomerModal = !$scope.showCustomerModal;
            $scope.modalrecords = angular.copy(data);
        };
    
        $scope.items = [];
        var count = 1;
        $scope.add = function () {
          $scope.items.push({ 
            datafield: "",
            operatorvalue: "",
            datavalue: ""
          });
        console.log($scope.items);
        };
        
        $scope.opendiv = function(){  
            if($scope.items.length == 0){
               this.add(); 
            }
            angular.element("#showdiv").toggle();
        };
    
        $scope.remove = function(index) {
            if($scope.items.length === 1){
                angular.element("#showdiv").hide();
            }
            $scope.items.splice(index, 1)[0];
        };
    
    
        $scope.searchdata = function(){
            var url="http://beta.iservices.earlymoments.com/getappregistrationlist?token=741889E3-4565-40A1-982A-F15F7A923D72&callback=JSON_CALLBACK";
            var c;
            if($scope.items.length > 0)
            {
                for(var i=0; i < $scope.items.length; i++ ){
                    c = $scope.items[i].datafield+$scope.items[i].operatorvalue+$scope.items[i].datavalue;
                    url += "&"+c;
                    /*if(i==0)
                        url += "?"+c;
                    else
                        url += "&"+c;*/
                }
            }
            console.log(url);
            
            $scope.showloadingmodal = true;
            $http.jsonp(url)
            .success(function (data, status, headers, config) {
                    $scope.results = data;
                    $scope.showloadingmodal = false;
                    $scope.tblevisible = true;
            });
        };
    
});