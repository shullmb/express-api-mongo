var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');


var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
// app.use(ejsLayouts);

// GET /bikes - returns all bikes
app.get('/bikes', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    res.render('bikes/index', {bikes});
})

// GET /bikes/new - returns a form to get info about new bike (CREATE)
app.get('/bikes/new', function(req,res) {
    res.render('bikes/new');
})

// POST /bikes - add new bike to data.json
app.post('/bikes', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    bikes.push({brand: req.body.brand, model: req.body.model})
    fs.writeFileSync('./data.json', JSON.stringify(bikes));
    res.redirect('/bikes');
})


// GET /bikes/:bike - show a specific bike
app.get('/bikes/:bike', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.bike;
    if (bike >= bikes.length) {
        res.send('That is not a valid bike model to show');
    } else {
        res.render('bikes/show', {bike: bikes[bike]});
    }
})

// GET /bikes/:bike/edit - get specific bike to update
app.get('/bikes/:bike/edit', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.bike;
    if (bike >= bikes.length) {
        res.send('That is not a valid bike model to update');
    } else {
        res.render('bikes/edit', {bike: bikes[bike], id: bike});
    }
})


// PUT /bikes/:bike - update a specific bike
app.put('/bikes/:bike', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.bike;
    if (bike >= bikes.length) {
        res.send('That is not a valid bike model to update');
    } else {
        bikes[bike] = {brand: req.body.brand, model: req.body.model};
        fs.writeFileSync('./data.json', JSON.stringify(bikes) );
        res.json(bikes);
    }
})

// DELETE /bikes/:bike
app.delete('/bikes/:bike', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.bike;
    if (bike >= bikes.length) {
        res.send('You cannot delete that which was never there...');
    } else {
        bikes.splice(bike,1);
        fs.writeFileSync('./data.json', JSON.stringify(bikes));
        res.json(bikes);
    }
});

app.listen(3000, function() {
    console.log('server running at 3000');
})


