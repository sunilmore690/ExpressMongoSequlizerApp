var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var users = require("./routes/users");

var app = express();

let router = require('./routes/map')(app)
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//routes define
require('./routes/index')(router)
require('./routes/users')(router)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(" Route Not Found");
  err.status = 404;
  return res.status(err.status || 500).json(err.message);
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof err === "number") {
    err = {
      status: err,
      errors: ["An error has occurred..."]
    };
  }
  if (err.message && err.name && typeof err === "object") {
    var errors = [];
    console.log
    switch (err.name) {
      case "ValidationError":

        Object.keys(err.errors).forEach(val => {
          errors.push(err.errors[val].message); 
        });
        break;

      case "CastError":
        errors.push(err.message);
        break;

      default:
        errors.push(err.message);
    }
    err = {
      status: err.status || 500,
      errors: errors
    };
  }
  return res.status(err.status || 500).json(err);
});

module.exports = app;
