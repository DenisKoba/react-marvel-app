import React, { Component } from 'react'
import ComicsComponent from '../CharactersComponent/CharactersComponent'
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import charApi from '../api/characters-api'

const mapStateToProps = state => {
  return {
    char: state.characters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestCharacters: (name, age) => {
      charApi.getCharacters().then((data) => {
        dispatch({type: actionTypes.GET_CHARACTERS, data: data.data.results})
      })
    },
  }
};

class CharactersList extends Component {
  state = {
    comicsData: []
  }

  componentDidMount() {
    this.props.requestCharacters()
  }

  render() {
    const characters = () => {
      return this.props.characters.map(character => {
        return <ComicsComponent data={character}/>
      })
    }

    return this.props.characters ? <div className="characters-container">{ characters }</div> : 'loding'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
