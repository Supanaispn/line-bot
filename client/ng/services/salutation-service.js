
app.factory('SalutationService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (id) {
                return Api.get('/Salutation/Get?id=' + id);
            },
            list: function () {
                return Api.get('/Salutation/List');
            },
            add: function (model) {
                return Api.post('/Salutation/Add', model);
            },
            update: function (model) {
                return Api.post('/Salutation/Update', model);
            },
            delete: function (model) {
                return Api.post('/Salutation/Delete', model);
            }
        } // end return

    }]);
