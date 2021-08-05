app.controller('GridDemoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('ng/controllers/largeLoad.json').success(function (largeLoad) {    
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    console.log(data.length);
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('ng/controllers/largeLoad.json').success(function (largeLoad) {
                    console.log(largeLoad.length);
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            console.log($scope.pagingOptions.currentPage + " " + $scope.pagingOptions.pageSize);
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);


    $scope.$watch('miinput', function () {
        if ($scope.miinput !== "") {
            $scope.pagingOptions.currentPage = 1;
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.miinput);
        } else {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{
            field: 'name',
            displayName: 'Full-Name',
            cellClass: 'grid-align'
        }, {
            field: 'allowance',
            displayName: 'Allowance'
        }],
        enablePaging: true,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 36,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        filterText: $scope.miinput,
        useExternalFilter: true
    };
}]);
