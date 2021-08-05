app.controller("UserDetailModalBroadcastCtrl", function (
  $modalInstance,
  $scope,
  SweetAlert,
  $stateParams,
  Api,
  item
) {


  $scope.item = item;

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };


  $scope.broadcast = function () {

    // Api.post("api/user/bodc/", $scope.item).then(function (result) {
    // //   if (reasult.data.status) {
    // //     SweetAlert.swal(
    // //       {
    // //         title: "Save Success.",
    // //         type: "success",
    // //         text: "I will close in 2 seconds.",
    // //         timer: 2000,
    // //         showConfirmButton: true,
    // //       },
    // //       function () {
    // //         SweetAlert.close();
    // //         $modalInstance.close("Ok");
    // //       }
    // //     );
    // //   } else {
    // //     SweetAlert.swal({
    // //       title: result.data.result,
    // //       type: "warning",
    // //       showConfirmButton: true,
    // //     });
    // //   }
    // });

    Api.post("api/user/log_broadcast/", $scope.item).then(function (result) {
      if (reasult.data.status) {
        SweetAlert.swal(
          {
            title: "Save Success.",
            type: "success",
            text: "I will close in 2 seconds.",
            timer: 2000,
            showConfirmButton: true,
          },
          function () {
            SweetAlert.close();
            $modalInstance.close("Ok");
          }
        );
      } else {
        SweetAlert.swal({
          title: result.data.result,
          type: "warning",
          showConfirmButton: true,
        });
      }
    });
  };


  $scope.summit = function () {

    Api.post("api/user/update_user/", $scope.item).then(function (result) {
      if (result.data.status) {
        SweetAlert.swal(
          {
            title: "Save Success.",
            type: "success",
            text: "I will close in 2 seconds.",
            timer: 2000,
            showConfirmButton: true,
          },
          function () {
            SweetAlert.close();
            $modalInstance.close("Ok");
          }
        );
      } else {
        SweetAlert.swal({
          title: result.data.result,
          type: "warning",
          showConfirmButton: true,
        });
      }
    });
  };

  $scope.save = function () {
    if ($scope.item.truck_no == "") {
      SweetAlert.swal(
        {
          title: "กรุณาระบุข้อมูลทะเบียนรถ!",
          type: "warning",
          showConfirmButton: true,
        },
        function () {}
      );
      return;
    }

    SweetAlert.swal(
      {
        title: "คุณต้องการที่จะบันทึก?",
        type: "info",
        showCancelButton: true,
        cancelButtonText: "ไม่ใช่",
        confirmButtonText: "ใช่",
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function (isConfirm) {
        if (isConfirm) {
          if ($scope.item.truck_id > 0) {
            Api.put("api/truck/", $scope.item).then(function (result) {
              if (result.data.status) {
                SweetAlert.swal(
                  {
                    title: "Save Success.",
                    type: "success",
                    text: "I will close in 2 seconds.",
                    timer: 2000,
                    showConfirmButton: true,
                  },
                  function () {
                    SweetAlert.close();
                    $modalInstance.close("Ok");
                  }
                );
              } else {
                SweetAlert.swal({
                  title: result.data.result,
                  type: "warning",
                  showConfirmButton: true,
                });
              }
            });
          } else {
            Api.post("api/truck/", $scope.item).then(function (result) {
              if (result.data.status) {
                SweetAlert.swal(
                  {
                    title: "Save Success.",
                    type: "success",
                    text: "I will close in 2 seconds.",
                    timer: 2000,
                    showConfirmButton: true,
                  },
                  function () {
                    SweetAlert.close();
                    $modalInstance.close("Ok");
                  }
                );
              } else {
                SweetAlert.swal({
                  title: result.data.result,
                  type: "warning",
                  showConfirmButton: true,
                });
              }
            });
          }
        }
      }
    );
  };

  $scope.init = function () {};

  $scope.init();
});
