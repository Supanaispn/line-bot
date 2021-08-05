"use strict";
app.controller("BotCastCtrl", function (
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
  $scope.page_title = "แจ้งข่าวสาร/ประกาศ";
  $scope.page_detail = "#/app/master/user-detail/";
  $scope.gridHeight = $(window).height() - 280;
  $scope.selectGroup = [];
  $scope.record_totals = 0;

  $scope.status = [
    { status_name: "ใช้งาน", status_value: "1" },
    { status_name: "ไม่ใช้งาน", status_value: "0" },
  ];

  $scope.form = {};
  $scope.gotoPage = function (user) {
    // console.log('user')
    // return
    var modalInstance = $modal
      .open({
        templateUrl: "botcast-group.html",
        controller: "BotCastGroupCtrl",
        // backdrop: 'static',
        // windowClass: 'app-modal-route',
        size: "md",
        resolve: {
          item: function () {
            return user
          },
        },
      })
      .result.then(function (res) {
        if (res != null) {
          console.log($scope.search())
          $scope.search();
        }
      });
  };
  $scope.gotoBotCast = function () {
    var modalInstance = $modal
      .open({
        templateUrl: "botcast-group.html",
        controller: "BotCastGroupCtrl",
        size: "md",
        resolve: {
          item: function () {
            return;
          },
        },
      })
      .result.then(function (res) {
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
  $scope.getPage = function () {
    var _param = {
      filters: $scope.form,
      pagging: paginationOptions,
    };
    Api.post("api/user/botCast", {
      model: _param,
    }).then(function (result) {
      var _res = result.data.result;
      // console.log(_res)
      $scope.gridOptions.totalItems = _res.total;
      $scope.gridOptions.data = _res.data;
      $scope.record_totals = formatNumber(_res.total);
        // console.log(_res.data);
        // return
      _res.data.map((item) => {
        return $scope.selectGroup.push({
          broadcast_group: item.broadcast_group,
          broadcast_text: item.broadcast_text,
        });
      });
    });
  };


  var paginationOptions = {
    pageNumber: 1,
    pageSize: 20,
    sort: null,
  };

  $scope.gridOptions = {
    // enableFiltering: true,
    //enablePaginationControls: true,
    enableSorting: false,
    paginationPageSizes: [20, 50, 75],
    paginationPageSize: 20,
    // useExternalPagination: true,
    columnDefs: [
      {
        name: "No.",
        width: "80",
        cellClass: "text-center",
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+(grid.options.paginationPageSize*(grid.options.paginationCurrentPage-1))+1}}</div>',
      },

      {
        name: "กลุ่ม",
        field: "group",
        headerCellClass: "text-center",
        width: "300",
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div title="edit" class="ui-grid-cell-contents" ng-click="grid.appScope.edit(row.entity)"><a href="">{{row.entity.group_name}}</a></div>',
      },
      {
        name: "เนื้อหาข่าวสาร",
        field: "text",
        headerCellClass: "text-center",
        width: "300",
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.broadcast_text}}</a></div>',
      },
      {
        name: "ประเภทไฟล์",
        field: "file",
        headerCellClass: "text-center",
        width: "150",
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.broadcast_type}}</a></div>',
      },
      {
        name: "ประกาศข่าวเมื่อ",
        field: "cast_time",
        headerCellClass: "text-center",
        width: "300",
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.broadcast_datetime | date:"dd/MM/yyyy  hh:mm:ss"}}</a></div>',

      },
      {
        name: "ส่งโดย",
        field: "cast_by",
        headerCellClass: "text-center",
        width: "300",
        cellClass: "text-center lotno_link",
        cellTemplate:
          '<div class="ui-grid-cell-contents" ng-click="grid.appScope.gotoPage(row.entity)"><a href="">{{row.entity.broadcast_by}}</a></div>',
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

  $scope.edit = function (botcast_detail) {
    var modalInstance = $modal
      .open({
        templateUrl: "botcast-group.html",
        controller: "BotCastGroupCtrl",
        // backdrop: 'static',
        // windowClass: 'app-modal-route',
        size: "md",
        resolve: {
          item: function () {
            return botcast_detail;
          },
          selectGroup: function () {
            return $scope.selectGroup;
          },
        },
      })
      .result.then(function (res) {
        // console.log(res);
        if (res != null) {
          $scope.search();
        }
      });
  };

  $scope.init = function () {
    $scope.getPage();
  };

  $scope.init();
});
