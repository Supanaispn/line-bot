'use strict';
var aLengthMenu = [
    [100, 150, 250, 500, 1000],
    [100, 150, 250, 500, 1000]
];

angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ngTable',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.grid',
    'ui.grid.pagination',
    'ui.sortable',
    'ui.grid.moveColumns',
    'ui.jq',
    'ui.ace',
    'ui.sortable',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'oitozero.ngSweetAlert',
    'ae-datetimepicker',
    'daterangepicker',
    'angularMoment',
    'gridster',
    'colorpicker.module',
    'ngAudio',
    'angular.filter',
    'ngFileUpload',
    'webcam',
    'uuid4',
    'chart.js',
    'google.places'
]);

angular.module('app').filter('customDateFormate', function () {
    return function (str) {
        console.log(str.getFullYear());
        return str.replace('/', '');
    };
});

angular.module('app').filter('DateFormat', ['$filter', function ($filter) {
    return function (value) {
        if (value == null)
            return "";

        return $filter('date')(value, "dd/MM/yyyy") || "--/--/----";
    }
}]);

angular.module('app').directive("ngFileSelect", function (fileReader, $timeout) {
    return {
        scope: {
            ngModel: '='
        },
        link: function ($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                    .then(function (result) {
                        $timeout(function () {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
                console.log(file)
            });
        }
    };
});

angular.module('app').factory("fileReader", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});

angular.module('app').directive('imgUpload', ['$rootScope', function (rootScope) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var canvas = document.createElement("canvas");
            var extensions = 'jpeg ,jpg, png, gif';
            elem.on('change', function () {
                reader.readAsDataURL(elem[0].files[0]);
                var filename = elem[0].files[0].name;

                var extensionlist = filename.split('.');
                var extension = extensionlist[extensionlist.length - 1];
                if (extensions.indexOf(extension) == -1) {
                    alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");

                } else {
                    scope.file = elem[0].files[0];
                    scope.imageName = filename;
                }
            });

            var reader = new FileReader();
            reader.onload = function (e) {

                scope.image = e.target.result;
                scope.$apply();

            }
        }
    }
}]);

angular.module('app').directive('iframeOnload', [function () {
    return {
        scope: {
            callBack: '&iframeOnload'
        },
        link: function (scope, element, attrs) {
            element.on('load', function () {
                return scope.callBack();
            })
        }
    }
}])

angular.module('app').directive('enterSubmit', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('keydown', function(event) {
                var code = event.keyCode || event.which;
                if (code === 13) {
                    if (!event.shiftKey) {
                        event.preventDefault();
                        scope.$apply(attrs.enterSubmit);
                    }
                }
            });
        }
    }
});

angular.module('app').directive('nextOnEnter', function () {
    return {
        restrict: 'A',
        link: function ($scope, selem, attrs) {
            selem.bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    var pageElems = document.querySelectorAll('input, select, textarea'),
                        elem = e.srcElement || e.target,
                        focusNext = false,
                        len = pageElems.length;
                    for (var i = 0; i < len; i++) {
                        var pe = pageElems[i];
                        if (focusNext) {
                            if (pe.style.display !== 'none') {
                                angular.element(pe).focus();
                                break;
                            }
                        } else if (pe === elem) {
                            focusNext = true;
                        }
                    }
                }
            });
        }
    }
})

angular.module('app').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('app').directive('focusMe', function () {
    return {
        restrict: 'A',
        scope: {
            focusMe: '='
        },
        link: function (scope, elt) {
            scope.$watch('focusMe', function (val) {
                if (val) {
                    elt[0].focus();
                }
            });
        }
    };
})


