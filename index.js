const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

// Set SF Lightning Out Script
app.locals.sfLightningOutScript =
  process.env.SF_L_OUT_SCRIPT || 'https://mysfpal-dev-ed.my.salesforce.com/lightning/lightning.out.js';

// Set SF Lightning Out Domain
app.locals.sfDomain = process.env.SF_DOMAIN || 'https://mysfpal-dev-ed.my.salesforce.com';

app
  .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    next();
  })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', cors(), (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
