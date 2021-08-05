app.controller("EmployeeDetailModalCtrl", function ($modalInstance, $scope, SweetAlert, $stateParams, Api, item
) {

    $scope.item = angular.copy(item);
    // $scope.item.FirstnameTH = $scope.item.FirstnameTH ==null ? "" : $scope.item.FirstnameTH;
    // $scope.item.LastnameTH = $scope.item.LastnameTH ==null ? "" : $scope.item.LastnameTH;
    $scope.item.Fullname = $scope.item.FirstnameTH + '' + $scope.item.LastnameTH;
   
    $scope.mappinglist = []
    $scope.cancel = function () {
        $modalInstance.dismiss();
    }

    $scope.removeMapping = function (item) {
        SweetAlert.swal({
            title: "คุณต้องการที่จะลบข้อมูล?",
            type: "info",
            showCancelButton: true,
            cancelButtonText: "ไม่ใช่",
            confirmButtonText: "ใช่",
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {

                    Api.put("api/employee/removeMapping", item).then(function (result) {
                        if (result.data.status) {
                            SweetAlert.swal({
                                title: "Remove Success.",
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
        Api.post("api/machineUser/getMappingEmployee",  {
            model: {EmpCode : $scope.item.EmpCode}
        }).then(function (result) { 
            $scope.mappinglist = result.data.result;
        });

    };

    $scope.init();
});