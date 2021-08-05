const configs = require("../../configs/database");
const paging = require("../PaggingHelper");
const dateFormat = require("date-format");
const axios = require("axios");
const line = require("@line/bot-sdk");
const path = require("path");
const fs = require("fs");
const { base64encode, base64decode } = require("nodejs-base64");
const { lineConfig } = require(`../../configs/config.dev`);
const config = lineConfig;

var _model = {
  broadCast: async function (body) {
    try {
      const client = new line.Client(config);

      const LINE_BODY = {
        type: "flex",
        altText: "Flex Message",
        contents: {
          type: "bubble",
          direction: "ltr",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "image",
                url: "https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/84_Dev_logo_logos-512.png",
                size: "5xl",
              },
            ],
          },
          footer: {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "Design by SPN",
                flex: 10,
                size: "xxl",
                align: "center",
                weight: "bold",
                color: "#726EEC",
              },
            ],
          },
        },
      };

      let res = await client.broadcast(LINE_BODY);

      return {
        status: 200,
        result: {
          msg: "OK",
          "request-id": res["x-line-request-id"],
        },
      };
    } catch (err) {
      return {
        status: 400,
        result: err.toString(),
      };
    }
  },
  pushMessage: async function (body, headers) {
    try {
      const client = new line.Client(config);
      // // const knex = require("knex")(configs);

      const LINE_BODY = {
        type: "text",
        text: "123",
      };

      // user_or_group_or_room_id *** single target

      let res = await client.pushMessage(
        "U8da5970f4ec3ae521eee19232943fc83",
        LINE_BODY
      );

      // knex.destroy();
      return {
        status: 200,
        result: {
          msg: "OK",
          "request-id": res["x-line-request-id"],
        },
      };
    } catch (err) {
      return {
        status: 400,
        result: err.toString(),
      };
    }
  },
  multiCast: async function (body) {
    try {
      const client = new line.Client(config);
      // const client = new line.Client(config);
      // const knex = require("knex")(configs);

      // let _result = await knex("line_userprofile");

      // let userID = [];
      // _result.forEach((d) => {
      //   userID.push(d.userID);
      // });

      const LINE_BODY = {
        type: "text",
        text: "hello, world",
      };

      let userID = [
        "U8da5970f4ec3ae521eee19232943fc83",
        "U8da5970f4ec3ae521eee19232943fc83",
      ];
      // ['user_id_1', 'user_id_2', 'room_id_1'] *** mutiple target
      let res = await client.multicast(userID, LINE_BODY);

      // knex.destroy();
      return {
        status: 200,
        result: {
          msg: "OK",
          "request-id": res["x-line-request-id"],
        },
      };
    } catch (err) {
      return {
        status: 400,
        result: err.toString(),
      };
    }
  },
  reply: async function (body, text) {
    try {
      const client = new line.Client(config);

      const LINE_BODY = {
        type: "text",
        text: body.text,
      };

      let res = await client.replyMessage(body.token, LINE_BODY);

      // knex.destroy();
      return {
        status: 200,
        result: {
          msg: "OK",
          "request-id": res["x-line-request-id"],
        },
      };
    } catch (err) {
      return {
        status: 400,
        result: err.toString(),
      };
    }
  },
  fasttrade: async function (body) {
    try {
      const client = new line.Client(config);

      await client.replyMessage(body.token, {
        type: "text",
        text: "รอสักครู่น๊า",
      });

      let response = await axios.get("http://localhost:4555/fasttrade");

      const LINE_BODY = {
        type: "text",
        text: "ของมาถึงแล้วนะ แม๊ว",
      };

      const USER_ID = [
        "U8da5970f4ec3ae521eee19232943fc83",
        "Ue2a8d58c521ed174c7b5b40dcac413c1",
      ];

      let list_data = [];

      response.data.data.forEach((d, i) => {
        let list_body = [];

        d.timeline.forEach((p, i) => {
          list_body.push(
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: p.split(":")[1],
                  size: "sm",
                  gravity: "center",
                  align: "end",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "filler",
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "text",
                          text: " ",
                        },
                      ],
                      cornerRadius: "30px",
                      height: "20px",
                      width: "20px",
                      offsetStart: "7px",
                    },
                    {
                      type: "filler",
                    },
                  ],
                  flex: 0,
                  backgroundColor: "#848484",
                  width: "30px",
                  height: "30px",
                  cornerRadius: "30px",
                },
                {
                  type: "text",
                  text: p.split(":")[0],
                  gravity: "center",
                  flex: 1,
                  size: "sm",
                },
              ],
              spacing: "lg",
              cornerRadius: "30px",
              margin: "xl",
            },
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "text",
                      text: " ",
                      size: "xs",
                      color: "#8c8c8c",
                      align: "end",
                    },
                  ],
                  flex: 2,
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "filler",
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "filler",
                            },
                          ],
                          width: "3px",
                          backgroundColor: "#B7B7B7",
                        },
                        {
                          type: "filler",
                        },
                      ],
                      flex: 1,
                    },
                  ],
                  width: "30px",
                },
                {
                  type: "text",
                  text: " ",
                  gravity: "top",
                  flex: 2,
                  size: "xs",
                  color: "#8c8c8c",
                },
              ],
              spacing: "lg",
              height: "40px",
            }
          );
        });
        list_body.length = list_body.length - 1;

        list_data.push({
          type: "bubble",
          size: "mega",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "Tracking Number",
                    color: "#ffffff66",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: d.track,
                    color: "#ffffff",
                    size: "xl",
                    flex: 4,
                    weight: "bold",
                  },
                ],
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "ประเภท",
                        color: "#ffffff66",
                        size: "sm",
                      },
                      {
                        type: "text",
                        text: d.type,
                        color: "#ffffff",
                        size: "md",
                        flex: 4,
                        weight: "bold",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "สถานะค่าใช้จ่าย",
                        color: "#ffffff66",
                        size: "sm",
                      },
                      {
                        type: "text",
                        text: d.status_price,
                        color: "#ffffff",
                        size: "md",
                        flex: 4,
                        weight: "bold",
                      },
                    ],
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: `ค่าใช้จ่ายสุทธิ ${d.price} บาท`,
                    color: "#ffffff",
                    size: "sm",
                    flex: 4,
                    weight: "bold",
                  },
                ],
              },
            ],
            paddingAll: "20px",
            backgroundColor: "#e63c50",
            spacing: "md",
            height: "154px",
            paddingTop: "22px",
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: list_body,
          },
        });
      });

      let template = {
        type: "carousel",
        contents: list_data,
      };

      let res = await client.pushMessage(body.userId, {
        type: "flex",
        altText: "Flex Message",
        contents: template,
      });

      await client.pushMessage(body.userId, LINE_BODY);

      // user_or_group_or_room_id *** single target

      // let res = await client.pushMessage(
      //   "U8da5970f4ec3ae521eee19232943fc83",
      //   LINE_BODY
      // );

      // knex.destroy();
      return {
        status: 200,
        result: {
          msg: "OK",
          "request-id": res["x-line-request-id"],
        },
      };
    } catch (err) {
      console.log(err.toString());
      return {
        status: 400,
        result: err.toString(),
      };
    }
  },
  mea: async function (body) {
    try {
      const client = new line.Client(config);

      await client.replyMessage(body.token, {
        type: "text",
        text: "กำลังตรวจสอบ...",
      });

      let response = await axios.get("http://localhost:3333/mea");
      let result = response.data.data;

      // // const knex = require("knex")(configs);

      const LINE_BODY = {
        type: "text",
        text: "ค่าไฟฟ้าเดือนนี้",
      };

      // const USER_ID = [
      //   "U8da5970f4ec3ae521eee19232943fc83",
      //   "Ue2a8d58c521ed174c7b5b40dcac413c1",
      // ];

      let res = await client.pushMessage(body.userId, {
        type: "flex",
        altText: "Flex Message",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "การไฟฟ้านครหลวง",
                weight: "bold",
                color: "#e37932",
                size: "lg",
              },
              {
                type: "text",
                text: result.name,
                weight: "bold",
                size: "xl",
                margin: "lg",
                align: "center",
              },
              {
                type: "text",
                text: result.address,
                size: "xs",
                wrap: true,
                margin: "xl",
                align: "start",
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "vertical",
                margin: "xxl",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "ค่าไฟฟ้า",
                        size: "md",
                        color: "#555555",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: result.price_total,
                        size: "md",
                        color: "#111111",
                        align: "end",
                      },
                    ],
                  },

                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "xxl",
                    contents: [
                      {
                        type: "text",
                        text: "ITEMS",
                        size: "md",
                        color: "#555555",
                      },
                      {
                        type: "text",
                        text: "1",
                        size: "md",
                        color: "#111111",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "TOTAL",
                        size: "md",
                        color: "#555555",
                      },
                      {
                        type: "text",
                        text: result.price_total,
                        size: "md",
                        color: "#111111",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              // {
              //   type: "separator",
              //   margin: "xxl",
              // },
              // {
              //   type: "box",
              //   layout: "horizontal",
              //   margin: "md",
              //   contents: [
              //     {
              //       type: "text",
              //       text: "PAYMENT ID",
              //       size: "xs",
              //       color: "#aaaaaa",
              //       flex: 0,
              //     },
              //     {
              //       type: "text",
              //       text: "#743289384279",
              //       color: "#aaaaaa",
              //       size: "xs",
              //       align: "end",
              //     },
              //   ],
              // },
            ],
          },
          styles: {
            footer: {
              separator: true,
            },
          },
        },
      });

      await client.pushMessage(body.userId, LINE_BODY);

      // user_or_group_or_room_id *** single target

      // let res = await client.pushMessage(
      //   "U8da5970f4ec3ae521eee19232943fc83",
      //   LINE_BODY
      // );

      // knex.destroy();
      return {
        status: 200,
        result: {
          msg: "OK",
          "request-id": res["x-line-request-id"],
        },
      };
    } catch (err) {
      return {
        status: 400,
        result: err.toString(),
      };
    }
  },
};

