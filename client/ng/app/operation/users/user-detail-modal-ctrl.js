app.controller("UserDetailModalCtrl", function (
  $modalInstance,
  $scope,
  SweetAlert,
  $stateParams,
  Api,
  item
) {
  $scope.item = {
    ...item
    , active: 1
    , line_id: ''
  };
  console.log(item)
  $scope.cancel = function () {
    $modalInstance.dismiss();
  };

  $scope.save = function () {
    console.log($scope.item)
    if ($scope.item.username == "") {
      SweetAlert.swal(
        {
          title: "กรุณาระบุข้อมูลผู้ใช้!",
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
          if ($scope.item.user_id > 0) {
            Api.put("api/user/", $scope.item).then(function (result) {
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
            Api.post("api/user/", $scope.item).then(function (result) {
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

  $scope.getLineUserList = () => {
    Api.post('api/user/getLineUserList').then((result)=>{
      $scope.lineUserList = result.data.result;
    })
  };

  $scope.init = function () {
    $scope.getLineUserList();
  };

  $scope.init();
});
