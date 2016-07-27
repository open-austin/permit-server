var request = require('request');
var _ = require('lodash');

// REST url for geocoding api
var GEOCODE_ENDPOINT = 'http://www.austintexas.gov/GIS/REST/Geocode/COA_Composite_Locator/GeocodeServer/findAddressCandidates';

// local historical districts
var HIST_DIST_QUERY = 'http://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/PLANNINGCADASTRE_zoning_ordinance/FeatureServer/0/query';
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
            var top = _.take(body.candidates, RETURN_N_CANDIDATES);
            result = { success: true, candidates: top};
        }
        else {
            result = { success: false };
        }
        callback(err, result);
    });
}

function inHistoricalDistrict(point, callback) {
    function anyObjectIds(body) {
        // return true if any objectIds are returned
        return body.objectIds.length > 0;
    }

    var pointJson = JSON.stringify(point);
    var params = {
        uri: HIST_DIST_QUERY,
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

module.exports = {
    getAddressCandidates: getAddressCandidates
};

/////////////////////////////////////////////////////////////////////
/// TEST CODE

getAddressCandidates('4112 avenue D',
    function(err, data) {
       //console.log(data);
    });

// this point should be in hist dist
var testPoint = {
    wkid: 102739,
    latestWkid: 2277,
    x: 3117470.9974274226,
    y: 10084514.002250265
};

// this point should not be in hist dist
var testPoint = {
    wkid: 102739,
    latestWkid: 2277,
    x: 3117470.9974274226,
    y: 10066871.4393026
};

inHistoricalDistrict(testPoint, function(err, data) {
    console.log(data);
});
