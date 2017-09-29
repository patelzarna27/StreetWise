// Include Server Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongo = require('mongodb');
var path = require('path');


// Require Incident Schema
var Incident = require("./models/Incident");

// Create Instance of Express
var app = express();


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Import API routes
var apiRoutes = require("./routes/apiRoutes")
app.use('/', apiRoutes);

//Import HTML routes
require("./routes/htmlRoutes.js")(app);

// Sets an initial port. We'll use this later in our listener

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});


// Set PORT 

var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));


// MongoDB Configuration configuration
mongoose.connect("mongodb://heroku_k0np0cmx:3qq3fvv0henroq5u9eherfcls5@ds139904.mlab.com:39904/heroku_k0np0cmx");

var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// //Creates date and time variables
// var currentDate = moment().format("MM-DD-YYYY");
// var currentTime = moment().format("HH:mm");

//Creates a test incident schema in db

// var newIncident = new Incident({
//   HarassmentType: "sexual",
//   Latitude: 40.7282,
//   Longitude: -74.0776,
//   Date: currentDate,
//   Time: currentTime,
//   Description: "A man grabbed my butt"
// });

// newIncident.save(function(error, doc) {

//   if (error) {
//     console.log(error);
//   }

//   else {
//     console.log(doc);
//   }
// });


// ================== get route for MongoDB==========================

app.get("/api/incidents", function(req, res) {
  Incident.find().sort({DateTime: -1}, function(error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      res.send(doc);
    }
  });
});

// ==================================================================

// PORT Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
