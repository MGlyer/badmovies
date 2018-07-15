var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
const APIKEY = require('./config').API_KEY
const axios = require('axios')
var database = require('./database')

var apiHelpers = require('./apiHelpers.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.post('/search', function(req, res) {
    let searchGenre = req.body.genre
    console.log('in the server! searching for: ', searchGenre)
    axios.get(`https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&with_genres=${searchGenre}&sort_by=popularity.asc&language=en-US&api_key=${APIKEY}`)
         .then((response) => {
             res.send(response.data)
         })
         .catch((err) => {
             console.error(err)
         })
});

app.get('/genres', function(req, res) {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`)
         .then((response) => {
             res.send(response.data)
         })
         .catch((err) => {
             console.error(err)
         })
});

app.post('/save', function(req, res) {
    let fave = req.body.newFave;
    database.saveFavorite(fave, (err) => {
        if (err) console.error(err)
        else res.send('saved to the DB!')
    })
    
});

app.post('/delete', function(req, res) {
    let target = req.body.toDel
    database.deleteFavorite([target], (err) => {
        if (err) console.error(err)
        else res.send('its been removed from the database')
    })
});

app.get('/favorites', function(req, res) {
    database.getAllFavorites((err, favorites) => {
        if (err) console.error(err)
        else res.send(favorites)
    })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
