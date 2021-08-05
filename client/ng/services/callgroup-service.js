
app.factory('CallGroupService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (id) {
                return Api.get('/CallGroup/Get?id=' + id);
            },
            list: function () {
                return Api.get('/CallGroup/List');
            },
            add: function (model) {
                return Api.post('/CallGroup/Add', model);
            },
            update: function (model) {
                return Api.post('/CallGroup/Update', model);
            },
            delete: function (model) {
                return Api.post('/CallGroup/Delete', model);
            }
        } // end return

    }]);
