'use strict';
var base_url = "";
var loadingProcess = function () {
    return {
        start: function () {
            // $('body').append($('<div />')
            //     .addClass('backdrop-loading').html(
            //         $('<img />').attr('src', base_url + '/img/ajax-loader.gif')
            //     ));

        },
        stop: function () {
            // $('.backdrop-loading').remove();
        }
    }
}
var loading = loadingProcess();

angular.module('app')
    .factory('Api', ['$http', '$state', '$q', '$rootScope', '$timeout', 'Upload', 'uuid4', function ($http, $state, $q, $rootScope, $timeout, Upload, uuid4) {

        var canceler = $q.defer();

        return {

            CANCEL_REQUESTS: function () {
                canceler.resolve();
                this.ENABLE_REQUESTS();
            },
            ENABLE_REQUESTS: function () {
                canceler = $q.defer();
            },

            permits: function (controller, callback) {

                this.get('/api/getPermits/').then(function (result) {
                    // loadingProcess().start();
                    var checkAccessPermission = false;
                    result.data.Permits.forEach(function (i) {
                        if (i.controller == controller) {
                            checkAccessPermission = true;
                            if (i.permit_field_hide) {
                                var permit_field_hide = i.permit_field_hide.split(',');

                                $timeout(function () {
                                    permit_field_hide.forEach(function (fh) {
                                        $(fh).hide();
                                    });
                                }, 100);
                                // permit_field_hide.forEach(function (fh) {
                                //     $(fh).hide();
                                // });
                            }

                            if (i.permit_readonly) {
                                var permit_readonly = i.permit_readonly.split(',');
                                $timeout(function () {
                                    permit_readonly.forEach(function (r) {
                                        $(r).attr('disabled', true);
                                    });
                                }, 100);
                                // permit_readonly.forEach(function (r) {
                                //     $(r).attr('disabled', true);
                                // });
                            }

                            if (i.permit_col_hide) {
                                var permit_col_hide = i.permit_col_hide.split(',');
                                $timeout(function () {
                                    permit_col_hide.forEach(function (ch) {
                                        $(ch).hide();
                                    });
                                }, 100);
                                // permit_col_hide.forEach(function (ch) {
                                //     $(ch).hide();
                                // });

                            }
                            $timeout(function () {
                                loadingProcess().stop();
                            }, 200);
                        }
                    });

                    callback(checkAccessPermission);

                    // loadingProcess().stop();
                });
            },

            get: function (url, use_loading) {
                loadingProcess().start();
                return $http.get(base_url + url, {
                    timeout: canceler.promise,
                    headers: {
                        // 'ayms_selected_brand': localStorage.getItem("ayms_selected_brand")
                    }
                }).success(function (data) {
                    loadingProcess().stop();
                    return data;
                }).error(function (error, status, headers, config) {
                    if (error != null) {
                        if (error.IsSuccess != null) {
                            swal({
                                title: 'Warning',
                                text: error.description,
                                type: "warning"
                            }, function () {
                                window.location.href ="login"
                            });
                        } else if (error != null) {
                            if (status == "401") {
                                swal({
                                    title: 'Unauthorized',
                                    text: 'Sorry, you do not have the required permission \r\n to perform this action.',
                                    type: "warning"
                                }, function () {
                                    window.location.href ="login"
                                });
                            } else {
                                swal({
                                    title: 'Warning',
                                    text: 'Server Side Error. ' + status,
                                    type: "warning"
                                });
                            }

                        }
                    }


                    loadingProcess().stop();
                });
            },
            post: function (url, model, config) {

                loadingProcess().start();
                return $http.post(base_url + url, model, {
                    timeout: canceler.promise,
                    headers: {
                        'ayms_selected_brand': localStorage.getItem("ayms_selected_brand")
                    }
                })
                    .success(function (data) {
                        loadingProcess().stop();
                        var msg = 'Data has been saved.';
                        var isShow = false;

                        if (config != undefined) {
                            if (config.message != undefined)
                                msg = config.message;
                            if (config.isshow != undefined)
                                isShow = config.isshow;
                        }
                        //for the one who need to override msg
                        if (data.message != undefined)
                            msg = data.message;
                        if (isShow)
                            swal(msg);

                        return data;

                    }).error(function (error, status, headers, config) {
                        if (error != null) {
                            if (error.IsSuccess != null) {
                                swal({
                                    title: 'Warning',
                                    text: error.description,
                                    type: "warning"
                                }, function () {
                                    window.location.href ="login"
                                });
                            } else if (error != null) {
                                var error_text = $(error)[1].text;
                                swal({
                                    title: 'Warning',
                                    text: error_text,
                                    type: "warning"
                                });
                            }
                        }

                        loadingProcess().stop();
                    });
            },
            put: function (url, model, config) {
                loadingProcess().start();
                return $http.put(base_url + url, model, {
                    timeout: canceler.promise,
                    headers: {
                        // 'ayms_selected_brand': localStorage.getItem("ayms_selected_brand")
                    }
                })
                    .success(function (data) {
                        loadingProcess().stop();
                        var msg = 'Data has been saved.';
                        var isShow = false;

                        if (config != undefined) {
                            if (config.message != undefined)
                                msg = config.message;
                            if (config.isshow != undefined)
                                isShow = config.isshow;
                        }
                        //for the one who need to override msg
                        if (data.message != undefined)
                            msg = data.message;
                        if (isShow)
                            swal(msg);

                        return data;

                    }).error(function (error, status, headers, config) {
                        if (error != null) {
                            if (error.IsSuccess != null) {
                                swal({
                                    title: 'Warning',
                                    text: error.description,
                                    type: "warning"
                                }, function () {
                                    window.location.href ="login"
                                });
                            } else if (error != null) {
                                var error_text = $(error)[1].text;
                                swal({
                                    title: 'Warning',
                                    text: error_text,
                                    type: "warning"
                                });
                            }
                        }

                        loadingProcess().stop();
                    });
            },
            delete: function (url, model, config) {
                console.log("delete");

                loadingProcess().start();
                return $http.delete(base_url + url, model, {
                    timeout: canceler.promise,
                    headers: {
                        // 'ayms_selected_brand': localStorage.getItem("ayms_selected_brand")
                    }
                })
                    .success(function (data) {
                        loadingProcess().stop();
                        var msg = 'Data has been saved.';
                        var isShow = false;

                        if (config != undefined) {
                            if (config.message != undefined)
                                msg = config.message;
                            if (config.isshow != undefined)
                                isShow = config.isshow;
                        }
                        //for the one who need to override msg
                        if (data.message != undefined)
                            msg = data.message;
                        if (isShow)
                            swal(msg);

                        return data;

                    }).error(function (error, status, headers, config) {
                        if (error != null) {
                            if (error.IsSuccess != null) {
                                swal({
                                    title: 'Warning',
                                    text: error.description,
                                    type: "warning"
                                }, function () {
                                    window.location.href ="login"
                                });
                            } else if (error != null) {
                                var error_text = $(error)[1].text;
                                swal({
                                    title: 'Warning',
                                    text: error_text,
                                    type: "warning"
                                });
                            }
                        }

                        loadingProcess().stop();
                    });
            },
            upload: function (path, data) {
                var deferred = $q.defer();
                data.fieldname = uuid4.generate();
                Upload.upload({
                    url: base_url + path,
                    headers: {
                        'Message': data.fieldname
                    },
                    data: {
                        upload: data
                    }
                }).then((result) => {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }
        }
    }]);