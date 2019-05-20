// main Require
var express = require('express');
var app = express();
var http = require('http').Server(app);
var session = require("express-session");

var bodyParser = require('body-parser');
var cors = require('cors');
var engine = require('consolidate');

// User Require
var jConfig = require('./serverConfig.json');

var sessionMiddleware  = session({
	secret: "my-secret",
    resave: true,
    saveUninitialized: true
});

app.use(sessionMiddleware);


// CORS 설정 cross 문제 해결 ajax
app.use(cors());

// ejs init
app.set('views', __dirname + '/Views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


http.listen(jConfig.port, function(){
    console.log('listening on http://' + jConfig.host + ':' + jConfig.port);
});
  
// css, js, img 정적파일
app.use('/', express.static('public'));
  