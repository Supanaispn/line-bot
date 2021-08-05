app.controller("EditLineGroupModalCtrl", function (
  $modalInstance,
  $scope,
  SweetAlert,
  $stateParams,
  Api,
  item
) {
  $scope.item = angular.copy(item);
  // console.log(item)

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };


  $scope.userList = [];

  $scope.save = function () {
    // console.log($scope.item)
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
          Api.put("api/lineGroup/", $scope.item).then(function (result) {
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
    );
  };

  $scope.getUserList = function () {
    Api.post("api/user/getUserList").then(function (result) {
      $scope.userList = result.data.result;
      // console.log($scope.userList);
    });
  };

  $scope.init = function () {
    $scope.getUserList();
  };

  $scope.init();
});


