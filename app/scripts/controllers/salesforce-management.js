'use strict';

var app = angular.module('sandvikusaAdminAppsApp');

app.controller('salesforceCtrl', function ($scope,$http) {
        $scope.opendiv = 'salesforce';
        $scope.listingdiv = false;
        $scope.editloadingimage = false;
        $scope.results = [];
        $scope.allPostIds = [];
        $scope.addlist = [];
        $scope.responsemsg = '';
        $scope.displaySeqArr = [1,2,3,4,5,6,7,8,9,10];
		var customerData = {'token':'68510D51-7677-4B7A-A154-C1812F80B783'};
        
        $scope.showloadingmodal = true;
        var url = "http://iservices.earlymoments.com/getLeadEmailContentManagerList?callback=JSON_CALLBACK";
        $http.jsonp(url,{params : customerData})
             .success(function (data, status, headers, config) {
                    if(data.status==true){
                        $scope.results = data.LeadEmailContentList;
                    }
                    $scope.showloadingmodal = false;
             });
        
        /* GET ALL POST ID LIST */
        var editurl = "http://iservices.earlymoments.com/getBlogContentList?callback=JSON_CALLBACK";
        $http.jsonp(editurl,{params : customerData})
             .success(function (data, status, headers, config) {
                    if(data.status==true){
                        $scope.allPostIds = data.BlogContents; 
                    }
             });
    
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
    
        $scope.viewCustomerData = function(data){
            $scope.responsemsg = '';
            $scope.showCustomerModal = !$scope.showCustomerModal;
            $scope.editrecords = angular.copy(data);
            $scope.editlist = $scope.results;
        };
    
        $scope.updateRecords = function(persona,emailno){
            console.log("persona="+persona+"emailno="+emailno);
            console.log("editrecords.blogId="+$scope.editrecords.blogId+
                        "editrecords.displaySequence="+$scope.editrecords.displaySequence+
                        "editrecords.postTitle="+$scope.editrecords.postTitle);
            $scope.responsemsg = "Thank you, records has been successfully updated.";
        };
    
        $scope.addCustomerData = function(){
            $scope.responsemsg = '';
            $scope.addlist = [];
            $scope.listingdiv = false;
            $scope.showAddModal = !$scope.showAddModal;
            $scope.addarrData=[];
        };
    
        $scope.showListDivByPersonaAndEmail = function(persona,emailno){ 
            $scope.listingdiv = false;
            $scope.addlist =[];
            if(persona > 0 && (emailno == 0 || emailno == '' || emailno == undefined || emailno == 'undefined')){
                for(var i=0; i<$scope.results.length; i++){
                    if($scope.results[i].persona==persona)
                        $scope.addlist.push(angular.copy($scope.results[i]));
                }
                $scope.listingdiv = true;
            }
            else if(persona > 0 && emailno > 0){
                for(var i=0; i<$scope.results.length; i++){
                    if($scope.results[i].persona==persona && $scope.results[i].emailno==emailno)
                        $scope.addlist.push(angular.copy($scope.results[i]));
                }
                $scope.listingdiv = true; 
            }
        };
    
        $scope.addRecords = function(){ 
            var arr ={'persona':$scope.addarrData.persona,
                      'emailno':$scope.addarrData.emailno,
                      'blogId':$scope.addarrData.blogId,
                      'postTitle':$scope.addarrData.postTitle,
                      'displaySequence':$scope.addarrData.displaySequence,
                      'status':$scope.addarrData.status
                     }; 
            console.log(arr);
            $scope.responsemsg = "Thank you, records has been successfully added.";
        };
    
        $scope.set_color = function(displaysequence){
             if (displaysequence == "1") { 
                return "redclass";
             }
        };
    
});