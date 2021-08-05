
app.factory('TollAllowService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (Id) {
                return Api.get('/TollAllow/Get?Id=' + Id);
            },
            list: function () {
                return Api.get('/TollAllow/List');
            },
            add: function (model) {
                return Api.post('/TollAllow/Add', model);
            },
            update: function (model) {
                return Api.post('/TollAllow/Update', model);
            },
            delete: function (model) {
                return Api.post('/TollAllow/Delete', model);
            }
        } // end return

    }]);
