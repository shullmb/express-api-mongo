require('dotenv').config()
const express = require('express');
const path = require('path');
const bp = require('body-parser');
const app = express();
// const fs = require('fs');
// const bikes = JSON.parse(fs.readFileSync('./data.json'));
const Bike = require('./models/bike');
const port = process.env.PORT || 3001


const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/express-api-mongo');

// Bike.collection.insert(bikes, function(err,data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: true }));

// test on root prior to collect.insert
app.get('/', (req,res) => {
  res.send('It worked')
})

// GET /bikes - index
app.get('/bikes', (req,res) => {
  Bike.find({}, function(err,bikes) {
    err ? console.log(err) : res.render('bikes/index', {bikes})
  })
})

// GET /bike/new - return form
app.get('/bikes/new', (req, res) => {
  res.render('bikes/new');
})

// POST /bikes - add new bike to data.json
app.post('/bikes', (req, res) => {
  Bike.create({
    brand: req.body.brand,
    model: req.body.model
  }, function(err,bike) {
    err ? console.log(err) : console.log(bike);
    res.redirect('/bikes');
  })
})

// GET /bikes/:id - show a specific bike
app.get('/bikes/:id', (req, res) => {
  Bike.findById(req.params.id, function(err,bike) {
    if (err) {
      console.log(err);
      res.send('That is not a valid bike model to show');
    } else {
      res.render('bikes/show', {bike});
    }
  })
})

// GET /bikes/:id/edit - get specific bike to update
app.get('/bikes/:id/edit', (req, res) => {
  Bike.findById(req.params.id, function (err, bike) {
    if (err) {
      console.log(err);
      res.send('That is not a valid bike model to show');
    } else {
      res.render('bikes/edit', {bike});
    }
  })
})

// PUT /bikes/:id - update a specific bike
app.put('/bikes/:id', function (req, res) {
  Bike.findByIdAndUpdate(req.params.id, {brand: req.body.brand, model: req.body.model}, function(err,bike) {
    err ? console.log(err) : res.sendStatus(200);
  })
})

// PUT /bikes/:id - update a specific bike
app.delete('/bikes/:id', function (req, res) {
  Bike.findByIdAndRemove(req.params.id, function (err) {
    err ? console.log(err) : res.sendStatus(200);
  })
})

app.listen(port, () => {
  console.log(`You're up and running on ${port}`)
})