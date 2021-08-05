app.controller("AutoResponseModalCtrl", function (
  $modalInstance,
  $scope,
  SweetAlert,
  $stateParams,
  Api,
  item
) {
  $scope.item = {
    ...item
    , message: item.message != undefined ? item.message.split(',').join('\n') : null
    , active: item.active != undefined ?item.active : 1
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };

  $scope.save = function () {
    if ($scope.item.intent_name == "") {
      SweetAlert.swal(
        {
          title: "กรุณาระบุ Intent!",
          type: "warning",
          showConfirmButton: true,
        },
        function () {}
      );
      return;
    }

    console.log($scope.item)

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
          if ($scope.item.intent_id > 0) {
            Api.put("api/auto_response/", $scope.item).then(function (result) {
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
            Api.post("api/auto_response/", $scope.item).then(function (result) {
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
