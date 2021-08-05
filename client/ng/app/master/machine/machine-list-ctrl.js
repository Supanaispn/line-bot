'use strict';
app.controller('MachineListCtrl',
    function ($scope, $state, $stateParams, $http, $timeout, $filter,
        $localStorage, $modal, SweetAlert, NgTableParams, Api) {
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
        $scope.page_title = "ข้อมูลเครื่องสแกน";
        $scope.page_detail = "#/app/master/machine-detail/";
        $scope.gridHeight = ($(window).height() - 280);

        $scope.record_totals = 0;

        $scope.status = [{ status_name: "ใช้งาน", status_value: "1" }, { status_name: "ไม่ใช้งาน", status_value: "0" }];
      
        $scope.form = {
            MacheinId: 0
        };

        $scope.gotoPage = function (machine) { 

            var modalInstance = $modal.open({
                templateUrl: "machine-detail-modal.html",
                controller: "MachineDetailModalCtrl",
                // backdrop: 'static',
                // windowClass: 'app-modal-route',
                size: "md",
                resolve: {
                    item: function () {
                        return machine
                    },
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
                    name: 'ชื่อเครื่อง',
                    field: 'MachineName',
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.MachineName}}</a></div>'
            
                },
                {
                    name: 'Site Name',
                    field: 'SiteName',
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.SiteName}}</a></div>'
            
                },
                {
                    name: 'FloorNo',
                    field: 'FloorNo',
                    width: 140,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.FloorNo}}</a></div>'
            
                },
                {
                    name: 'IP',
                    field: 'IP',
                    width: 140,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.IP}}</a></div>'
            
                },                
                {
                    name: 'Model',
                    field: 'Model',
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.Model}}</a></div>'
            
                },
                {
                    name: 'สถานะ',
                    field: 'IsActived',
                    width: 140,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" > {{row.entity.IsActived == 1 ? "ใช้งาน" : "ไม่ใช้งาน"}} </div>',
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (grid.getCellValue(row, col) == false) {
                            return 'text-red';
                        }
                        return 'text-blue';
                    }
                },
                {
                    name: 'จำนวนข้อมูลในเครื่องสแกน',
                    field: 'CountMachineDataText',
                    headerCellClass: 'text-center'
            
                },
                {
                    name: 'วันที่ดึงข้อมูลล่าสุด',
                    field: 'LatestSyncText',
                    headerCellClass: 'text-center'
            
                },
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
            Api.post("api/machine/list", {
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

                    Api.post("api/employee/delete", { truck_id: item.truck_id }).then(function (result) {
                        SweetAlert.close();
                        $scope.search();
                    });
                }
            });


        }

        $scope.init = function () {

            $scope.form = {
                TruckId: $stateParams.TruckId
            };
            $scope.getPage();

        }

        $scope.init();

    });