
app.factory('DepartmentService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (id) {
                return Api.get('/Department/Get?id=' + id);
            },
            list: function () {
                return Api.get('/Department/List');
            },
            add: function (model) {
                return Api.post('/Department/Add', model);
            },
            update: function (model) {
                return Api.post('/Department/Update', model);
            },
            delete: function (model) {
                return Api.post('/Department/Delete', model);
            }
        } // end return

    }]);
