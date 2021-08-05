'use strict';
app.controller('UserListCtrl',
    function ($scope, $state, $stateParams, $http, $timeout, $filter,
        $localStorage, $modal, SweetAlert, NgTableParams, Api) {
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
        $scope.page_title = "ข้อมูลผู้ใช้งาน";
        $scope.page_detail = "#/app/master/user-detail/";
        $scope.gridHeight = ($(window).height() - 280);

        $scope.record_totals = 0;

        $scope.status = [{ status_name: "ใช้งาน", status_value: "1" }, { status_name: "ไม่ใช้งาน", status_value: "0" }];
  
        $scope.form = { 
        };
        $scope.gotoPage = function (user) { 

            var modalInstance = $modal.open({
                templateUrl: "user-detail-modal.html",
                controller: "UserDetailModalCtrl",
                // backdrop: 'static',
                // windowClass: 'app-modal-route',
                size: "md",
                resolve: {
                    item: function () {
                        return user
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
                    name: '#',
                    width: '50',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents"> <i style="cursor: pointer;" class="far fa-trash-alt" ng-click="grid.appScope.del(row.entity)"></i></div>'
                }, {
                    name: 'No.',
                    width: '80',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+(grid.options.paginationPageSize*(grid.options.paginationCurrentPage-1))+1}}</div>'
                },
                {
                    name: 'ชื่อ-นามสกุล',
                    field: 'fullname',
                    headerCellClass: 'text-center',
                    width: '300',
                    cellClass: 'text-center lotno_link',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.fullname}}</a></div>'
                },
                {
                    name: 'อีเมล',
                    field: 'email',
                    headerCellClass: 'text-center'
                }, 
                {
                    name: 'สถานะ',
                    field: 'is_active',
                    width: 140,
                    headerCellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" > {{row.entity.active == 1 ? "ใช้งาน" : "ไม่ใช้งาน"}} </div>',
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
            Api.post("api/user/list", {
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

                    Api.post("api/user/delete", { truck_id: item.truck_id }).then(function (result) {
                        SweetAlert.close();
                        $scope.search();
                    });
                }
            });
        }

        $scope.init = function () {

            $scope.getPage();

        }

        $scope.init();

    });