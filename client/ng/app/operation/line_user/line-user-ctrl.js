"use strict";
app.controller("LineUserListCtrl", function (
  $scope,
  $state,
  $stateParams,
  $http,
  $timeout,
  $filter,
  $localStorage,
  $modal,
  SweetAlert,
  NgTableParams,
  Api
) {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  $scope.page_title = "ข้อมูลผู้ใช้ Line";
  $scope.page_detail = "#/app/master/user-detail/";
  $scope.gridHeight = $(window).height() - 280;

  $scope.record_totals = 0;

  $scope.status = [
    { status_name: "ใช้งาน", status_value: "1" },
    { status_name: "ไม่ใช้งาน", status_value: "0" },
  ];

  $scope.form = { active: 1 };

  $scope.gotoPage = function (user) {
    var modalInstance = $modal
      .open({
        templateUrl: "line-user-modal.html",
        controller: "LineUserModalCtrl",
        backdrop: "static",
        // windowClass: 'app-modal-route',
        size: "md",
        resolve: {
          item: function () {
            return user;
          },
        },
      })
      .result.then(function (res) {
        console.log(res);
        if (res != null) {
          $scope.search();
        }
      });
  };

  $scope.search = function () {
    if (paginationOptions.pageNumber == 1) {
      $scope.getPage();
    } else {
      $scope.gridApi.pagination.seek(1);
    }
  };

  var paginationOptions = {
    pageNumber: 1,
    pageSize: 20,
    sort: null,
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
        name: " ",
        width: 50,
        cellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents"> <i style="cursor: pointer;" class="far fa-trash-alt" ng-click="grid.appScope.del(row.entity)"></i></div>',
      },
      {
        name: "No.",
        width: 80,
        cellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+(grid.options.paginationPageSize*(grid.options.paginationCurrentPage-1))+1}}</div>',
      },
      {
        name: "User Line ID",
        field: "user_id",
        headerCellClass: "text-center",
        minWidth: 300,
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.user_id}}</a></div>',
      },
      {
        name: "User Line Name",
        field: "user_name",
        headerCellClass: "text-center",
        minWidth: 200,
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.user_name}}</a></div>',
      },
      {
        name: "User Alias",
        field: "user_alias",
        headerCellClass: "text-center",
        minWidth: 200,
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.user_alias}}</a></div>',
      },
      {
        name: "Create Date",
        field: "create_date",
        headerCellClass: "text-center",
        minWidth: 150,
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.create_date | date:"yyyy-mm-dd hh:mm:ss"}}</a></div>',
      },
      // {
      //   name: "Message Text",
      //   field: "message_text",
      //   minWidth: 400,
      //   headerCellClass: "text-center",
      //   cellTemplate:
      //     '<div class="ui-grid-cell-contents" > {{row.entity.message_text}} </div>',
      //   cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
      //     if (grid.getCellValue(row, col) == false) {
      //       return "text-red";
      //     }
      //     return "text-blue";
      //   },
      // },
      {
        name: "Active",
        field: "active",
        width: 150,
        headerCellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{row.entity.active == 1 ? "ใช้งาน" : "ไม่ใช้งาน"}}</div>',
        cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
          if (grid.getCellValue(row, col) == false) {
            return "text-red";
          }
          return "text-blue";
        },
      },
    ],
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
      gridApi.pagination.on.paginationChanged($scope, function (
        newPage,
        pageSize
      ) {
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        $scope.getPage();
      });
    },
  };

  $scope.getPage = function () {
    var _param = {
      filters: $scope.form,
      pagging: paginationOptions
    };
    Api.post("api/user/user_line", {
      model: _param,
    }).then(function (result) {
      var _res = result.data.result;
      $scope.gridOptions.totalItems = _res.total;
      $scope.gridOptions.data = _res.data;
      $scope.record_totals = formatNumber(_res.total);
    });
  };

  $scope.del = function (item) {
    console.log(item);
    SweetAlert.swal(
      {
        title: "คุณต้องการที่จะลบ?",
        type: "info",
        showCancelButton: true,
        cancelButtonText: "ไม่ใช่",
        confirmButtonText: "ใช่",
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function (isConfirm) {
        if (isConfirm) {
          Api.post("api/user/delete", { truck_id: item.truck_id }).then(
            function (result) {
              SweetAlert.close();
              $scope.search();
            }
          );
        }
      }
    );
  };

  $scope.init = function () {
    $scope.getPage();
  };

  $scope.init();
});
