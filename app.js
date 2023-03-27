var express =require('express');
var cors = require('cors');
var Bodyparser = require('body-parser');
var db = require('./lib/db/db');
var operation =require('./lib/operation/operation');



var app = express();
app.use(Bodyparser.urlencoded({extended:true}));
app.use(Bodyparser.json());
app.use(cors());

app.post('/api/login',operation.login);
app.post('/api/signup', operation.signup);
app.get('/api/user', operation.GetUsers);
app.post('/api/sendMessage', operation.sendMessage);
app.post('/api/GetChat', operation.Getchat)

app.listen(3000);
