
app.factory('CompanyService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (companyCode) {
                return Api.get('/Company/Get?id=' + companyCode);
            },
            list: function () {
                return Api.get('/Company/List');
            },
            add: function (model) {
                return Api.post('/Company/Add', model);
            },
            update: function (model) {
                return Api.post('/Company/Update', model);
            },
            delete: function (model) {
                return Api.post('/Company/Delete', model);
            }
        } // end return

    }]);
