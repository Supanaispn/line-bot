app.controller("LineGroupModalCtrl", ['$modalInstance', '$scope', 'SweetAlert', '$stateParams', 'Api', 'item', 'socket', "FileUploader", 
  function ($modalInstance, $scope, SweetAlert, $stateParams, Api, item, socket, FileUploader) {
    $scope.form = {
      group_id: item.group_id,
      message_text: "",
      outbound: true
    };

    $scope.chatList = [];

    socket.on("message", function (msg) {
      // console.log('socket')
      // console.log(msg);
      if (msg.group_id == item.group_id) {
        msg.outbound = false;
        $scope.chatList.push(msg);
        setTimeout(() => {
          $(".modal-body").scrollTop(10000000);
        }, 300);
      }
    });

    // console.log(item)
    var uploader = (
      $scope.uploader = new FileUploader({
        url: "api/lineGroup/fileUpload_cast",
        formData: [$scope.form],
        removeAfterUpload : true
      })
    );

    // FILTERS
    uploader.filters.push({
      name: "customFilter",
      fn: function (item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
      },
    });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
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
    // console.info("uploader", uploader);

    // Outbound Message :: Files
    $scope.uploadFile = () => {
      if($scope.form.message_text != null){
        $scope.chatMessage()
      }
  
      uploader.uploadAll()
    }

    // Outbound Message :: Text
    $scope.chatMessage = () => {
      if ($scope.form.message_text.trim().length > 0) {
        Api.post("api/lineGroup/chatMessage", {
          group_id: item.group_id,
          message_text: $scope.form.message_text,
          type: $scope.form.message_text != "" ? "text" : null,
          outbound: true,
        }).then(function (result) {
          // console.log('chatMessage')
          // console.log(result)
          // return
          var _res = result.data.result;
          $scope.chatList.push({
            group_id: item.group_id,
            message_id: _res.message_id,
            message_text: _res.message_text,
            message_type: _res.message_type,
            outbound: true,
            text_date_admin: _res.log_datetime,
            admin_name: _res.admin_name,
          });
          $scope.form.message_text = "";
          setTimeout(() => {
            $(".modal-body").scrollTop(10000000);
          }, 300);
        });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.init = function () {
      Api.post("api/lineGroup/getChatList", {
        group_id: item.group_id,
      }).then(function (result) {
        var _res = result.data.result;
        $scope.chatList = _res;
        // console.log('init')
        // console.log(_res)
        setTimeout(() => {
          $(".modal-body").scrollTop(10000000);
        }, 300);
      });
    };

    $scope.init();

    $scope.linkDetect = function (text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      })
      // or alternatively
      // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }



  }
]);