// simple reply function
const replyText = (token, texts) => {
  console.log("token : ", token);
  console.log("texts : ", texts);

  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: "text", text }))
  );
};

// callback function to handle a single event
async function handleEvent(event) {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }

  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        case "image":
          return handleImage(message, event.replyToken);
        case "video":
          return handleVideo(message, event.replyToken);
        case "audio":
          return handleAudio(message, event.replyToken);
        case "location":
          return handleLocation(message, event.replyToken);
        case "sticker":
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case "follow":
      return replyText(event.replyToken, "Got followed event");

    case "unfollow":
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case "join":
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case "leave":
      return console.log(`Left: ${JSON.stringify(event)}`);

    case "postback":
      let data = event.postback.data;
      if (data === "DATE" || data === "TIME" || data === "DATETIME") {
        data += `(${JSON.stringify(event.postback.params)})`;
      }
      return replyText(event.replyToken, `Got postback: ${data}`);

    case "beacon":
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

async function handleText(message, replyToken, source) {
  // const buttonsImageURL = `${baseURL}/static/buttons/1040.jpg`;

  var eventText = message.text.toLowerCase();

  let _tracking = "";
  let thpd = eventText;
  var _string = thpd.toUpperCase();

  if (_string.substring(0, 4) == "THPD") {
    var track = _string.replace("THPD", "");

    if (track.replace(/\s/g, "").length == 13) {
      _tracking = track.replace(/\s/g, "");

      if (process.env.tokenKeyThpd == undefined) {
        await getCertificate();
      }

      let trackData = {
        status: "all",
        language: "TH",
        barcode: [_tracking],
      };

      let item_json = [];

      let thpd = await axios({
        method: "post",
        url: "https://trackapi.thailandpost.co.th/post/api/v1/track",
        headers: {
          Authorization: process.env.tokenKeyThpd,
          "Content-Type": "application/json",
        },
        data: trackData,
      });

      var _resp = thpd.data;

      let key = Object.keys(_resp.response.items);

      if (_resp.response.items[key[0]].length > 0) {
        let bgcolor;

        // var last_element = _resp.response.items[key[0]] [_resp.response.items[key[0]].length - 1];
        // _resp.response.items[key[0]] = [last_element];

        _resp.response.items[key[0]].forEach(function (detail) {
          // console.log(detail);
          let time = detail.status_date.split("+");
          bgcolor = detail.delivery_status == "S" ? "#ABEBC6" : "#EEEEEE";

          const item_temp = {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: time[0],
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "spacer",
                        size: "xxl",
                      },
                      {
                        type: "text",
                        text: detail.status_description,
                        size: "sm",
                      },
                    ],
                    spacing: "none",
                    margin: "md",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "spacer",
                        size: "xxl",
                      },
                      {
                        type: "text",
                        text: detail.location,
                        size: "sm",
                      },
                      {
                        type: "text",
                        text: detail.postcode,
                        size: "sm",
                      },
                    ],
                    spacing: "none",
                    margin: "md",
                  },
                ],
              },
            ],
            backgroundColor: bgcolor,
            cornerRadius: "md",
            paddingAll: "10px",
          };

          item_json.push(item_temp);
        });

        let payload = {
          type: "bubble",
          size: "giga",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: _tracking,
                decoration: "none",
                size: "xl",
                weight: "bold",
              },
              {
                type: "box",
                layout: "vertical",
                contents: item_json,
                spacing: "sm",
                margin: "md",
              },
            ],
          },
        };

        msg = {
          type: "flex",
          altText: "สถานะการส่งของ",
          contents: {
            type: "carousel",
            contents: [payload],
          },
        };

        // msg = {
        //   type: "template",
        //   altText: "this is a carousel template",
        //   template: {
        //     type: "carousel",
        //     columns: item_json,
        //   },
        // };
      } else {
        msg = {
          type: "text",
          text: "ไม่พบข้อมูล",
        };
      }
      return client.replyMessage(replyToken, msg);
    }
  }

  switch (eventText) {
    case "profile":
      if (source.userId) {
        let profile = await client.getProfile(source.userId);

        let msg = {
          type: "image",
          originalContentUrl: profile.pictureUrl,
          previewImageUrl: profile.pictureUrl,
        };

        // return replyText(replyToken, [
        //     `Display name: ${profile.displayName}`,
        //     `Photo_url: ${profile.pictureUrl}`,
        //   ]);

        return client.replyMessage(replyToken, msg);
      } else {
        return replyText(
          replyToken,
          "Bot can't use profile API without user ID"
        );
      }
    case "buttons":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Buttons alt text",
        template: {
          type: "buttons",
          thumbnailImageUrl: buttonsImageURL,
          title: "My button sample",
          text: "Hello, my button",
          actions: [
            {
              label: "Go to line.me",
              type: "uri",
              uri: "https://line.me",
            },
            {
              label: "Say hello1",
              type: "postback",
              data: "hello こんにちは",
            },
            {
              label: "言 hello2",
              type: "postback",
              data: "hello こんにちは",
              text: "hello こんにちは",
            },
            { label: "Say message", type: "message", text: "Rice=米" },
          ],
        },
      });
    case "covid":
      let msg = {
        type: "text",
        text: "covid",
      };

      await axios
        .get("https://covid19.th-stat.com/api/open/today")
        .then((response) => {
          msg.text = `ติดเชื้อสะสม : ${response.data.Confirmed} \nติดเชื้อเพิ่ม : ${response.data.NewConfirmed} \nหายแล้ว : ${response.data.Recovered} \nรักษาอยู่ใน รพ. : ${response.data.Hospitalized} \nเสียชีวิต : ${response.data.Deaths}`;
        })
        .catch((err) => {
          console.log("eror", err);
        });

      return client.replyMessage(replyToken, msg);

    case "confirm":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Confirm alt text",
        template: {
          type: "confirm",
          text: "Do it?",
          actions: [
            { label: "Yes", type: "message", text: "Yes!" },
            { label: "No", type: "message", text: "No!" },
          ],
        },
      });
    case "carousel":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Carousel alt text",
        template: {
          type: "carousel",
          columns: [
            {
              thumbnailImageUrl: buttonsImageURL,
              title: "hoge",
              text: "fuga",
              actions: [
                {
                  label: "Go to line.me",
                  type: "uri",
                  uri: "https://line.me",
                },
                {
                  label: "Say hello1",
                  type: "postback",
                  data: "hello こんにちは",
                },
              ],
            },
            {
              thumbnailImageUrl: buttonsImageURL,
              title: "hoge",
              text: "fuga",
              actions: [
                {
                  label: "言 hello2",
                  type: "postback",
                  data: "hello こんにちは",
                  text: "hello こんにちは",
                },
                {
                  label: "Say message",
                  type: "message",
                  text: "Rice=米",
                },
              ],
            },
          ],
        },
      });
    case "image carousel":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Image carousel alt text",
        template: {
          type: "image_carousel",
          columns: [
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "Go to LINE",
                type: "uri",
                uri: "https://line.me",
              },
            },
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "Say hello1",
                type: "postback",
                data: "hello こんにちは",
              },
            },
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "Say message",
                type: "message",
                text: "Rice=米",
              },
            },
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "datetime",
                type: "datetimepicker",
                data: "DATETIME",
                mode: "datetime",
              },
            },
          ],
        },
      });
    case "datetime":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Datetime pickers alt text",
        template: {
          type: "buttons",
          text: "Select date / time !",
          actions: [
            {
              type: "datetimepicker",
              label: "date",
              data: "DATE",
              mode: "date",
            },
            {
              type: "datetimepicker",
              label: "time",
              data: "TIME",
              mode: "time",
            },
            {
              type: "datetimepicker",
              label: "datetime",
              data: "DATETIME",
              mode: "datetime",
            },
          ],
        },
      });
    case "imagemap":
      return client.replyMessage(replyToken, {
        type: "imagemap",
        baseUrl: `${baseURL}/static/rich`,
        altText: "Imagemap alt text",
        baseSize: { width: 1040, height: 1040 },
        actions: [
          {
            area: { x: 0, y: 0, width: 520, height: 520 },
            type: "uri",
            linkUri: "https://store.line.me/family/manga/en",
          },
          {
            area: { x: 520, y: 0, width: 520, height: 520 },
            type: "uri",
            linkUri: "https://store.line.me/family/music/en",
          },
          {
            area: { x: 0, y: 520, width: 520, height: 520 },
            type: "uri",
            linkUri: "https://store.line.me/family/play/en",
          },
          {
            area: { x: 520, y: 520, width: 520, height: 520 },
            type: "message",
            text: "URANAI!",
          },
        ],
        video: {
          originalContentUrl: `${baseURL}/static/imagemap/video.mp4`,
          previewImageUrl: `${baseURL}/static/imagemap/preview.jpg`,
          area: {
            x: 280,
            y: 385,
            width: 480,
            height: 270,
          },
          externalLink: {
            linkUri: "https://line.me",
            label: "LINE",
          },
        },
      });
    case "bye":
      switch (source.type) {
        case "user":
          return replyText(replyToken, "Bot can't leave from 1:1 chat");
        case "group":
          return replyText(replyToken, "Leaving group").then(() =>
            client.leaveGroup(source.groupId)
          );
        case "room":
          return replyText(replyToken, "Leaving room").then(() =>
            client.leaveRoom(source.roomId)
          );
      }
    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      return replyText(replyToken, message.text);
  }
}

