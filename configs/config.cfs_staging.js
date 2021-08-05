var _port = 9992;
module.exports = {
    hosturl: 'http://localhost:' + _port,
    port: _port,
    ssl_key: './ssl/privatekey.key',
    ssl_cert: './ssl/dits-cert.crt',
    secret: 'truck_queue_secret',
    line_notify_url: 'http://wmsdemo.hili.asia/NotifyCenter/LineNotify/Send?site=ebxml&module=import&msg=',
    NODE_ENV: "development", //"production";  //"development"
    TimeAttendanceDate : 20200401,
    logger: {
        format: "tiny"
    },
    database: {
        client: 'mysql',
        connection: {
            host: '172.16.15.11',
            user: 'root',
            password: 'azsxdcfv',
            database: 'linebot_ccms_dev'
        }
    },
    google: {
        clientID: '210583050493-all3tp9essu55kdmvf9aimp4um3g8frs.apps.googleusercontent.com',
        clientSecret: 'iSG77RoUy21BbNrIT6uuxnNS',
        callbackURL: 'https://cfs-staging.dits.co.th/auth/google/callback',
    }
};