const express = require('express');
const app = express();

const zipdb = require('./zipData');

const PORT = process.env.PORT || 8000;


// console.log(zipdb.byCity);


app.get('/', (req, res) => {
  res.json({test: 'Yay'});
});


app.get('/zip/:zipcode', (req, res) => {
  // fill in...
  console.log(req.params.zipcode);

  const zipcode = req.params.zipcode;
  res.json(zipdb.byZip[zipcode]);
});


app.get('/city/:cityname', (req, res) => {
  // fill in...
  console.log(req.params.cityname);

  const cityname = req.params.cityname;
  res.json(zipdb.byCity[cityname]);
});


app.listen(PORT, () => {
  console.log(`zip-api is up and running on ${PORT}`);
});
