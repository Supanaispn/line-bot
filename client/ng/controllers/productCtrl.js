app.controller('GridDemoCtrl', ['$scope', '$http', 'ProductService', function ($scope, $http, ProductService) {
    //$scope.filterOptions = {
    //    filterText: "",
    //    useExternalFilter: true
    //}; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10,250, 500, 1000],
        pageSize: 10,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize ,totalPage){  
        
        $scope.myData = data;
        $scope.totalServerItems = totalPage;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        ProductService.getProduct(page, pageSize, searchText).success(function (result) {
            $scope.setPagingData(result.data, page, pageSize,result.total);
        });
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.searchText);
    }, true);
    //$scope.$watch('filterOptions', function (newVal, oldVal) {
    //    if (newVal !== oldVal) {
    //      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //    }
    //}, true);


    $scope.EnterSearch = function (value) {
        if ($scope.gridOptions.filterText  != value) {
            $scope.pagingOptions.currentPage = 1;
            $scope.gridOptions.filterText = value;
            $scope.getPagedDataAsync(
                $scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage,
                $scope.gridOptions.filterText);
        }
    };

    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{
            field: 'Product_System_Code',
            displayName: 'Product System Code',
            cellClass: 'grid-align'
        }, {
            field: 'Product_Name_Full',
            displayName: 'Product Name'
        }, {
            field: 'Create_Date',
            displayName: 'Create_Date',
            cellFilter: 'customDateFormate'
        }],
        enablePaging: true,
        multiSelect: false,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 36,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        //filterOptions: $scope.filterOptions,
        filterText: $scope.searchText,
        useExternalFilter: true
    };
}]);
