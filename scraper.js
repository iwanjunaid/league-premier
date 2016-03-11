var Horseman = require('node-horseman');
var async = require('async');
var fs = require('fs');
var path = require('path');

function Scraper() {
  this.session = new Horseman({
    timeout: 60000
  });
  this.helpers = {};
};

module.exports = function() {
  return new Scraper();
};

Scraper.prototype.init = function(initCb) {
  var self = this;

  async.waterfall([
    function(cb) {
      fs.readdir('helpers', function(err, files) {
        files.forEach(function(file) {
            var module = require(path.join(__dirname, 'helpers', file))(self);
            self.helpers[module.name] = module;
        });

        cb(err);
      });
    }
  ], function(err, res) {
    initCb(err);
  });
};

Scraper.prototype.info = function() {
  return {
    name: 'premiere',
    version: '1.0.0'
  };
};
