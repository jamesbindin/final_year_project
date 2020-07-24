var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./app/routes/customer.routes.js')(app);
require('./app/routes/gpr.routes.js')(app);
var cors = require('cors');
app.use(cors());
app.use(cors({origin: 'NEEDS TO BE EDITED'}));
app.use(cors());

const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'home.html');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res) => res.sendFile(INDEX));
var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Listening on ${PORT}`);
});
