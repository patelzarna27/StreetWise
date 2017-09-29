// -------------------------------------------------
// **API ROUTES FOR INCIDENTS STORED IN MONGODB**

// Require dependencies
var path = require('path');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise

//Import Incident schema
var Incident = require("../models/Incident");


// console.log('loaded api routes');

    //Post route that saves a new incident to the DB
      router.post('/postIncident', function(req, res) {

        var incidentData = new Incident(req.body);
          incidentData.save(function(error, doc) {
            if (error) {
              console.log(error);
            }

            else {
              console.log(doc);
              res.sendFile(path.join(__dirname, '../public', 'incidents.html'));
            }
          });
        });




        //Get route that grabs all incidents from the DB
        router.get('/api/incidents', function(req, res) {

            Incident.find().sort({DateTime: -1})
                .exec(function(err, doc) {

                    if (err) {
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                })
        });

        //Get route that searches for one specific incident by ID
        router.get('/search/:id', function(req, res) {

            Incident.find({ '_id': req.params.id })
                .exec(function(err, doc) {

                    if (err) {
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                })
        });


        //Delete route that removes an incident from the DB
        router.delete('/delete/incident/:id', function(req, res) {

            Incident.find({ '_id': req.params.id }).remove()
                .exec(function(err, doc) {
                    res.send(doc);
                });

        });

module.exports = router;

        
