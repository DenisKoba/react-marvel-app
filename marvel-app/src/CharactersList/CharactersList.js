import React, { Component } from 'react'
import ComicsComponent from '../CharactersComponent/CharactersComponent'
import axios from 'axios/index'

const KEY = 'ee36a79dfdfc1141f1ea1a48d75f9d39'
const BASE_URL = 'https://gateway.marvel.com'

class CharactersList extends Component {
  state = {
    comicsData: []
  }

  componentDidMount() {
      axios.get(`${BASE_URL}/v1/public/characters?limit=50&apikey=${KEY}`).then((data) => {
        this.setState({ comicsData: data.data.data.results })
      }).catch(function (error) {
        console.log(error);
      })
  }
  render() {
    const characters = this.state.comicsData.map(character => {
      return <ComicsComponent data={character}/>
    })
    return (
      <div className="characters-container">{characters}</div>
    );
  }
}

export default CharactersList;
