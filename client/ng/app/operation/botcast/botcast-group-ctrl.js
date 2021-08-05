app.controller("BotCastGroupCtrl", [
  "$modalInstance",
  "$scope",
  "SweetAlert",
  "$stateParams",
  "Api",
  "item",
  "FileUploader",
  function (
    $modalInstance,
    $scope,
    SweetAlert,
    $stateParams,
    Api,
    item,
    FileUploader,
    user
  ) {
    $scope.item = {};
    $scope.userList = [];
    $scope.select = [];

    if (item != undefined || item != null) {
      $scope.item = item;
    }

    $scope.item.group_id = [];
    $scope.item.log_id = 0;

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.postbotcat = function () {
      Api.post("api/lineGroup/botCast", $scope.item).then(function (result) {
        console.log("thissss", result);

        if (result.status == 200) {
          console.log("200");
          $modalInstance.close("Ok");
          SweetAlert.swal(
            {
              title: "Save Success.",
              type: "success",
              text: "I will close in 2 seconds.",
              timer: 2000,
              showConfirmButton: true,
            },
            function () {
              SweetAlert.close();
              $modalInstance.close("Ok");
            }
          );
          return;
        }

        SweetAlert.swal(
          {
            title: result.data.result,
            type: "warning",
            showConfirmButton: true,
          },
          function () {
            SweetAlert.close();
          }
        );
      });
    };

    // Upload File
    var uploader = ($scope.uploader = new FileUploader({
      url: "api/lineGroup/fileUpload",
      formData: [$scope.item],
      removeAfterUpload: true,
    }));

    // FILTERS
    uploader.filters.push({
      name: "customFilter",
      fn: function (item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
      },
    });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function (
      item /*{File|FileLikeObject}*/,
      filter,
      options
    ) {
      console.info("onWhenAddingFileFailed", item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
      console.info("onAfterAddingFile", fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
      console.info("onAfterAddingAll", addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
      console.info("onBeforeUploadItem", item);
      var picture_check = item;
    };
    uploader.onProgressItem = function (fileItem, progress) {
      console.info("onProgressItem", fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
      console.info("onProgressAll", progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
      console.info("onSuccessItem", fileItem, response, status, headers);
      // console.log(response)
      var _res = response.result;
      $scope.chatList.push({
        group_id: item.group_id,
        message_id: _res.message_id,
        message_type: _res.message_type,
        outbound: true,
        text_date_admin: _res.log_datetime,
        admin_name: _res.admin_name,
      });
      $scope.form.message_text = "";
      setTimeout(() => {
        $(".modal-body").scrollTop(10000000);
      }, 300);
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.info("onErrorItem", fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
      console.info("onCancelItem", fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
      console.info("onCompleteItem", fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function () {
      console.info("onCompleteAll");
    };
    console.info("uploader", uploader);

    // Outbound Message :: Files
    $scope.uploadFile = () => {
      $scope.postbotcat();
      uploader.uploadAll();
    };
    $scope.getUserList = async function () {
      Api.post("api/user/getGroupList").then(function (result) {
        $scope.userList = result.data.result;
        // console.log('thisss',$scope.userList)
        if (item != undefined || item != null) {
          for (const d of $scope.userList) {
            if (d.group_id == item.broadcast_group) {
              $scope.item.group_id.push(item.broadcast_group);
            }
          }
        }

        // console.log($scope.userList);
        // return
      });
    };

    // $scope.init = function () {
    $scope.getUserList();
    // };

    // $scope.init();
  },
]);
