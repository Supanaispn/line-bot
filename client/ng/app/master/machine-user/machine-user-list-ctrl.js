'use strict';
app.controller('MachineUserListCtrl',
    function ($scope, $state, $stateParams, $http, $timeout, $filter,
        $localStorage, $modal, SweetAlert, NgTableParams, Api) {
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
        $scope.page_title = "ข้อมูลพนักงาน (CFS)";
        $scope.page_detail = "#/app/master/employee-detail/";
        $scope.gridHeight = ($(window).height() - 280);

        $scope.record_totals = 0;
        $scope.form = {
            IsNew:  { status_name: "New", status_value: "1" },
        };
        $scope.status = [{ status_name: "New", status_value: "1" }, { status_name: "Map แล้ว", status_value: "0" }];
    

        $scope.gotoPage = function (employee) { 

            var modalInstance = $modal.open({
                templateUrl: "machine-user-detail-modal.html",
                controller: "MachineUserDetailModalCtrl",
                // backdrop: 'static',
                // windowClass: 'app-modal-route',
                size: "md",
                resolve: {
                    item: function () {
                        return employee
                    }
                }
            }).result.then(function (res) {
                console.log(res);
                if (res != null) {
                    $scope.search();
                }
            });
        }

        $scope.search = function () {
            if (paginationOptions.pageNumber == 1) {
                $scope.getPage();
            } else {
                $scope.gridApi.pagination.seek(1)
            }
        }

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 20,
            sort: null
        };

        $scope.gridOptions = {
            enableFiltering: true,
            //enablePaginationControls: true,
            enableSorting: false,
            paginationPageSizes: [20, 50, 75],
            paginationPageSize: 20,
            useExternalPagination: true,
            columnDefs: [
                 {
                    name: 'No.',
                    width: '80',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+(grid.options.paginationPageSize*(grid.options.paginationCurrentPage-1))+1}}</div>'
                },                
                {
                    name: 'SiteName',
                    field: 'SiteName',
                    width: 200,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.SiteName}}</a></div>'                
        
                },        
                {
                    name: 'FloorNo',
                    field: 'FloorNo',                    
                    width: 100,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.FloorNo}}</a></div>'                
        
                },        
                {
                    name: 'MachineName',
                    field: 'MachineName',
                    headerCellClass: 'text-center',
                    width: 200,
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.MachineName}}</a></div>'                
        
                },        
                {
                    name: 'IP',
                    field: 'IP',                    
                    width: 150,
                    headerCellClass: 'text-center',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.IP}}</a></div>'                
        
                },
                {
                    name: 'User Code',
                    field: 'userId',                    
                    width: 120,
                    headerCellClass: 'text-center',  
                    cellClass: 'text-center',      
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.userId}}</a></div>'
                  
                },             
                {
                    name: 'Emp. Code',
                    field: 'EmpCode',                   
                    width: 120,
                    headerCellClass: 'text-center',      
                    cellClass: 'text-center',        
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.EmpCode}}</a></div>'
                  
                },
                { 
                    name: 'Name',
                    field: 'name',   
                    headerCellClass: 'text-center',    
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.name}}</a></div>'
                },   
                {
                    name: 'New',
                    field: 'IsNew',
                    width: 100,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" > {{row.entity.IsNew == 1 ? "New" : ""}} </div>',
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                      
                        return 'text-red';
                    }
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.pageNumber = newPage;
                    paginationOptions.pageSize = pageSize;
                    $scope.getPage();
                });
            }
        };

        $scope.getPage = function () {
            var _param = {
                filters: $scope.form,
                pagging: paginationOptions
            };
            Api.post("api/machineUser/list", {
                model: _param
            }).then(function (result) {
                var _res = result.data.result;
                $scope.gridOptions.totalItems = _res.total;
                $scope.gridOptions.data = _res.data; 
                $scope.record_totals = formatNumber(_res.total);

            });


        };


        $scope.del = function (item) {
            console.log(item);
            SweetAlert.swal({
                title: "คุณต้องการที่จะลบ?",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "ไม่ใช่",
                confirmButtonText: "ใช่",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function (isConfirm) {
                if (isConfirm) {

                    Api.post("api/machineUser/delete", { truck_id: item.truck_id }).then(function (result) {
                        SweetAlert.close();
                        $scope.search();
                    });
                }
            });


        }


        $scope.syncUser= function () {

            SweetAlert.swal({
                title: "Sync CFS User?",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "ไม่ใช่",
                confirmButtonText: "ใช่",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
                function (isConfirm) {
                    if (isConfirm) {


                        Api.post("api/machineUser/sysCfsUser").then(function (result) {
                            SweetAlert.swal({
                                title: "Sync CFS User Success.",
                                type: "success",
                                text: "I will close in 2 seconds.",
                                timer: 2000,
                                showConfirmButton: true
                            }, function () {
                                SweetAlert.close();
                            });
                        });

                    }
                }
            );
        };

        $scope.init = function () {

            $scope.getPage();

        }

        $scope.init();

    });