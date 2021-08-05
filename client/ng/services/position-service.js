
app.factory('PositionService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (id) {
                return Api.get('/Position/Get?id=' + id);
            },
            list: function () {
                return Api.get('/Position/List');
            },
            add: function (model) {
                return Api.post('/Position/Add', model);
            },
            update: function (model) {
                return Api.post('/Position/Update', model);
            },
            delete: function (model) {
                return Api.post('/Position/Delete', model);
            }
        } // end return

    }]);
