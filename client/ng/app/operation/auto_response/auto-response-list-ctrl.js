"use strict";
app.controller("AutoResponseListCtrl", function (
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
  // console.log($scope.app.auto_response)
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  $scope.page_title = "Auto Response";

  $scope.gridHeight = $(window).height() - 280;

  $scope.record_totals = 0;

  $scope.status = [
    { status_name: "ใช้งาน", status_value: "1" },
    { status_name: "ไม่ใช้งาน", status_value: "0" },
  ];

  $scope.form = {};

  $scope.gotoPage = function (user) {
    var modalInstance = $modal
      .open({
        templateUrl: "auto-response-modal.html",
        controller: "AutoResponseModalCtrl",
        // backdrop: 'static',
        // windowClass: 'app-modal-route',
        size: "lg",
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
    enableHiding:false,
    columnDefs: [
      {
        name: " ",
        width: "50",
        cellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents"> <i style="cursor: pointer;" class="far fa-trash-alt" ng-click="grid.appScope.del(row.entity)"></i></div>',
      },
      {
        name: "No.",
        width: "80",
        cellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+(grid.options.paginationPageSize*(grid.options.paginationCurrentPage-1))+1}}</div>',
      },
      {
        name: "Intent",
        width: "300",
        field: "intent_name",
        headerCellClass: "text-center",
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.intent_name}}</a></div>',
      },
      {
        name: "Message",
        field: "message",
        minWidth: "500",
        headerCellClass: "text-center",
        cellClass: "lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.message}}</a></div>',
      },
      {
        name: "สถานะ",
        field: "active",
        width: 180,
        headerCellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{row.entity.active == true ? "ใช้งาน" : "ไม่ใช้งาน"}}</div>',
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
      pagging: paginationOptions,
      mode: 0
    };
    Api.post("api/auto_response/list", {
      model: _param,
    }).then(function (result) {
      var _res = result.data.result;
      $scope.gridOptions.totalItems = _res.total;
      $scope.gridOptions.data = _res.data;
      $scope.record_totals = formatNumber(_res.total);

      if (_res.total > 0) {
        $scope.app.auto_response = _res.data.map(item => {
          return {
            intent_id: item.intent_id,
            intent_name: item.intent_name,
            message: item.message.split(','),
            response: item.response
          }
        });
      } else {
        $scope.app.auto_response = [];
      }
      // console.log($scope.app.auto_response)
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
          Api.post("api/auto_response/delete", { intent_id: item.intent_id }).then(
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