async function handleImage(message, replyToken) {
  console.log(message, replyToken);
  let getContent;
  if (message.contentProvider.type === "line") {
    const downloadPath = path.join(
      __dirname,
      `./uploaded/img/${message.id}.jpg`
    );
    const previewPath = path.join(
      __dirname,
      `./uploaded/img/${message.id}.jpg`
    );

    getContent = downloadContent(message.id, downloadPath).then(
      (downloadPath) => {
        // ImageMagick is needed here to run 'convert'
        // Please consider about security and performance by yourself
        // cp.execSync(
        //   `convert -resize 240x jpeg:${downloadPath} jpeg:${previewPath}`
        // );

        return {
          originalContentUrl:
            "https://5b5809d66b63.ngrok.io" +
            "/img/" +
            path.basename(downloadPath),
          previewImageUrl:
            "https://5b5809d66b63.ngrok.io" +
            "/img/" +
            path.basename(previewPath),
        };
      }
    );
  } else if (message.contentProvider.type === "external") {
    getContent = Promise.resolve(message.contentProvider);
  }

  return getContent.then(({ originalContentUrl, previewImageUrl }) => {
    return client.replyMessage(replyToken, {
      type: "text",
      text: "บันทึกรูปสำเร็จ",
    });
  });
}

async function handleVideo(message, replyToken) {
  let getContent;
  if (message.contentProvider.type === "line") {
    const downloadPath = path.join(
      __dirname,
      "./uploaded/vdo/",
      `${message.id}.mp4`
    );
    const previewPath = path.join(
      __dirname,
      "./uploaded/vdo/",
      `${message.id}-preview.jpg`
    );

    getContent = downloadContent(message.id, downloadPath).then(
      (downloadPath) => {
        // FFmpeg and ImageMagick is needed here to run 'convert'
        // Please consider about security and performance by yourself
        // cp.execSync(`convert mp4:${downloadPath}[0] jpeg:${previewPath}`);

        return {
          // originalContentUrl:
          //   baseURL + "/uploaded/" + path.basename(downloadPath),
          // previewImageUrl:
          //   baseURL + "/uploaded/" + path.basename(previewPath),
        };
      }
    );
  } else if (message.contentProvider.type === "external") {
    getContent = Promise.resolve(message.contentProvider);
  }

  return getContent.then(({ originalContentUrl, previewImageUrl }) => {
    return client.replyMessage(replyToken, {
      type: "text",
      text: "บันทึกวีดีโอสำเร็จ",
    });
  });
}

