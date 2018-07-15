import React from 'react';
import genres from './genres'
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this)
  }

  componentDidMount() {
    this.getGenres()
  }

  getGenres() {
    axios.get(`/genres`)
         .then((response) => {
           this.setState({
             genres: response.data.genres
           })
         })
         .catch((err) => {
           console.error(err)
         })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange = {this.props.switchGenre}>
          {this.state.genres.map((genre) => {
            return <option value = {genre.name} >{genre.name}</option>
          })}
        </select>
        <br/><br/>

        <button onClick = {this.props.search}>Search</button>

      </div>
    );
  }
}

export default Search;