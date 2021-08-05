app.controller("LineUserModalCtrl", function ($modalInstance, $scope, SweetAlert, $stateParams, Api, item
) {

    $scope.item = angular.copy(item);

    console.log($scope.item)

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.save = function () {
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
    }

    $scope.init = function () {
    };

    $scope.init();
});