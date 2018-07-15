const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  connection.query('SELECT * FROM `favorites`', (err, results) => {
    if (err) console.error(err)
    else {
      callback(null, results)
    }
  })
};

const saveFavorite = function(params, callback) {
  connection.query('INSERT INTO `favorites` (title, img, votes, date) VALUES (?, ?, ?)', params, (err, results) => {
    if (err) console.error(err)
    else callback(null)
  })
};

const deleteFavorites = function(params, callback) {
  connection.query('DELETE FROM `favorites` WHERE name = ?', params, (err, results) => {
    if (err) console.error(err)
    else callback(null)
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};