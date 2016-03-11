var Horseman = require('node-horseman');
var scraper = require('../scraper')(Horseman);
var assert = require('assert');

global.assert = assert;
global.scraper = scraper;
