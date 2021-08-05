const _model = require("./model");
async function call_fasttrade(body) {
    let _result = await _model.fasttrade(body);
}

async function call_mea(body) {
    let _result = await _model.mea(body);
}

async function call_covid(body) {
    let _result = await _model.covid(body);
}

async function call_reply(body) {
    let _result = await _model.reply(body);
}

module.exports.call_fasttrade = call_fasttrade;
module.exports.call_mea = call_mea;
module.exports.call_covid = call_covid;
module.exports.call_reply = call_reply;
