
app.factory('UserContextService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (siteCode) {
                return Api.get('/UserContext/Get?SiteCode=' + siteCode);
            },
            list: function () {
                return Api.get('/UserContext/List');
            },
        } // end return

    }]);
