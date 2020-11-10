function getMungedGeo(geoData) {

    return {
        formatted_query: geoData[0].display_name,
        latitude: geoData[0].lat,
        longitude: geoData[0].lon
    };
}

function getMungedWeather(weatherData) {
    weatherData.data.map(item => {

        return {
            forecast: item[0].weather.description,
            time: item[0].ts,
        };
    }).slice(0, 8);
}

module.exports = {
    getMungedGeo,
    getMungedWeather
};