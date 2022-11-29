
const moment = require('moment-timezone')

const getDate = () => {
    let dateVN = moment.tz(Date.now(), "Asia/Bangkok").format();
    return dateVN
}

module.exports = getDate