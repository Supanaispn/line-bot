"use strict";
app.controller("LogListCtrl", function (
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
  $scope.page_title = "Log Reply";
  $scope.page_detail = "#/app/master/user-detail/";
  $scope.gridHeight = $(window).height() - 280;

  $scope.record_totals = 0;

  $scope.status = [
    { status_name: "OUT-BOUND", status_value: "1" },
    { status_name: "IN-BOUND", status_value: "0" },
  ];

  $scope.form = {};
  $scope.gotoPage = function (user) {
    var modalInstance = $modal
      .open({
        templateUrl: "user-detail-modal.html",
        controller: "UserDetailModalCtrl",
        // backdrop: 'static',
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
        name: "Type",
        field: "type",
        headerCellClass: "text-center",
        width: 120,
        cellClass: "text-center lotno_link",
      },
      {
        name: "Msg Type",
        field: "message_type",
        headerCellClass: "text-center",
        width: 120,
        cellClass: "text-center lotno_link",
      },
      {
        name: "Profile User",
        field: "user_name",
        headerCellClass: "text-center",
        width: 150,
        cellClass: "text-center lotno_link",
      },
      {
        name: "Source Type",
        field: "source_type",
        headerCellClass: "text-center",
        width: 150,
        cellClass: "text-center lotno_link",
      },
      {
        name: "Group Name",
        field: "group_name",
        headerCellClass: "text-center",
        width: 150,
        cellClass: "text-center lotno_link",
      },
      {
        name: "DateTime",
        field: "log_datetime",
        headerCellClass: "text-center",
        width: 200,
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{row.entity.log_datetime  | date:"yyyy-mm-dd hh:mm:ss"}}</div>',
      },
      {
        name: "Message",
        field: "message_text",
        minWidth: 300,
        headerCellClass: "text-center",
        cellTemplate:
          `<div class="ui-grid-cell-contents" ng-if="row.entity.type=='message' && row.entity.message_type=='text'">{{row.entity.message_text}}</div>
          <div class="ui-grid-cell-contents" ng-if="row.entity.type=='message' && row.entity.message_type!='text'">
            <a href="{{'downloads/' + row.entity.message_id + row.entity.ext_file}}" target="_blank">
            <i class="fas fa-photo-video" title="{{row.entity.message_id + row.entity.ext_file}}"></i></a></div>`,
      },
      {
        name: "Status",
        field: "is_reply",
        width: 120,
        headerCellClass: "text-center",
        cellTemplate:
          `<div class="ui-grid-cell-contents" style="color: red" ng-if="row.entity.is_reply==1">{{"OUT-BOUND"}}</div>
          <div class="ui-grid-cell-contents" style="color: blue" ng-else >{{"IN-BOUND"}}</div>`,
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
    };
    Api.post("api/user/log_list", {
      model: _param,
    }).then(function (result) {

      // console.log(result);
      var _res = result.data.result;
      // console.log(_res);
      // return
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
