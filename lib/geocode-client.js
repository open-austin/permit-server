var request = require('request');

var GEOCODE_ENDPOINT = 'http://www.austintexas.gov/GIS/REST/Geocode/COA_Composite_Locator/GeocodeServer/findAddressCandidates';

function getAddressCandidates(addr) {
    var params = {
        uri: GEOCODE_ENDPOINT,
        qs: {
            street: addr,
            f: 'pjson'
        }
    };

    return request(params, function(err, res, body) {
        var result = null;
        if(!err && res.statusCode == 200) {
            result = { success: true, candidates: body };
        }
        else {
            result = { success: false };
        }
        return result;
    });
}

getAddressCandidates('4112 avenue D')
    .then(function(data) {
        console.log(data);
    });
