const req = require('request');

const geoCode = (address, callback) => {
    //Key and endpoints
    const ENDPOINT = "https://api.mapbox.com/geocoding/v5/mapbox.places";
    const KEY; //YOUR MAPBOX API KEY HERE!!
    //Search term
    let searchTerm = encodeURIComponent(address);
    //URI
    let URI = `${ENDPOINT}/${searchTerm}.json?access_token=${KEY}&limit=1`;
    //request
    req({ url: URI, json: true }, (err, res) => {
        //destructuring
        const features = res.body.features[0];
        let { center, place_name } = features;

        if (err) { callback('Unable to connect to weather services.', undefined) }
        else if (res.body.features.length === 0) { callback('Try another location.', undefined) }
        else {
            callback(undefined, {
                long: center[1],
                lat: center[0],
                location: place_name
            });
        }
    });
}

module.exports = { geoCode };