const express = require('express');
const cors = require('cors');
const app = express();
const request = require('superagent');
const geoData = require('../data/geo.json');
const PORT = process.env.PORT || 3000;
const { getMunge } = require('../data/utils.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/location', async (req, res) => {
  try {
    const mungedData = getMunge(geoData);

    // const response = await request.get(geoData);
    // const newResponse = mungedData(response.body);

    res.json(mungedData);

  } catch (e) {
    res.json({ error: e.message });
  }

});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${PORT}`);
});





app.use(require('./middleware/error'));

module.exports = app;
