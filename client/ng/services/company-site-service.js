
app.factory('CompanySiteService',
    ['Api', '$q',
    function (Api, ValidationHelper, $q) {

        return {

            get: function (siteCode) {
                return Api.get('/CompanySite/Get?id=' + siteCode);
            },
            list: function (companyCode) {
                if (companyCode == null)
                     companyCode = "";
                return Api.get('/CompanySite/List?CompanyCode=' + companyCode);
            },
            add: function (model) {
                return Api.post('/CompanySite/Add', model);
            },
            update: function (model) {
                return Api.post('/CompanySite/Update', model);
            },
            delete: function (model) {
                return Api.post('/CompanySite/Delete', model);
            }
        } // end return

    }]);
