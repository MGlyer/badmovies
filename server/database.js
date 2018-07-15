const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  connection.query('SELECT * FROM `movies`', (err, results) => {
    if (err) callback(err)
    else {
      callback(null, results)
    }
  })
};

const saveFavorite = function(movie, callback) {
  params = [movie.title, movie.poster_path, movie.vote_count, movie.release_date]
  connection.query('INSERT INTO `movies` (title, img, votes, date) VALUES (?, ?, ?, ?)', params, (err, results) => {
    if (err) callback(err)
    else callback(null)
  })
};

const deleteFavorite = function(name, callback) {
  connection.query('DELETE FROM `movies` WHERE title = ?', name, (err, results) => {
    if (err) callback(err)
    else callback(null)
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};