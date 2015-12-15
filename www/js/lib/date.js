var moment = require('moment');

function lastUpdate() {
    return moment().format('lll');
}

exports.lastUpdate = lastUpdate;
