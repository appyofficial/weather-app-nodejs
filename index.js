const geo = require("./utils/geo.js");
const forecast = require("./utils/forecast.js");

let location = process.argv[2];

!location ?
    console.log('Please provide a location!') :
    geo.geoCode(location, (err, data) => {
        let { location } = data;
        if (err) {
            return console.log(err);
        } else {
            forecast.getForecast(data.long, data.lat, (err, forecastData) => {
                if (err) {
                    return console.log(err);
                } else {
                    let { currTemp, summary } = forecastData;
                    console.log(location);
                    console.log(`Current tempreture is ${currTemp}`);
                    console.log(summary);
                }
            });
        }
    });