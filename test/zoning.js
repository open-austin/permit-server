var assert = require('assert');
var geo = require('../lib/geo');

describe('check zoning districts', function() {
  it('in historical district', function(done) {
    var testPoint = {
        wkid: 102739,
        latestWkid: 2277,
        x: 3117470.9974274226,
        y: 10084514.002250265
    };

    geo.inHistoricalDistrict(testPoint, function(err, isInHistoricalDistrict) {
      assert(!err);
      assert(isInHistoricalDistrict);
      done();
    });
  });

  it('not in historical district', function(done) {
    var testPoint = {
        wkid: 102739,
        latestWkid: 2277,
        x: 3117470.9974274226,
        y: 10066871.4393026
    };

    geo.inHistoricalDistrict(testPoint, function(err, isInHistoricalDistrict) {
      assert(!err);
      assert(!isInHistoricalDistrict);
      done();
    });
  });
});

describe('geolocation', function() {
  it('get address candidates', function(done) {
    geo.getAddressCandidates('4112 avenue D', function(err, response) {
      assert(!err);
      assert(response.success);
      assert(response.candidates.length);
      done();
    });
  });
});

describe('full checks', function() {
  it('get address candidates and check historical district', function(done) {
    geo.getAddressCandidates('4112 avenue D', function(err, response) {
      assert(!err);

      // take top
      geo.inHistoricalDistrict(response.candidates[0].location, function(err, isInHistoricalDistrict) {
        assert(!err);
        assert(isInHistoricalDistrict);
        done();
      });
    });
  });
});
