// ================== HTML ROUTES ==========================

var path = require('path');

module.exports = function(app) {

//get route for / returns index.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//get route for /reportincident returns the reportform.html
app.get('/reportincident', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/reportform.html'));
});

//get route for /reportincident returns the reportform.html
app.get('/viewincidents', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/incidents.html'));
});

};