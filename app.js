const express =  require('express');
const app = express();
const routes = require('./routes')(app);
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
