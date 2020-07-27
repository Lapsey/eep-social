const monk = require('monk');
const db = monk('localhost/eepSocialMessages');

module.exports = db;