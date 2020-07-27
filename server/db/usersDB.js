const monk = require('monk');
const db = monk('localhost/eppSocialUsers');

module.exports = db;