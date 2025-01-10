const json = require("./collection/json.js");
const TimePromise = require("./collection/timepromise.js");
const mimes = require("./collection/mimes.json");
const sigint = require("./collection/sigint.js");
const optparser = require("./collection/optparser.js");

module.exports = { json, TimePromise, mimes, sigint, optparser };
