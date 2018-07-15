import React from 'react';
import genres from './genres'
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: genres.genres
    };
    this.getGenres = this.getGenres.bind(this)
  }

  componentDidMount() {
    this.getGenres()
  }

  getGenres() {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=a11656b42e2c59147e25c45a3f244c3a&language=en-US`)
         .then((response) => {
           this.setState({
             genres: response.genres
           })
         })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {this.state.genres.map((genre) => {
            return <option value = {genre.name}>{genre.name}</option>
          })}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;