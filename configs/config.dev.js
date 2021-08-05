var _port = 3333;
module.exports = {
  hosturl: "https://0070321e4646.in.ngrok.io",
  port: _port,
  ssl_key: "./ssl/privatekey.key",
  ssl_cert: "./ssl/dits-cert.crt",
  secret: "linebot_secret",
  NODE_ENV: "development", //"production";  //"development"
  TimeAttendanceDate: 20200401,
  lineConfig: {
    channelAccessToken:
      "nTAoXIX0lDkTzZ2+xX9flkqIPH22XansQk7G1R/GUdYy3U1wJKKLyNw3rgSD1xtDI3tVH0MuXe9pI50UXkuXBLLBtA8Hbbu0ngMs3L8b9sRkyuY5A/U2nzfq2U+adA/6Xaq/bNLVZoEdF1sZYSUZwAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "19053accb538f7e03a9538b2cf2312b2",
  },
  logger: {
    format: "tiny",
  },
  database: {
    client: "mysql",
    connection: {
      host: "veraplussoft.co.th",
      user: "vps_react",
      password: "78l^3Lqy",
      database: "vps_react_test",
      charset: "utf8_general_ci",
      port: 3306,
    },
  },
  google: {
    clientID:
      "210583050493-all3tp9essu55kdmvf9aimp4um3g8frs.apps.googleusercontent.com",
    clientSecret: "iSG77RoUy21BbNrIT6uuxnNS",
    // callbackURL: 'https://localhost:3000/auth/google/callback',
    callbackURL: "https://chatbot.dits.co.th/auth/google/callback",
  },
};
