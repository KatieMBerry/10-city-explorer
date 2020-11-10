function getMungedGeo(geoData) {

    const firstItem = geoData[0];
    return {
        formatted_query: firstItem.display_name,
        latitude: firstItem.lat,
        longitude: firstItem.lon
    };
}

function getMungedWeather(weatherData) {

    const firstItem = weatherData.data[0];
    return {
        forecast: firstItem.weather.description,
        time: firstItem.ts,
    };
}

module.exports = {
    getMungedGeo,
    getMungedWeather
}; 