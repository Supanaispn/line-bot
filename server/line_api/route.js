const _model = require("./model");
const _baseurl = "/line/v1";
const VerifyToken = require("../VerifyToken");

const line = require("@line/bot-sdk");
const path = require("path");
const fs = require("fs");
const { base64encode, base64decode } = require("nodejs-base64");
const cron_model = require("./cron_api");
const { lineConfig } = require(`../../configs/config.dev`);
const config = lineConfig;

module.exports = async function (Api) {
  Api.get("/webhook", (req, res) =>
    res.end(`I'm listening. Please access with POST.`)
  );

  Api.post("/webhook", line.middleware(config), async (req, res) => {
    try {
      let { events, destination } = req.body;

      // console.log(events[0].message.text);

      if (destination) console.log("User ID : " + destination);

      // req.body.events should be an array of events
      if (!Array.isArray(events)) return res.status(500).end();

      let { replyToken, source, message } = events[0];

      if (
        replyToken == "00000000000000000000000000000000" &&
        message.text === "Hello, world"
      )
        return res.status(200).end();

      Promise.all(
        req.body.events.map(async (d) => {
          let user = {
            token: replyToken,
            userId: source.userId,
            text: d.message.text,
          };

          console.log("message : ", d.message.text);
          switch (d.message.text) {
            case "ติดตามของ":
              await cron_model.call_fasttrade(user);
              break;
            case "ค่าไฟเดือนนี้":
              await cron_model.call_mea(user);
              break;
            default:
              await cron_model.call_reply(user);
              break;
          }
        })
      )
        .then(function () {
          res.status(200).end();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
    } catch (err) {
      console.log(err.toString());
    }

    res.end();
  });

  Api.post(_baseurl + "/fasttrade", async (req, res) => {
    try {
      let _result = await _model.fasttrade(req.body);
      res.json(_result).status(_result.status);
    } catch (error) {
      res.status(500);
    }
  });

  Api.post(_baseurl + "/mea", async (req, res) => {
    try {
      let _result = await _model.mea(req.body);
      res.json(_result).status(_result.status);
    } catch (error) {
      res.status(500);
    }
  });

  Api.post(_baseurl + "/broadCast", async (req, res) => {
    try {
      let _result = await _model.broadCast(req.body);
      res.json(_result).status(_result.status);
    } catch (error) {
      res.status(500);
    }
  });

  Api.post(_baseurl + "/pushMessage", async (req, res) => {
    try {
      let _result = await _model.pushMessage(req.body, req.headers);
      res.json(_result).status(_result.status);
    } catch (error) {
      res.status(500);
    }
  });

  Api.post(_baseurl + "/multiCast", async (req, res) => {
    try {
      let _result = await _model.multiCast(req.body);
      res.json(_result).status(_result.status);
    } catch (error) {
      res.status(500);
    }
  });
};
