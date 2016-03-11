var cheerio = require('cheerio');

function Standings(scraper) {
  this.name = 'standings';
  this.scraper = scraper;
};

function parse(data, cb) {
  $ = cheerio.load(data);
  var res = [];

  $('.standing-table__row').each(function(index, elm) {
    var row = {};

    $(this).children().each(function(chIndex, chElm) {
      if (chIndex === 0)
        row.pos = parseInt($(this).text().trim());
      else if (chIndex === 1)
        row.club = $(this).text().trim();
      else if (chIndex === 2)
        row.played = parseInt($(this).text().trim());
      else if (chIndex === 3)
        row.won = parseInt($(this).text().trim());
      else if (chIndex === 4)
        row.drawn = parseInt($(this).text().trim());
      else if (chIndex === 5)
        row.lost = parseInt($(this).text().trim());
      else if (chIndex === 6)
        row.goalsFor = parseInt($(this).text().trim());
      else if (chIndex === 7)
        row.goalsAgainst = parseInt($(this).text().trim());
      else if (chIndex === 8)
        row.goalDifference = parseInt($(this).text().trim());
      else if (chIndex === 9)
        row.points = parseInt($(this).text().trim());
    });

    res.push(row);
  });

  cb(null, res);
}

module.exports = function(scraper) {
  return new Standings(scraper);
};

Standings.prototype.full = function() {
  var self = this;

  return new Promise(function(resolve, reject) {
    var driver = self.scraper.session;

    driver.open('http://www.skysports.com/football/competitions/premier-league/table')
      .waitForSelector('table.standing-table__table')
      .html('table.standing-table__table tbody')
      .then(function(body) {
        parse(body, function(err, result) {
          if (!err) {
            resolve({driver: driver, data: result});
          }
          else {
            driver.close();
            reject(err);
          }
        });
      });
  });
};
