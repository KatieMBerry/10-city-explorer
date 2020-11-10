require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const { getMungedGeo } = require('../data/utils');
const app = require('../lib/app');
const client = require('../lib/client');

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

    test('returns a new location data structure', async () => {

      const geoData = {
        "place_id": "282983083",
        "licence": "https://locationiq.com/attribution",
        "osm_type": "relation",
        "osm_id": "186579",
        "boundingbox": [
          "45.432536",
          "45.6528812",
          "-122.8367489",
          "-122.4720252"
        ],
        "lat": "45.5202471",
        "lon": "-122.6741949",
        "display_name": "Portland, Multnomah County, Oregon, USA",
        "class": "place",
        "type": "city",
        "importance": 0.75356571743377,
        "icon": "https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png"
      }

      const expectation = {
        formatted_query: geoData[0].display_name,
        latitude: geoData[0].lat,
        longitude: geoData[0].lon
      };

      const result = getMungedGeo(geoData);
      expect(result).toEqual(expectation);
    });
  });
});