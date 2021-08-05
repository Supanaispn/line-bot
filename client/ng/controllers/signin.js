'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope','$localStorage', '$http', '$state', function ($scope,$localStorage,$http, $state) {
    $scope.user = {};
    $scope.authError = null;

    $http.post('Authorize/LogOut');

    $scope.login = function () {

        $("#btnLogin").button('loading');

        $scope.authError = null;
        // Try to login
        $localStorage.current_user = $scope.user.username;
        $state.go('app.oms.list');


        // $http.post('Authorize/Login', { username: $scope.user.username, password: $scope.user.password })
        // .then(function (response) {
        //     if (response.data.Result == true) {
        //         //$state.go('dashboard.home');
                
        //         $localStorage.current_user = $scope.user.username;
        //         $state.go('app.oms.list');
        //     } else {
        //         $("#btnLogin").button('reset');
        //         $scope.authError = 'Username or Password not right';
        //     }
        // }, function (x) {
        //     $("#btnLogin").button('reset');
        //     $scope.authError = 'Server Error';
        // });
    };
}]);