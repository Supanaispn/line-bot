"use strict";
const http = require("http");
const express = require("express");
const router = express();
const bodyParser = require("body-parser");
// const compression = require("compression");
const path = require("path");
// const morgan = require("morgan");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const methodOverride = require("method-override");

// const session = require("express-session");
// const passport = require("passport");
// const flash = require("connect-flash");
// const fileUpload = require("express-fileupload");
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const VerifyToken = require("./server/VerifyToken");
// const axios = require("axios");

const _tokenExpire = 30 * 24 * 60 * 60 * 1000;
const _config = require(`./configs/config.${process.env.NODE_ENV || "dev"}`);
const httpsOptions = {
  key: fs.readFileSync(_config.ssl_key),
  cert: fs.readFileSync(_config.ssl_cert),
};

var server = http.createServer(httpsOptions, router);

const cron_model = require("./server/line_api/cron_api");

var cron = require("node-cron");

cron.schedule("*/1 * * * *", async () => {
  // await cron_model.call_fasttrade();
  // await cron_model.call_mea();
});

// router.use(morgan(_config.logger.format));
// morgan.token("date", function () {
//   var p = new Date()
//     .toString()
//     .replace(/[A-Z]{3}\+/, "+")
//     .split(/ /);
//   return p[2] + "/" + p[1] + "/" + p[3] + ":" + p[4] + " " + p[5];
// });

// router.use(
//   morgan("common", {
//     stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
//       flags: "a",
//     }),
//   })
// );
// router.use(bodyParser.json());
// router.use(fileUpload());
// router.use(compression());
router.use(
  bodyParser.urlencoded({
    extended: "true",
  })
); // parse application/x-www-form-urlencoded
// router.use(
//   bodyParser.json({
//     limit: "100mb",
//   })
// ); // parse application/json
router.use(
  bodyParser.json({
    type: "application/vnd.api+json",
  })
); // parse application/vnd.api+json as json
router.use(methodOverride("X-HTTP-Method-Override")); // override with the X-HTTP-Method-Override header in the request

require("./server/line_api/route")(router);

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  req.logout();
  res.redirect("/login");
});

router.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/login.html");
});

router.get("/login", function (req, res) {
  res.sendFile(__dirname + "/client/login.html");
});

// router.use('/downloads', express.static(path.resolve(__dirname, 'server/downloads')));
router.use(
  "/favicon.ico",
  express.static(path.resolve(__dirname, "client/favicon.ico"))
);

router.use("/assets", express.static(path.resolve(__dirname, "client/assets")));
router.use("/css", express.static(path.resolve(__dirname, "client/css")));
router.use("/img", express.static(path.resolve(__dirname, "client/img")));
router.use("/ng", express.static(path.resolve(__dirname, "client/ng")));

router.use("/static", express.static("static"));
router.use("/", VerifyToken, express.static(path.resolve(__dirname, "client")));

router.use("/downloads", express.static(path.resolve(__dirname, "downloads")));
router.use(
  "/fileuploads",
  express.static(path.resolve(__dirname, "fileuploads"))
);
router.use("/qrcode", express.static(path.resolve(__dirname, "qrcode")));

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 //unable to verify the first certificate in nodejs when request http

server.listen(
  process.env.PORT || _config.port,
  process.env.IP || "0.0.0.0",
  function () {
    global.__root = __dirname;
    var addr = server.address();
    console.log("HILI BOT", addr.address + ":" + addr.port);
  }
);
