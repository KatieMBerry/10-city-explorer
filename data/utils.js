function getMungedGeo(geoData) {

    return {
        formatted_query: geoData[0].display_name,
        latitude: geoData[0].lat,
        longitude: geoData[0].lon
    };
}

function getMungedWeather(weatherData) {
    return weatherData.data.map(item => {

        return {
            forecast: item.weather.description,
            time: item.datetime,
        };
    }).slice(0, 8);
}

module.exports = {
    getMungedGeo,
    getMungedWeather
};
