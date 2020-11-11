require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('superagent');
// const geoData = require('../data/geo.json');
// const weatherData = require('../data/weather.json');
const { getMungedGeo, getMungedWeather } = require('../data/utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/location', async (req, res) => {

  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_KEY}&q=${req.query.search}&format=json`;
    const response = await request.get(URL);
    const newResponse = getMungedGeo(response.body);
    res.json(newResponse);

  } catch (e) {
    res.json({ error: e.message });
  }
});

// app.get('/location', async (req, res) => {
//   try {
//     const mungedData = getMungedGeo(geoData);//:location?search=${req.params.location}
//     res.json(mungedData);

//   } catch (e) {
//     res.json({ error: e.message });
//   }
// });

app.get('/weather', async (req, res) => {

  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const response = await request.get(URL);
    const newResponse = getMungedWeather(response.body);

    res.json(newResponse);

  } catch (e) {
    res.json({ error: e.message });
  }

});


app.use(require('./middleware/error'));

module.exports = app;
