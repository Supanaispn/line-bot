'use strict';
app.controller('EmployeeListCtrl',
    function ($scope, $state, $stateParams, $http, $timeout, $filter,
        $localStorage, $modal, SweetAlert, NgTableParams, Api) {
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
        $scope.page_title = "ข้อมูลพนักงาน (HRIS)";
        $scope.page_detail = "#/app/master/employee-detail/";
        $scope.gridHeight = ($(window).height() - 280);

        $scope.record_totals = 0;

        $scope.status = [{ status_name: "Map แล้ว", status_value: "1" }, { status_name: "ยังไม่ Map", status_value: "0" }];
        
        $scope.gotoPage = function (employee) { 
            var modalInstance = $modal.open({
                templateUrl: "employee-detail-modal.html",
                controller: "EmployeeDetailModalCtrl",
                // backdrop: 'static',
                // windowClass: 'app-modal-route',
                size: "lg",
                resolve: {
                    item: function () {
                        return employee
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
                    name: 'EmpCode',
                    field: 'EmpCode',
                    headerCellClass: 'text-center',
                    width: 120,
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.EmpCode}}</a></div>'
                },
                {
                    name: 'ชื่อ',
                    field: 'FirstnameTH',
                    headerCellClass: 'text-center',
                    width: 200,
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.FirstnameTH}}</a></div>'
                },
                {
                    name: 'นามสกุล',
                    field: 'LastnameTH',
                    headerCellClass: 'text-center',
                    width: 200,
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.LastnameTH}}</a></div>'
                },
                {
                    name: 'Company',
                    field: 'Company',
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.Company}}</a></div>'
                },
                {
                    name: 'Mapping',
                    field: 'MapCount',
                    headerCellClass: 'text-center',
                    cellClass: 'text-center',
                    width: 120,
                },
                
                // {
                //     name: 'สถานะ',
                //     field: 'IsActived',
                //     width: 140,
                //     headerCellClass: 'text-center',
                //     cellTemplate: '<div class="ui-grid-cell-contents" > {{row.entity.IsActived == 1 ? "ใช้งาน" : "ไม่ใช้งาน"}} </div>',
                //     cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                //         if (grid.getCellValue(row, col) == false) {
                //             return 'text-red';
                //         }
                //         return 'text-blue';
                //     }
                // }
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
            Api.post("api/employee/list", {
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

        $scope.syncHRIS = function () {

            SweetAlert.swal({
                title: "Sync HRIS data?",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "ไม่ใช่",
                confirmButtonText: "ใช่",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
                function (isConfirm) {
                    if (isConfirm) {


                        Api.post("api/employee/sysApiHRIS").then(function (result) {
                            SweetAlert.swal({
                                title: "Sync HRIS Data Success.",
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

            $scope.form = {
                TruckId: $stateParams.TruckId
            };
            $scope.getPage();

        }

        $scope.init();

    });