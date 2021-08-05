app.controller("MachineDetailModalCtrl", function ($modalInstance, $scope, SweetAlert, $stateParams, Api, item
) {

    $scope.item = angular.copy(item);

    if ($scope.item.MachineID == null) {
        $scope.item = {
            MachineID: 0,
            MachineName: "",
            IsActived : 1,
            IsSync : 1
        };
    }else{
        $scope.item.IsActived =$scope.item.IsActived == 1 ? 1 : 0;
        $scope.item.IsSync =$scope.item.IsSync == 1 ? 1 : 0;
    }
console.log( $scope.item);
    $scope.cancel = function () {
        $modalInstance.dismiss();
    }

    $scope.save = function () {

        if ($scope.item.MachineName == null || $scope.item.MachineName == "") {
            SweetAlert.swal({
                title: 'กรุณาระบุข้อมูล \nMachine Name!',
                type: "warning",
                showConfirmButton: true
            }, function () {

            });
            return;
        }  
        if ($scope.item.IP == null || $scope.item.IP == "") {
            SweetAlert.swal({
                title: 'กรุณาระบุข้อมูล \nIP Address!',
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

                    if ($scope.item.MachineID > 0) {

                        Api.put("api/machine/", $scope.item).then(function (result) {
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
                    else {

                        Api.post("api/machine/", $scope.item).then(function (result) {
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
                }
            });

    }


    $scope.init = function () {
    };

    $scope.init();
});