describe('Scraping Premier League', function() {
  before(function(done) {
    scraper.init(function() {
      done();
    });
  });

  describe('Check scraper', function() {
      it('should returns proper info', function(done) {
        var info = scraper.info();

        assert.equal('premier', info.name);
        assert.equal('1.0.1', info.apiVersion);
        assert.equal('Premier League', info.label);
        done();
      });
  });

  describe('Standings', function() {
    describe('Full', function() {
      var result = null;

      before(function(done) {
        scraper.helpers.standings.full().then(function(res) {
          result = res;
          res.driver.close();
          done();
        }).catch(function(err) {
          done(err);
        });
      });

      it('should returns an array and non-empty array', function(done) {
        assert.notEqual(0, result.data.length);
        assert.equal(true, Array.isArray(result.data));
        done();
      });

      it('should has "pos", "club", "played", "won", "drawn", "lost", "goalsFor", "goalsAgainst", "goalDifference", "points" properties', function(done) {
        assert.equal(true, result.data[0].hasOwnProperty('pos'));
        done();
      });
    });
  });
});
