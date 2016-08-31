var request = require('request');
var _ = require('lodash');

// REST url for geocoding api
var GEOCODE_ENDPOINT = 'http://www.austintexas.gov/GIS/REST/Geocode/COA_Composite_Locator/GeocodeServer/findAddressCandidates';

// local historical districts
var HIST_DIST_QUERY = 'http://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/PLANNINGCADASTRE_zoning_ordinance/FeatureServer/0/query';
var AIRPORT_ZONE_QUERY = '<todo>';

// Returns top N address for given address, ranked by score 0-100
// could also be done with a cutoff on scores
var RETURN_N_CANDIDATES = 10;

function getAddressCandidates(addr, callback) {
    var params = {
        uri: GEOCODE_ENDPOINT,
        qs: {
            street: addr,
            f: 'pjson'
        }
    };

    request(params, function(err, res, body) {
        var result = null;
        if(!err && res.statusCode == 200) {
            body = JSON.parse(body);
            var top = _.take(body.candidates, RETURN_N_CANDIDATES).map(function(candidate) {
              candidate.location.wkid = body.spatialReference.wkid;
              candidate.location.latestWkid = body.spatialReference.latestWkid;
              return candidate;
            });
            result = { success: true, candidates: top };
        }
        else {
            result = { success: false };
        }
        callback(err, result);
    });
}

var inHistoricalDistrict = checkZone(HIST_DIST_QUERY);
var inAirportZone = checkZone(AIRPORT_ZONE_QUERY);

function checkZone(uri) {
  return function(point, callback) {
    function anyObjectIds(body) {
      // return true if any objectIds are returned
      return body.objectIds && body.objectIds.length > 0;
    }

    var pointJson = JSON.stringify(point);
    var params = {
      uri: uri,
      qs: {
        where: 'OBJECTID <> 0',
        geometry: pointJson,
        geometryType: 'esriGeometryPoint',
        spatialRel: 'esriSpatialRelWithin',
        returnIdsOnly: 'true',
        f: 'pjson'
      }
    };
    request(params, function(err, res, body) {
      var result = false;
      if(!err && res.statusCode == 200) {
        body = JSON.parse(body);
        result = anyObjectIds(body);
      }
      callback(err, result);
    });
  }
}

module.exports = {
  getAddressCandidates: getAddressCandidates,
  inHistoricalDistrict: inHistoricalDistrict,
  inAirportZone: inAirportZone
};
