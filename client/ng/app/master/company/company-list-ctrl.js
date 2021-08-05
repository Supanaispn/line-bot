'use strict';
app.controller('TruckListCtrl',
    function ($scope, $state, $stateParams, $http, $timeout, $filter,
        $localStorage, $modal, SweetAlert, NgTableParams, Api) {
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
        $scope.page_title = "ข้อมูลบริษัท";
        $scope.page_detail = "#/app/master/company-detail/";
        $scope.gridHeight = ($(window).height() - 280);

        $scope.record_totals = 0;

        $scope.truckstatus = [{ status_name: "ใช้งาน", status_value: "1" }, { status_name: "ไม่ใช้งาน", status_value: "0" }];
        $scope.truck_type_list = [];
        $scope.form = {
            TruckId: 0
        };

        $scope.gotoPage = function (truck) {
            // if (!TruckId) TruckId = 0;
            // window.location = $scope.page_detail + TruckId
            // $state.go($scope.page_detail, {
            //     DepartmentId: DepartmentId
            // });

            var modalInstance = $modal.open({
                templateUrl: "truck-type-detail-modal.html",
                controller: "TruckTypeDetailModalCtrl",
                // backdrop: 'static',
                // windowClass: 'app-modal-route',
                size: "md",
                resolve: {
                    item: function () {
                        return truck
                    },
                    truck_type_list: function () {
                        return $scope.truck_type_list
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
                    name: 'ชื่อ',
                    field: 'FirstnameTH',
                    headerCellClass: 'text-center',
        
                },
                {
                    name: 'นามสกุล',
                    field: 'LastnameTH',
                    headerCellClass: 'text-center',
     
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

        $scope.init = function () {

            $scope.form = {
                TruckId: $stateParams.TruckId
            };
            $scope.getPage();

        }

        $scope.init();

    });