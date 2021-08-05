"use strict";
/*------------------ Variable ---------------------*/
var intervals = [];
var timeouts = [];
var isBlockResize = false;
var global_permits = [];
/*------------------ Variable ---------------------*/
/* Controllers */

angular.module("app").controller("AppCtrl", [
  "$scope",
  "$translate",
  "$localStorage",
  "$window",
  "Api",
  "$timeout",
  "$state",
  "SweetAlert",
  "$modal",
  function (
    $scope,
    $translate,
    $localStorage,
    $window,
    Api,
    $timeout,
    $state,
    SweetAlert,
    $modal
  ) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    if (isIE) {
      angular.element($window.document.body).addClass("ie");
    }

    // config
    $scope.app = {
      name: "AMS", //fa fa-truck
      version: "1.2.0",
      // for chart colors
      color: {
        primary: "#7266ba",
        info: "#23b7e5",
        success: "#27c24c",
        warning: "#fad733",
        danger: "#f05050",
        light: "#e8eff0",
        dark: "#3a3f51",
        black: "#1c2b36",
      },
      settings: {
        themeID: 6,
        navbarHeaderColor: "bg-info dker", //'bg-black',
        navbarCollapseColor: "bg-info dker",
        asideColor: "bg-light dker",
        headerFixed: true,
        asideFixed: false,
        asideFolded: false,
        asideDock: false,
        container: false,
        navDemo: true,
      },
    };

    if (isSmartDevice($window)) {
      angular.element($window.document.body).addClass("smart");
      $scope.app.hideFooter = true;
      // console.log("hide footer");
    } else {
      $scope.app.hideFooter = false;

      // console.log("show footer");
    }

    // save settings to local storage
    if (angular.isDefined($localStorage.settings)) {
      $scope.app.settings = $localStorage.settings;
    } else {
      $localStorage.settings = $scope.app.settings;
    }
    $scope.$watch(
      "app.settings",
      function () {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // for box layout, add background image
        $scope.app.settings.container
          ? angular.element("html").addClass("bg")
          : angular.element("html").removeClass("bg");
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      },
      true
    );

    // angular translate
    $scope.lang = {
      isopen: false,
    };
    $scope.langs = {
      en: "English",
      de_DE: "German",
      it_IT: "Italian",
    };
    $scope.selectLang =
      $scope.langs[$translate.proposedLanguage()] || "English";
    $scope.setLang = function (langKey, $event) {
      // set the current lang
      $scope.selectLang = $scope.langs[langKey];
      // You can change the language during runtime
      $translate.use(langKey);
      $scope.lang.isopen = !$scope.lang.isopen;
    };

    function isSmartDevice($window) {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua =
        $window["navigator"]["userAgent"] ||
        $window["navigator"]["vendor"] ||
        $window["opera"];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(
        ua
      );
    }

    function permissionProcess(permission) {
      //console.log(permission);
      $scope.isGITrailer =
        permission.filter(function (x) {
          return x.page_name == "Pre-Gate In : Trailer";
        }).length > 0;
      $scope.isGIContainer =
        permission.filter(function (x) {
          return x.page_name == "Pre-Gate In : Container";
        }).length > 0;
      $scope.isGISelfDrive =
        permission.filter(function (x) {
          return x.page_name == "Gate In : Self Drive";
        }).length > 0;

      $scope.isGroupGateIn =
        $scope.isGITrailer || $scope.isGIContainer || $scope.isGISelfDrive;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isConfirmLocation =
        permission.filter(function (x) {
          return x.page_name == "Confirm Location";
        }).length > 0;
      $scope.isRelocation =
        permission.filter(function (x) {
          return x.page_name == "Re-Location";
        }).length > 0;
      $scope.isShippingMark =
        permission.filter(function (x) {
          return x.page_name == "Shipping-Mark";
        }).length > 0;
      $scope.isMatchingDocument =
        permission.filter(function (x) {
          return x.page_name == "Matching Document";
        }).length > 0;
      $scope.isInspection =
        permission.filter(function (x) {
          return x.page_name == "Inspection";
        }).length > 0;
      $scope.isActivityList =
        permission.filter(function (x) {
          return x.page_name == "Activity List";
        }).length > 0;
      $scope.isInstallAccessories =
        permission.filter(function (x) {
          return x.page_name == "Install Accessories";
        }).length > 0;

      $scope.isGroupOperation =
        $scope.isConfirmLocation ||
        $scope.isRelocation ||
        $scope.isShippingMark ||
        $scope.isInspection ||
        $scope.isActivityList;

      $scope.isAccessoriesPayment =
        permission.filter(function (x) {
          return x.page_name == "Accessories Payment";
        }).length > 0;
      $scope.isConfirmPayment =
        permission.filter(function (x) {
          return x.page_name == "Confirm Payment";
        }).length > 0;
      $scope.isExportPND53 =
        permission.filter(function (x) {
          return x.page_name == "Export PND53";
        }).length > 0;
      $scope.isReconcilePayment =
        permission.filter(function (x) {
          return x.page_name == "Reconcile Payment";
        }).length > 0;

      $scope.isGroupAccessoriesOperation =
        $scope.isAccessoriesPayment || $scope.isConfirmPayment;

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isGOTrailer =
        permission.filter(function (x) {
          return x.page_name == "Gate Out : Trailer";
        }).length > 0;
      $scope.isGOContainer =
        permission.filter(function (x) {
          return x.page_name == "Gate Out : Container";
        }).length > 0;
      $scope.isGOSelfDrive =
        permission.filter(function (x) {
          return x.page_name == "Gate Out : Self Drive";
        }).length > 0;

      $scope.isGroupGateOut =
        $scope.isGOTrailer || $scope.isGOContainer || $scope.isGOSelfDrive;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isImportActivity =
        permission.filter(function (x) {
          return x.page_name == "Import Activity";
        }).length > 0;
      $scope.isDeliveryOrder =
        permission.filter(function (x) {
          return x.page_name == "Delivery Order";
        }).length > 0;
      $scope.isCreateOrder =
        permission.filter(function (x) {
          return x.page_name == "Create Order";
        }).length > 0;
      $scope.isConfirmOrder =
        permission.filter(function (x) {
          return x.page_name == "Confirm Order";
        }).length > 0;
      $scope.isPrintShippingMark =
        permission.filter(function (x) {
          return x.page_name == "Print Shipping Mark";
        }).length > 0;

      $scope.isCreateTrip =
        permission.filter(function (x) {
          return x.page_name == "Create Trip";
        }).length > 0;
      $scope.isConfirmTrip =
        permission.filter(function (x) {
          return x.page_name == "Confirm Trip";
        }).length > 0;
      $scope.isCustomerOrder =
        permission.filter(function (x) {
          return x.page_name == "Customer Order";
        }).length > 0;

      $scope.isGroupCSOperation =
        $scope.isImportActivity ||
        $scope.isDeliveryOrder ||
        $scope.isCreateOrder ||
        $scope.isConfirmOrder ||
        $scope.isPrintShippingMark;
      $scope.isGroupTripOperation =
        $scope.isCreateTrip || $scope.isConfirmTrip || $scope.isCustomerOrder;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isBrand =
        permission.filter(function (x) {
          return x.page_name == "Brand";
        }).length > 0;
      $scope.isVehicle =
        permission.filter(function (x) {
          return x.page_name == "Vehicle";
        }).length > 0;
      $scope.isVehicleModel =
        permission.filter(function (x) {
          return x.page_name == "Vehicle Model";
        }).length > 0;
      $scope.isVehicleAlertMessage =
        permission.filter(function (x) {
          return x.page_name == "Vehicle Alert Message";
        }).length > 0;
      $scope.isDriver =
        permission.filter(function (x) {
          return x.page_name == "Driver";
        }).length > 0;
      $scope.isTrailerCompany =
        permission.filter(function (x) {
          return x.page_name == "Trailer Company";
        }).length > 0;
      $scope.isTrailer =
        permission.filter(function (x) {
          return x.page_name == "Trailer";
        }).length > 0;
      $scope.isNgGroup =
        permission.filter(function (x) {
          return x.page_name == "NG Group";
        }).length > 0;
      $scope.isNgCode =
        permission.filter(function (x) {
          return x.page_name == "NG Code";
        }).length > 0;
      $scope.isDealer =
        permission.filter(function (x) {
          return x.page_name == "Dealer";
        }).length > 0;
      $scope.isCluster =
        permission.filter(function (x) {
          return x.page_name == "Cluster";
        }).length > 0;

      $scope.isGroupMaster =
        $scope.isBrand ||
        $scope.isVehicle ||
        $scope.isVehicleAlertMessage ||
        $scope.isDriver ||
        $scope.isTrailerCompany ||
        $scope.isTrailer ||
        $scope.isNgGroup ||
        $scope.isNgCode;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isPage =
        permission.filter(function (x) {
          return x.page_name == "Page";
        }).length > 0;
      $scope.isRole =
        permission.filter(function (x) {
          return x.page_name == "Role";
        }).length > 0;
      $scope.isUser =
        permission.filter(function (x) {
          return x.page_name == "User";
        }).length > 0;

      $scope.isGroupUserManagement =
        $scope.isPage || $scope.isRole || $scope.isUser;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isZone =
        permission.filter(function (x) {
          return x.page_name == "Zone";
        }).length > 0;
      $scope.isLane =
        permission.filter(function (x) {
          return x.page_name == "Lane";
        }).length > 0;
      $scope.isLocation =
        permission.filter(function (x) {
          return x.page_name == "Location";
        }).length > 0;

      $scope.isGroupManageLocation =
        $scope.isZone || $scope.isLane || $scope.isLocation;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.isImportCenter =
        permission.filter(function (x) {
          return x.page_name == "Import Center";
        }).length > 0;
      $scope.isDashboard =
        permission.filter(function (x) {
          return x.page_name == "Dashboard";
        }).length > 0;
      $scope.isVirtualYard =
        permission.filter(function (x) {
          return x.page_name == "Virtual Yard";
        }).length > 0;
      $scope.isSysConfig =
        permission.filter(function (x) {
          return x.page_name == "System Config";
        }).length > 0;
      $scope.isCreateView =
        permission.filter(function (x) {
          return x.page_name == "Create View";
        }).length > 0;

      $scope.isGroupAdminTools = $scope.isImportCenter;
      $scope.isConfirmGoods =
        permission.filter(function (x) {
          return x.page_name == "Confirmation Goods";
        }).length > 0;
      $scope.isCancelPayment =
        permission.filter(function (x) {
          return x.page_name == "Cancel Payment";
        }).length > 0;
      $scope.isCheckStatus =
        permission.filter(function (x) {
          return x.page_name == "Check Status";
        }).length > 0;
      $scope.isDashboardActivity =
        permission.filter(function (x) {
          return x.page_name == "Dashboard Activity";
        }).length > 0;

      $scope.isReportCenter =
        permission.filter(function (x) {
          return x.page_name == "Report Center";
        }).length > 0;
      $scope.isReportWHT =
        permission.filter(function (x) {
          return x.page_name == "Report WHT";
        }).length > 0;
      $scope.isReportOutputTax =
        permission.filter(function (x) {
          return x.page_name == "Report Output Tax";
        }).length > 0;
      $scope.isGroupReports =
        $scope.isReportCenter || $scope.isReportWHT || $scope.isReportOutputTax;

      $scope.isAATFTMCreateTrip =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM Create Trip";
        }).length > 0;
      $scope.isAATFTMTrip =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM Trip";
        }).length > 0;
      $scope.isAATFTMConfirmFleet =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM Confirm Fleet";
        }).length > 0;
      $scope.isAATFTMSI =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM SI";
        }).length > 0;
      $scope.isAATFTMSR =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM SR";
        }).length > 0;
      $scope.isAATFTMConfirmSI =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM Confirm SI";
        }).length > 0;
      $scope.isAATFTMEditSI =
        permission.filter(function (x) {
          return x.page_name == "AAT FTM Edit SI";
        }).length > 0;
      $scope.isYardInventory =
        permission.filter(function (x) {
          return x.page_name == "Yard Inventory";
        }).length > 0;
      $scope.isInspection =
        permission.filter(function (x) {
          return x.page_name == "Inspection";
        }).length > 0;
      $scope.isTruckPlan =
        permission.filter(function (x) {
          return x.page_name == "Truck Plan";
        }).length > 0;
      $scope.isAATFTMGateTruck =
        permission.filter(function (x) {
          return x.page_name == "Gate Truck";
        }).length > 0;

      $scope.isGroupAATFTMOperation =
        $scope.isAATFTMCreateTrip ||
        $scope.isAATFTMTrip ||
        $scope.isAATFTMConfirmFleet ||
        $scope.isYardInventory ||
        $scope.isTruckPlan ||
        $scope.isAATFTMGateTruck;
    }

    $scope.showConfig = function () {
      var modalInstance = $modal.open({
        controller: "ConfigModalCtrl",
        templateUrl: "check-modal.html",
        size: "lg",
      });
    };

    // Api.get('/svn').then(function (response) {
    //   $scope.app.version = "svn : " + response.data;
    // });

    Api.get("/api/auth/current_user").then(function (response) {
      if (response.data.status) {
        $scope.app.current_user = response.data.result.fullname;
      } else {
        $scope.app.current_user = "Guest";
      }
    });

    Api.post("/api/auto_response/list", {
      model: {
        filters: {},
        mode: 1,
      },
    }).then(function (result) {
      // console.log('getAutoResponse')
      // console.log(result.data)
      if (result.data.status == true) {
        $scope.app.auto_response = result.data.result.map((item) => {
          return {
            intent_id: item.intent_id,
            intent_name: item.intent_name,
            message: item.message.split(","),
            response: item.response,
          };
        });
      } else {
        $scope.app.auto_response = [];
      }
      // console.log($scope.app.auto_response)
    });

    // Api.get('/api/user/systemInfo/version').then(function (response) {
    //   // $scope.sysinfo = response.data.result;
    //   $scope.app.servername = response.data.ServerName;
    //   $scope.app.version = response.data.Value;
    // });

    // socket.on('connect', function () {
    //   console.log('Socket is connected.');
    //  // $scope.setName();
    // });

    // socket.on('disconnect', function () {
    //   console.log('Socket is disconnected.');
    //   //window.location = "/";
    // });
  },
]);
