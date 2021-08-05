
app.factory('ServerHostService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (id) {
                return Api.get('/ServerHost/Get?id=' + id);
            },
            list: function () {
                return Api.get('/ServerHost/List');
            },
            add: function (model) {
                return Api.post('/ServerHost/Add', model);
            },
            update: function (model) {
                return Api.post('/ServerHost/Update', model);
            },
            delete: function (model) {
                return Api.post('/ServerHost/Delete', model);
            }
        } // end return

    }]);
