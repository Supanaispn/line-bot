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
const puppeteer = require("puppeteer");
const moment = require("moment");
const axios = require("axios");
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
const { default: Axios } = require("axios");

cron.schedule("*/1 * * * *", async () => {
    // await cron_model.call_fasttrade();
    // await cron_model.call_mea();
});

const delay = function (time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
};

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

router.get("/mea", async (req, res) => {
    try {
        let result = await (async () => {
            const browser = await puppeteer.launch({
                headless: true,
            });

            const page = await browser.newPage();

            await page.goto("https://eservice.mea.or.th/meaeservice/Services/logout", {
                waitUntil: "networkidle2",
            });

            await delay(0);
            await page.goto("https://eservice.mea.or.th/meaeservice/", {
                waitUntil: "networkidle2",
            });
            await page.setViewport({
                width: 1920,
                height: 1080,
            });

            await delay(100);

            await page.evaluate(async () => {
                document.querySelector(
                    "body > div.w3-row.w3-padding-32 > div.w3-container.w3-row.w3-border.w3-hide-large.w3-hide-small.w3-padding-32 > div.w3-container.w3-half.w3-light-gray > form > input"
                ).value = "supanai.spn@gmail.com";
                document.querySelector(
                    "body > div.w3-row.w3-padding-32 > div.w3-container.w3-row.w3-border.w3-hide-large.w3-hide-small.w3-padding-32 > div.w3-container.w3-half.w3-light-gray > form > p > input"
                ).value = "Supanaikub1197";

                document.getElementsByTagName("button")[5].click();
            });

            await delay(4500);

            let p = await page.evaluate(async () => {
                document
                    .querySelector(
                        "body > div.mes-outer-container > div > div.w3-container.w3-panel.w3-content.w3-sand.w3-leftbar.w3-hover-border-red.w3-round-large.mes-inner-container > h5.w3-right-align"
                    )
                    .click();

                let name = document
                    .querySelector("#box1 > div.w3-content.w3-sand > div > div:nth-child(1) > div")
                    .innerText.trim();

                let status = document
                    .querySelector("#box1 > div.w3-content.w3-sand > div > div:nth-child(3) > div")
                    .innerText.trim();

                let address = document
                    .querySelector("#box1 > div.w3-content.w3-sand > div > div.w3-col.l12.m12.s12")
                    .innerText.trim();

                let price_total = document
                    .querySelector(
                        "#box1 > div.w3-content.w3-sand > form > div.w3-panel.w3-border-top.w3-border-bottom.w3-border-red > h4"
                    )
                    .innerText.trim();

                return {
                    name: name.split(":")[1],
                    status: status.split(":")[1],
                    address: address.split(":")[1],
                    price_total: price_total,
                };
            });

            console.log("success");
            await browser.close();

            return p;
        })();

        res.json({
            status: true,
            data: result,
        });
    } catch (error) {
        console.log(error.toString());
    }
});

// router.use('/downloads', express.static(path.resolve(__dirname, 'server/downloads')));
router.use("/favicon.ico", express.static(path.resolve(__dirname, "client/favicon.ico")));

router.use("/assets", express.static(path.resolve(__dirname, "client/assets")));
router.use("/css", express.static(path.resolve(__dirname, "client/css")));
router.use("/img", express.static(path.resolve(__dirname, "client/img")));
router.use("/ng", express.static(path.resolve(__dirname, "client/ng")));

router.use("/static", express.static("static"));
router.use("/", VerifyToken, express.static(path.resolve(__dirname, "client")));

router.use("/downloads", express.static(path.resolve(__dirname, "downloads")));
router.use("/fileuploads", express.static(path.resolve(__dirname, "fileuploads")));
router.use("/qrcode", express.static(path.resolve(__dirname, "qrcode")));

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 //unable to verify the first certificate in nodejs when request http

server.listen(process.env.PORT || _config.port, process.env.IP || "0.0.0.0", function () {
    global.__root = __dirname;
    var addr = server.address();
    console.log("HILI BOT", addr.address + ":" + addr.port);
});
