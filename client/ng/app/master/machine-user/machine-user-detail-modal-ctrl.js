app.controller("MachineUserDetailModalCtrl", function ($modalInstance, $scope, SweetAlert, $stateParams, Api, item
) {

    $scope.item = angular.copy(item);
 
    $scope.cancel = function () {
        $modalInstance.dismiss();
    }

    $scope.save = function () {

        if ($scope.item.EmpCode == null || $scope.item.EmpCode == "") {
            SweetAlert.swal({
                title: 'กรุณาระบุข้อมูล \nEmployee Code!',
                type: "warning",
                showConfirmButton: true
            }, function () {

            });
            return;
        }

        SweetAlert.swal({
            title: "คุณต้องการที่จะบันทึก?",
            type: "info",
            showCancelButton: true,
            cancelButtonText: "ไม่ใช่",
            confirmButtonText: "ใช่",
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {

                    Api.put("api/machineUser/", $scope.item).then(function (result) {
                        if (result.data.status) {
                            SweetAlert.swal({
                                title: "Save Success.",
                                type: "success",
                                text: "I will close in 2 seconds.",
                                timer: 2000,
                                showConfirmButton: true
                            }, function () {
                                SweetAlert.close();
                                $modalInstance.close("Ok");
                            });
                        } else {
                            SweetAlert.swal({
                                title: result.data.result,
                                type: "warning",
                                showConfirmButton: true
                            });
                        }

                    });

                }
            });

    }


    $scope.init = function () {
    };

    $scope.init();
});