
app.factory('AuthorizeService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (companyCode) {
                return Api.get('/Authorize/Get?id=' + companyCode);
            },
            list: function () {
                return Api.get('/Authorize/List');
            },
            add: function (model) {
                return Api.post('/Authorize/Add', model);
            },
            update: function (model) {
                return Api.post('/Authorize/Update', model);
            },
            delete: function (model) {
                return Api.post('/Authorize/Delete', model);
            }
        } // end return

    }]);
