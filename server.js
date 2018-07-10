require('dotenv').config()
const express = require('express');
const path = require('path');
const bp = require('body-parser');
const app = express();
const fs = require('fs');
const bikes = JSON.parse(fs.readFileSync('./data.json'));
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

app.get('/', (req,res) => {
  res.send(bikes)
})


app.listen(port, () => {
  console.log(`You're up and running on ${port}`)
})