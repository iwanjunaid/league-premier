var async = require('async');
var fs = require('fs');
var path = require('path');

function Scraper(Driver) {
  this.Driver = Driver;
  this.session = new Driver({
    timeout: 60000
  });
  this.helpers = {};
};

module.exports = function(Driver) {
  return new Scraper(Driver);
};

Scraper.prototype.init = function(initCb) {
  var self = this;

  async.waterfall([
    function(cb) {
      fs.readdir('helpers', function(err, files) {
        files.forEach(function(file) {
            var module = require('./' + path.join('helpers', file))(self);
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
    name: 'epl',
    version: '1.0.0'
  };
};