function handleAudio(message, replyToken) {
  let getContent;
  if (message.contentProvider.type === "line") {
    const downloadPath = path.join(
      __dirname,
      "./uploaded/audio/",
      `${message.id}.m4a`
    );

    getContent = downloadContent(message.id, downloadPath).then(
      (downloadPath) => {
        return {
          originalContentUrl:
            baseURL + "/uploaded/" + path.basename(downloadPath),
        };
      }
    );
  } else {
    getContent = Promise.resolve(message.contentProvider);
  }

  return getContent.then(({ originalContentUrl }) => {
    return client.replyMessage(replyToken, {
      type: "audio",
      originalContentUrl,
      duration: message.duration,
    });
  });
}

async function downloadContent(messageId, downloadPath) {
  return client.getMessageContent(messageId).then(
    (stream) =>
      new Promise((resolve, reject) => {
        const writable = fs.createWriteStream(downloadPath);
        stream.pipe(writable);
        stream.on("end", () => resolve(downloadPath));
        stream.on("error", reject);
      })
  );
}

function handleLocation(message, replyToken) {
  return client.replyMessage(replyToken, {
    type: "location",
    title: message.title,
    address: message.address,
    latitude: message.latitude,
    longitude: message.longitude,
  });
}

function handleSticker(message, replyToken) {
  console.log(message);
  return client.replyMessage(replyToken, {
    type: "sticker",
    packageId: message.packageId,
    stickerId: message.stickerId,
  });
}

async function getCertificate() {
  try {
    process.env.certifyThpd = `Token Q#XzXsFiK;V+GxWUUTHjWVTWQnS:NtEKQ%BZCcKHOcZXX2A!NCUXFQR/ERY*JROHDK?F9ErOLBJAsDvV*MGTbTkT*MDWtYqW;LU`;

    let key = await axios.post(
      `https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token`,
      {},
      {
        headers: {
          Authorization: process.env.certifyThpd,
          "Content-Type": "application/json",
        },
      }
    );

    process.env.tokenKeyThpd = `Token ${key.data.token}`;
  } catch (error) {
    console.log(eror.toString());
  }
}

module.exports = _model;
