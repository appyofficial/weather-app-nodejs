const req = require('request');

const getForecast = (longitude, latitude, callback) => {
    const KEY;//YOUR DARKSKY API KEY HERE!!
    const endpoint = "https://api.darksky.net/forecast/";

    const URL = `${endpoint}${KEY}${longitude},${latitude}?units=si`;
    //Fetching forecast
    req({ url: URL, json: true }, (err, res) => {
        let { error, currently, daily } = res.body;
        if (err) {
            callback('Cant connect to web services', undefined);
        } else if (error) {
            callback('Something wrong, Try searching other location.', undefined);
        } else {
            callback(undefined, {
                currTemp: `${currently.temperature}c`,
                summary: daily.data[0].summary
            });
        }
    });
}

module.exports = { getForecast };