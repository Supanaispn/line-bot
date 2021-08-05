"use strict";

/**
 * Config for the router
 */
angular
  .module("app")
  .run([
    "$rootScope",
    "$state",
    "$stateParams",
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    },
  ])
  .run(function ($rootScope, $interval, $timeout, $state, Api, SweetAlert) {
    $rootScope.$on("$stateChangeStart", function (
      event,
      toState,
      toParams,
      fromState,
      fromParams
    ) {
      // console.log("route from :" + fromState.name + " to state : " + toState.name);

      //Api.CANCEL_REQUESTS();

      //clear timeout
      angular.forEach(timeouts, function (timeout) {
        $timeout.cancel(timeout);
      });
      timeouts = [];
      //clear timeout

      //clear auto refresh
      angular.forEach(intervals, function (interval) {
        $interval.cancel(interval);
      });
      intervals.length = [];
      //clear auto refresh

      // console.log(intervals);
      toState.resolve.promise = [
        "$q",
        function ($q) {
          var defer = $q.defer();

          // Api.get('/api/userinfo/').then(function (result) {

          //     if (toState.name == "app.dashboard-v1") {
          //         defer.resolve();
          //         $state.go(result.data.permission[0].page_default);
          //         setTimeout(function () {
          //             $(".butterbar").addClass('hide').removeClass('active');
          //         }, 150);
          //     } else {
          //         defer.resolve();

          //     }

          // });

          defer.resolve();

          return defer.promise;
        },
      ];
    });

    $rootScope.$on("$stateChangeSuccess", function (
      event,
      toState,
      toParams,
      fromState
    ) {
      $(window).scrollTop(0);

      $(document).ready(function () {
        setTimeout(function () {
          var Looper = new Theme();
          $(".menu-item").each(function () {
            if ($($(this).children()[0]).attr("ui-sref") == toState.name) {
              $(this).addClass("has-active");

              var _parents = $(this).parents();
              for (let index = 0; index < _parents.length; index++) {
                const element = _parents[index];
                $(element).addClass("has-open");
              }
            } else {
              $(this).removeClass("has-active");
            }
          });
        }, 300);
      });
    });
  })
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "JQ_CONFIG",
    "MODULE_CONFIG",
    function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
      var layout = "ng/tpl/app.html";
      $urlRouterProvider.otherwise("/app/dashboard");

      $stateProvider
        .state("app", {
          abstract: true,
          url: "/app",
          templateUrl: layout,
        })
        .state("app.dashboard", {
          url: "/dashboard",
          templateUrl: "ng/app/dashboard/dashboard.html",
          resolve: load(["ng/app/dashboard/dashboard-ctrl.js"]),
        })

        .state("app.comingsoon", {
          url: "/comingsoon",
          templateUrl: "ng/app/dashboard/dashboard.html",
          resolve: load(["ng/app/dashboard/dashboard-ctrl.js"]),
        })

        .state("app.master", {
          url: "/master",
          template: "<div ui-view></div>",
        })

        .state("app.master.employee-list", {
          url: "/employee-list",
          templateUrl: "ng/app/master/employee/employee-list.html",
          resolve: load([
            "ng/app/master/employee/employee-list-ctrl.js",
            "ng/app/master/employee/employee-detail-modal-ctrl.js",
            "ui.select",
          ]),
        })
        .state("app.master.machine-list", {
          url: "/machine-list",
          templateUrl: "ng/app/master/machine/machine-list.html",
          resolve: load([
            "ng/app/master/machine/machine-list-ctrl.js",
            "ng/app/master/machine/machine-detail-modal-ctrl.js",
            "ui.select",
          ]),
        })

        .state("app.master.machine-user-list", {
          url: "/machine-user-list",
          templateUrl: "ng/app/master/machine-user/machine-user-list.html",
          resolve: load([
            "ng/app/master/machine-user/machine-user-list-ctrl.js",
            "ng/app/master/machine-user/machine-user-detail-modal-ctrl.js",
            "ui.select",
          ]),
        })
        .state("app.master.user-list", {
          url: "/user-list",
          templateUrl: "ng/app/master/users/user-list.html",
          resolve: load([
            "ng/app/master/users/user-list-ctrl.js",
            "ng/app/master/users/user-detail-modal-ctrl.js",
            "ui.select",
          ]),
        })

        .state("app.operation.botcast-list", {
          url: "/botcast-list",
          templateUrl: "ng/app/operation/botcast/botcast.html",
          resolve: load([
            "ng/app/operation/botcast/botcast-ctrl.js",
            "ng/app/operation/botcast/botcast-group-ctrl.js",
            // "ng/app/operation/users/user-detail-modal-broadcast-ctrl.js",
            "ui.select",
            'angularFileUpload',
          ]),
        })
     
        .state("app.company", {
          url: "/company",
          template: "<div ui-view></div>",
        })
        .state("app.company.user-list", {
          url: "/user-list",
          templateUrl: "ng/app/master/user_company/user-list.html",
          resolve: load([
            "ng/app/master/user_company/user-list-ctrl.js",
            "ng/app/master/user_company/user-detail-modal-ctrl.js",
            "ui.select",
          ]),
        })

        .state("app.operation", {
          url: "/operation",
          template: "<div ui-view></div>",
        })

        .state("app.operation.user-list", {
            url: "/user-list",
            templateUrl: "ng/app/operation/users/user-list.html",
            resolve: load([
              "ng/app/operation/users/user-list-ctrl.js",
              "ng/app/operation/users/user-detail-modal-ctrl.js",
              "ng/app/operation/users/user-detail-modal-broadcast-ctrl.js",
              "ui.select",
            ]),
          })

        .state("app.operation.log-list", {
          url: "/log-list",
          templateUrl: "ng/app/operation/log_message/log-list.html",
          resolve: load([
            "ng/app/operation/log_message/log-list-ctrl.js",
            "ui.select",
          ]),
        })

        .state("app.operation.line_user", {
          url: "/user_line",
          templateUrl: "ng/app/operation/line_user/user_line.html",
          resolve: load(["ng/app/operation/line_user/user_line-ctrl.js",
                        "ng/app/operation/line_user/user-line-modal-ctrl.js",
                        "ui.select",
          ]),
        })

        .state("app.operation.line-user-list", {
          url: "/line-user-list",
          templateUrl: "ng/app/operation/line_user/line-user.html",
          resolve: load([
            "ng/app/operation/line_user/line-user-ctrl.js",
            "ng/app/operation/line_user/line-user-modal-ctrl.js",
            "ui.select",
          ]),
        })

        .state("app.operation.line-group-list", {
          url: "/line-group-list",
          templateUrl: "ng/app/operation/line_group/line-group.html",
          resolve: load([
            "ng/app/operation/line_group/line-group-ctrl.js",
            "ng/app/operation/line_group/line-group-modal-ctrl.js",
            "ng/app/operation/line_group/edit-modal-ctrl.js",
            // "ng/app/operation/line_group/file-upload.ctrl.js",
            'angularFileUpload',
            "ui.select",
          ]),
        })

        .state("app.operation.auto-response-list", {
          url: "/auto-response-list",
          templateUrl: "ng/app/operation/auto_response/auto-response-list.html",
          resolve: load([
            "ng/app/operation/auto_response/auto-response-list-ctrl.js",
            "ng/app/operation/auto_response/auto-response-modal-ctrl.js",
            "ui.select",
          ]),
        })

        // app.operation.line_bot_group

        // .state('app.operation.time-list', {
        //     url: '/time-list',
        //     templateUrl: 'ng/app/operation/time-attendance/time-list.html',
        //     resolve: load(['ng/app/operation/time-attendance/time-list-ctrl.js',
        //         'ng/app/operation/time-attendance/time-detail-modal-ctrl.js',
        //         'ui.select'
        //     ])
        // })

        .state("app.docs", {
          url: "/docs",
          templateUrl: "ng/tpl/docs.html",
        })
        // others
        .state("lockme", {
          url: "/lockme",
          templateUrl: "ng/tpl/page_lockme.html",
        })
        .state("access", {
          url: "/access",
          template: '<div ui-view class="fade-in-right-big smooth"></div>',
        })
        .state("access.signin", {
          url: "/signin",
          templateUrl: "ng/tpl/page_signin.html",
          resolve: load(["ng/controllers/signin.js"]),
        })
        .state("access.signup", {
          url: "/signup",
          templateUrl: "ng/tpl/page_signup.html",
          resolve: load(["ng/controllers/signup.js"]),
        })
        .state("access.forgotpwd", {
          url: "/forgotpwd",
          templateUrl: "ng/tpl/page_forgotpwd.html",
        })
        .state("access.404", {
          url: "/404",
          templateUrl: "ng/tpl/page_404.html",
        });

      function load(srcs, callback) {
        return {
          deps: [
            "$ocLazyLoad",
            "$q",
            function ($ocLazyLoad, $q) {
              var deferred = $q.defer();
              var promise = false;
              srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
              if (!promise) {
                promise = deferred.promise;
              }
              angular.forEach(srcs, function (src) {
                promise = promise.then(function () {
                  if (JQ_CONFIG[src]) {
                    return $ocLazyLoad.load(JQ_CONFIG[src]);
                  }
                  angular.forEach(MODULE_CONFIG, function (module) {
                    if (module.name == src) {
                      name = module.name;
                    } else {
                      name = src;
                    }
                  });
                  return $ocLazyLoad.load(name);
                });
              });
              deferred.resolve();
              return callback
                ? promise.then(function () {
                    return callback();
                  })
                : promise;
            },
          ],
        };
      }
    },
  ]);
