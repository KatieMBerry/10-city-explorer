require('dotenv').config();

const { getMungedGeo, getMungedWeather } = require('../data/utils');


describe('app routes', () => {
  describe('routes', () => {
    // let token;

    // beforeAll(async done => {
    //   execSync('npm run setup-db');

    //   client.connect();

    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });

    //   token = signInData.body.token;

    //   return done();
    // });

    // afterAll(done => {
    //   return client.end(done);
    // });

    test('returns a new location data structure', () => {

      const geoData = [{
        'place_id': '282983083',
        'licence': 'https://locationiq.com/attribution',
        'osm_type': 'relation',
        'osm_id': '186579',
        'boundingbox': [
          '45.432536',
          '45.6528812',
          '-122.8367489',
          '-122.4720252'
        ],
        'lat': '45.5202471',
        'lon': '-122.6741949',
        'display_name': 'Portland, Multnomah County, Oregon, USA',
        'class': 'place',
        'type': 'city',
        'importance': 0.75356571743377,
        'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
      }];

      const expectation = {
        formatted_query: geoData[0].display_name,
        latitude: geoData[0].lat,
        longitude: geoData[0].lon
      };

      const result = getMungedGeo(geoData);
      expect(result).toEqual(expectation);
    });

    test.only('returns a new weather output structure', () => {

      const weatherData = [
        {
          'moonrise_ts': 1604988223,
          'wind_cdir': 'SSE',
          'rh': 89,
          'pres': 1004.07,
          'high_temp': 20.6,
          'sunset_ts': 1605045728,
          'ozone': 234.281,
          'moon_phase': 0.163076,
          'wind_gust_spd': 6.6,
          'snow_depth': 0,
          'clouds': 42,
          'ts': 1604984460,
          'sunrise_ts': 1605008675,
          'app_min_temp': 11.1,
          'wind_spd': 1.45996,
          'pop': 20,
          'wind_cdir_full': 'south-southeast',
          'slp': 1021.7,
          'moon_phase_lunation': 0.86,
          'valid_date': '2020-11-10',
          'app_max_temp': 20.7,
          'vis': 17.7684,
          'dewpt': 14.4,
          'snow': 0,
          'uv': 3.40157,
          'weather': {
            'icon': 'c03d',
            'code': 803,
            'description': 'Broken clouds'
          },
          'wind_dir': 166,
          'max_dhi': null,
          'clouds_hi': 0,
          'precip': 0.125,
          'low_temp': 15.9,
          'max_temp': 21.1,
          'moonset_ts': 1605039139,
          'datetime': '2020-11-10',
          'temp': 16.5,
          'min_temp': 11,
          'clouds_mid': 0,
          'clouds_low': 42
        }];

      const expectation = {
        forecast: weatherData.weather.description,
        time: weatherData.datetime
      };

      const result = getMungedWeather(weatherData);
      expect(result).toEqual(expectation);
    });
  });
});
