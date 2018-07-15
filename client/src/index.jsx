import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios'
import genrelist from './components/genres'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
      currentGenre: 'Action'
    };
    
    // you might have to do something important here!
    this.swapGenre = this.swapGenre.bind(this)
    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
  }

  swapGenre(e) {
    e.preventDefault();
    console.log('changed genre to: ', e.target.value)
    this.setState({
      currentGenre: e.target.value
    })
  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    let searchID = this.state.currentGenre
    genrelist.genres.forEach((possableGenre) => {
      if (possableGenre.name === searchID) {
        searchID = possableGenre.id
      }
    })
    console.log(searchID)
    axios.post('/search', {genre: searchID})
         .then((response) => {
           console.log('from the server: ', response.data)
         })
         .catch((err) => {
           console.log('something went wrong: ', err)
         })
  }

  saveMovie(movie) {
    axios.post('/save', {newFave: movie})
          .then((response) => {
            console.log('from the server: ', response.data)
          })
          .catch((err) => {
            console.log('something went wrong: ', err)
          })
  }

  deleteMovie(movie) {
    axios.post('/delete', {toDel: movie})
          .then((response) => {
            console.log('from the server: ', response.data)
          })
          .catch((err) => {
            console.log('something went wrong: ', err)
          })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} switchGenre = {this.swapGenre} search = {this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));