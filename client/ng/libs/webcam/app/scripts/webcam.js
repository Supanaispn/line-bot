"use strict";
!function () {
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia,
        window.hasModernUserMedia = "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices,
        window.hasModernUserMedia && (navigator.getMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)),
        window.hasUserMedia = function () {
            return navigator.getMedia ? !0 : !1
        }
}(),
    angular.module("webcam", []).directive("webcam", function () {
        return {
            template: '<div class="webcam" ng-transclude></div>',
            restrict: "E",
            replace: !0,
            transclude: !0,
            scope: {
                onError: "&",
                onStream: "&",
                onStreaming: "&",
                placeholder: "=",
                config: "=channel"
            },
            link: function (a, b) {
                var c = null
                    , d = null
                    , e = null;
                a.config = a.config || {};
                var f = function (a) {
                    a && angular.element(a).remove()
                }
                    , g = function () {
                        if (d) {
                            var a = "function" == typeof d.getVideoTracks;
                            if (d.getVideoTracks && a) {
                                var b = d.getVideoTracks();
                                b && b[0] && b[0].stop && b[0].stop()
                            } else
                                d.stop && d.stop()
                        }
                        c && (delete c.src,
                            delete c.srcObject,
                            c.removeAttribute("src"),
                            c.removeAttribute("srcObject"))
                    }
                    , h = function (b) {
                        if (d = b,
                            window.hasModernUserMedia)
                            c.srcObject = b;
                        else if (navigator.mozGetUserMedia)
                            c.mozSrcObject = b;
                        else {
                            var e = window.URL || window.webkitURL;
                            c.src = e.createObjectURL(b)
                        }
                        c.play(),
                            a.config.video = c,
                            a.onStream && a.onStream({
                                stream: b
                            })
                    }
                    , i = function (b) {
                        f(e),
                            console && console.debug && console.debug("The following error occured: ", b),
                            a.onError && a.onError({
                                err: b
                            })
                    }
                    , j = function () {
                        c = document.createElement("video"),
                            c.setAttribute("class", "webcam-live"),
                            c.setAttribute("autoplay", ""),
                            b.append(c),
                            a.placeholder && (e = document.createElement("img"),
                                e.setAttribute("class", "webcam-loader"),
                                e.src = a.placeholder,
                                b.append(e));
                        var d = !1
                            , g = b.width = a.config.videoWidth || 320
                            , j = b.height = 0;
                        if (!window.hasUserMedia())
                            return void i({
                                code: -1,
                                msg: "Browser does not support getUserMedia."
                            });
                        var k = {
                            video: !0,
                            audio: !1
                        };
                        window.hasModernUserMedia ? navigator.getMedia(k).then(h)["catch"](i) : navigator.getMedia(k, h, i),
                            c.addEventListener("canplay", function () {
                                if (!d) {
                                    var b = g / c.videoWidth;
                                    j = c.videoHeight * b || a.config.videoHeight,
                                        c.setAttribute("width", g),
                                        c.setAttribute("height", j),
                                        d = !0,
                                        a.config.video = c,
                                        f(e),
                                        a.onStreaming && a.onStreaming()
                                }
                            }, !1)
                    }
                    , k = function () {
                        g(),
                            c.remove()
                    };
                a.$on("$destroy", g),
                    a.$on("START_WEBCAM", j),
                    a.$on("STOP_WEBCAM", k),
                    j()
            }
        }
    });
