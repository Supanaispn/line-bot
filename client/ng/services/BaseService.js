'use strict';

app.factory('BaseService', [function () {
    return {

        selectWhere: function (list, value, key) {
            var output = undefined;
            if (value != undefined) {

                if (key == undefined) {
                    key = 'Key';
                }

                angular.forEach(list, function (item, index) {

                    var _key = item[key].toString().toLowerCase();
                    var _value = value.toString().toLowerCase();

                    if (_key == _value) {
                        output = item;
                    }
                });
            }
            return output;
        },

        parseDate: function (date) {
            var output = '';
            if (date != null && date != undefined) {
                var dd = date.getDate();
                var mm = date.getMonth() + 1; //January is 0!
                var yyyy = date.getFullYear()
                output = mm + '/' + dd + '/' + yyyy;
            }
            return output;
        },
        parseQueryDate: function (date) {
            var output = '';
            if (date != null && date != undefined) {
                var dd = date.getDate();
                var mm = date.getMonth() + 1; //January is 0!
                var yyyy = date.getFullYear()
                output = yyyy + '-' + mm + '-' + dd;
            }
            return output;
        }

    }
}]).factory('ValidationHelper', [function () {
    return {
        required: function (model) {
            var output = true;
            if (model == null || model == undefined || model == '') {
                output = false;
            }
            return output;
        },

    }
}]).filter('jsonDate', ['$filter', function ($filter) {

    return function (input, format) {
        //debugger;
        if (input == null)
            return input;
        if (input.toString().indexOf('Date') > -1)
            return (input) ? $filter('date')(parseInt(input.toString().substr(6)), format) : '';
        else
            return input;
    };
}]).filter('rawHtml', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);;

