import React, { Component } from 'react'
import axios from 'axios/index'

const KEY = 'ee36a79dfdfc1141f1ea1a48d75f9d39'
const BASE_URL = 'https://gateway.marvel.com'

class CharacterDetails extends Component {
  state = {
    characterData: []
  }

  componentDidMount() {
      axios.get(`${BASE_URL}/v1/public/characters/${this.props.match.params.id}?apikey=${KEY}`).then((data) => {
        this.setState({characterData: data.data.data.results})
      }).catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const characterDetails = () => {
      return <div>
        <img src={`${this.state.characterData[0].thumbnail.path}.jpg`}/>
        <div>{this.state.characterData[0].name}</div>
      </div>
    }
    return this.state.characterData[0] ? characterDetails() : <div>loading</div>
  }
}


export default CharacterDetails
