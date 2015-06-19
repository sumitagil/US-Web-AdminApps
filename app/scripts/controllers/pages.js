'use strict';

/*var app = angular.module('sandvikusaAdminAppsApp');

app.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('pageCtrl', function ($scope, $http, $route) {
        $scope.opendiv = 'reports';
        $scope.results = [];
        $scope.allPageIds = [];
        $scope.loading = true;
        $scope.oneAtATime = true;
        $scope.curPage = 0;
        $scope.pageSize = 5;
        $scope.MaxPage = 0;
        $scope.Run = 1;    
	
		 //Get All Project
         $http.jsonp("http://beta.iservices.earlymoments.com/getprojectlist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
         .success(function(data) {
            $scope.allProjects = data.response;
         }); //end
	
		//Get All Credit Rule
         $http.jsonp("http://beta.iservices.earlymoments.com/getcreditruleslist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
         .success(function(data) {
            $scope.allCreditrules = data.response;
         }); //end
    

        //Get All data start
        $http.jsonp("http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK")
        .success(function(data) {
            $scope.results = data.response ;                     
            $scope.numberOfPages=function(){
                return Math.ceil($scope.results.length / $scope.pageSize);
            }
            $scope.MaxPage=$scope.numberOfPages();
            $scope.loading = false;                 
        }).error(function(){
            alert("Error");
        }); 
       //Get All data end  
});
*/

var app = angular.module("sandvikusaAdminAppsApp");

app.controller( "pageCtrl", function($scope,$http){
    
     $scope.opendiv = 'reports';
        
    //////////////////////////
     $scope.mainGridOptions = {
            dataSource: new kendo.data.DataSource({
                  type: "odata",
                  transport: {
                      read:{
                            url:"http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72",
                            dataType: "json"
                      },
                      parameterMap: function (options, type) {
                            var paramMap = kendo.data.transports.odata.parameterMap(options);
                            delete paramMap.$inlinecount; // <-- remove inlinecount parameter.
                            delete paramMap.$format; // <-- remove format parameter.
                            return paramMap;
                      }
                  },
                  schema: {
                    data: 'response',
                    total: function(data){
                        return data.response.length;
                    },
                    model: {
                        fields: {
                                CampaignId: { type: "number" },
                                PageId: { type: "number" },
                                PageName: { type: "string" },
                                PageDesc: { type: "string" },
                                Project: { type: "string" }
                        }
                    }
                  },
                  pageSize: 20,
                  //serverPaging: true,//this is problem for pagination
                  serverFiltering: true,
            }),
            height: 488,
            filterable: {
              mode: "row"
            },
            pageable: true,
            columns: 
            [{
              field: "CampaignId",
              width: 220,
              title: "Campaign Id",
              filterable: {
                cell: {
                  showOperators: false, 
                }
              }
            },
             {
               field: "PageId",
               width: 500,
               title: "Page Id",
               filterable: {
                 cell: {
                   operator: "gte"              
                 }
               }
             },
             {
               field: "PageName",
               title: "Page Name",
               filterable: {
                 cell: {
                   operator: "contains"
                 }
               }
             },
             {
               field: "PageDesc",
               title: "Page Desc",
                filterable: {
                 cell: {
                   operator: "contains"
                 }
               }
             },
             {
               field: "Project",
               title: "Project",
               filterable: {
                 cell: {
                   operator: "contains"              
                 }
               }
             }
            ]
          };
    /////////////////////////
    
});



/*app.controller("pageCtrl", function($scope,$http){
            $scope.opendiv = 'reports';
            
            $scope.mainGridOptions = {
                 dataSource: new kendo.data.DataSource({
                     type: "odata",
                     transport: {
                       read: function(options) {
                            var url = "http://beta.iservices.earlymoments.com/getpagelist?token=741889E3-4565-40A1-982A-F15F7A923D72&format=json&callback=JSON_CALLBACK";
                            $http.jsonp(url).success(function (data, status, headers, config) {
                                options.success(data);
                            }).error(function (data, status, headers, config) {
                                options.error(data);
                            });
                        }
                          
                    },
                     schema: {
                        data: function (data) {
                                return data.response;
                             },
                        //serverGrouping: true,
                        total: function (data) {
                            return data.response.length;
                        },
                        model: {
                            fields: {
                                CampaignId: { type: "number" },
                                PageId: { type: "number" },
                                PageName: { type: "string" },
                                PageDesc: { type: "string" },
                                Project: { type: "string" }
                            }
                        }
                    },
                    pageSize: 20,
                    serverFiltering: true,
                }),
                height: 488,
                filterable: {mode: "row"},
                pageable: true,
                //sortable: true,
                /*pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },*/
                
                /*columns: [
                        {field: "CampaignId", title: "Campaign Id", width: "60px"},
                        {field: "PageId", title: "Page Id", width: "60px"},
                        {field: "PageName", title: "Page Name", width: "120px"},
                        {field: "PageDesc", title: "Page Desc", width: "120px", filterable: {cell: {operator: "contains"}}},
                        {field: "Project", title: "Project", width: "60px", filterable: {cell: {operator: "contains"}}}
                ]
                
            };
 });*/