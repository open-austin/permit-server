var request = require('request');
var _ = require('lodash');

// REST url for geocoding api
var GEOCODE_ENDPOINT = 'http://www.austintexas.gov/GIS/REST/Geocode/COA_Composite_Locator/GeocodeServer/findAddressCandidates';
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

getAddressCandidates('4112 avenue D',
    function(err, data) {
       console.log(data);
    });

module.exports = {
    getAddressCandidates: getAddressCandidates
};
