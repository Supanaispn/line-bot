
const eventlog = require('./EventLogHelper');
module.exports.execute = async function (knex, query, param, order_by, pageIndex, pageSize) {
    try {
        let [_total] = await knex.raw("select count(1) as total from (" + query + ") as x;", param);

        if(order_by != "") {
            query += " order by " + order_by;
        }
        
        query += " LIMIT ?,?";

        pageIndex = (parseInt(pageIndex) - 1) * parseInt(pageSize);
        pageSize = parseInt(pageSize);

        if (param == null || param == []) {
            param = [pageIndex, pageSize];
        } else {
            param.push(pageIndex);
            param.push(pageSize);
        }

        let [data] = await knex.raw(query, param);

        return {
            data: data,
            total: _total[0].total
        };

    } catch (err) {
        eventlog.insert("Pagging Helper", err.toString());
        return {
            result: err.toString(),
            status: false,
        };
    }
};