let configs = require('../configs/database');
module.exports.insert = async function (_module, msg) {
    console.log("Log Helper");
    console.log(msg);
    return;
    const knex = require('knex')(configs);
    try {
        await knex.returning(['id']).insert([{
            log_module: _module,
            log_message: msg,
            log_date: knex.fn.now(6)
        }]).into("event_log");

        knex.destroy();
    } catch (err) {
        console.log(err.toString());
        knex.destroy();
    }
};