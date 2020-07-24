module.exports = function(app) {
  var cors = require('cors');
  app.use(cors());
  var gpr = require('../controllers/gpr.controller');

  app.get('/gpr', gpr.getData);
  app.post('/gpr/:currencyPair', gpr.setData);
}