angular.module('app').directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
})
angular.module('app').directive('regexValidate', function () {
    return {
        // restrict to an attribute type.
        restrict: 'A',

        // element must have ng-model attribute.
        require: 'ngModel',

        // scope = the parent scope
        // elem = the element the directive is on
        // attr = a dictionary of attributes on the element
        // ctrl = the controller for ngModel.
        link: function (scope, elem, attr, ctrl) {

            //get the regex flags from the regex-validate-flags="" attribute (optional)
            var flags = attr.regexValidateFlags || '';

            // create the regex obj.
            var regex = new RegExp(attr.regexValidate, flags);

            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function (value) {
                // test and set the validity after update.
                var valid = regex.test(value);
                ctrl.$setValidity('regexValidate', valid);

                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                return valid ? value : undefined;
            });

            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function (value) {
                // validate.
                ctrl.$setValidity('regexValidate', regex.test(value));

                // return the value or nothing will be written to the DOM.
                return value;
            });
        }
    };
});
angular.module('app').directive('nextOnEnter', function () {
    return {
        restrict: 'A',
        link: function ($scope, selem, attrs) {
            selem.bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    var pageElems = document.querySelectorAll('input, select, textarea'),
                        elem = e.srcElement || e.target,
                        focusNext = false,
                        len = pageElems.length;
                    for (var i = 0; i < len; i++) {
                        var pe = pageElems[i];
                        if (focusNext) {
                            if (pe.style.display !== 'none') {
                                angular.element(pe).focus();
                                break;
                            }
                        } else if (pe === elem) {
                            focusNext = true;
                        }
                    }
                }
            });
        }
    }
});

angular.module('app').directive('ngEnter', function () {
    /*
    This directive allows us to pass a function in on an enter key to do what we want.
    Use :: ng-enter="xxx"
     */
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('app').directive('myMap', function () {
    // directive link function
    var link = function (scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});


angular.module('app').directive('parseInt', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, controller) {
            controller.$formatters.push(function (modelValue) {
                console.log('model', modelValue, typeof modelValue);
                return '' + modelValue;
            });

            controller.$parsers.push(function (viewValue) {
                console.log('view', viewValue, typeof viewValue);
                return parseInt(viewValue, 10);
            });
        }
    }
}]);

angular.module('app').directive('setGridHeight', function () {
    return {
        'scope': false,
        'link': function (scope, element, attrs) {
            /*Can Manipulate the height here*/
            attrs.$set("style", "height:" + attrs["setGridHeight"] + "px");
        }
    };
});

angular.module('app').directive('myTable', function () {
    return {
        restrict: 'E, A, C',
        link: function (scope, element, attrs, controller) {
            var dataTable = element.dataTable(scope.options);

            scope.$watch('options.aaData', handleModelUpdates, true);

            $(".dataTables_length select").addClass("form-control input-sm");
            $(".dataTables_filter input").addClass("form-control input-sm");

            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
            }
        },
        scope: {
            options: "="
        }
    };
});

angular.module('app').directive('fixedTableHeaders', ['$timeout', function ($timeout) {
    console.log("fixed-table-headers");
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () {
                var container = element.parentsUntil(attrs.fixedTableHeaders);
                element.stickyTableHeaders({
                    scrollableArea: container,
                    "fixedOffset": 2
                });
            }, 0);
        }
    }
}]);

angular.module('app').directive('resetsearchmodel', [resetSearchModel])
function resetSearchModel() {
    return {
        restrict: 'A',
        require: ['^ngModel', 'uiSelect'],
        link: function (scope, element, attrs, ctrls) {
            scope.$watch(attrs.ngModel, function (newval, oldval, scope) {
                if (newval != undefined && newval.length < 1) {
                    scope.$select.selected = undefined;
                }
            });
        }
    };
}

angular.module('app').factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });

var autoGenPWD = function (pwdlength) {
    var txtrandom = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
    var range = (txtrandom.length - 0) + 1;
    var result = "";
    for (var i = 0; i < pwdlength; i++) {
        var rnd = (Math.random() * range) + 0;
        result += txtrandom.charAt(rnd);
    }
    return result;
}

var autoGenPWDAuto = function (pwdlength) {
    var txtrandom = "1234567890";
    var range = (txtrandom.length - 0) + 1;
    var result = "";
    for (var i = 0; i < pwdlength; i++) {
        var rnd = (Math.random() * range) + 0;
        result += txtrandom.charAt(rnd);
    }
    return result;
}