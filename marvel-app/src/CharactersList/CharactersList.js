import React, { Component } from 'react'
import CharacterComponent from '../CharactersComponent/CharactersComponent'
import ShowMore from '../ShowMore/ShowMore'
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import charApi from '../api/characters-api'

const requestProps = {
  limit: 50
}

const mapStateToProps = state => {
  return {
    char: state.characters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCharacters: () => {
      charApi.getCharacters(requestProps).then((data) => {
        dispatch({type: actionTypes.GET_CHARACTERS, data: data.data.results})
      })
    },
  }
}

class CharactersList extends Component {
  state = {
    comicsData: [],
  }

  componentDidMount() {
    return this.props.char.length ? null : this.props.requestCharacters()
  }

  render() {
    const incrementLimit = () => {
      requestProps.limit = requestProps.limit + 20
      this.props.requestCharacters()
    }

    const characters = () => {
      return this.props.char.map(character => {
        return <CharacterComponent key={character.id} data={character}/>
      })
    }

    return (
      this.props.char
        ? <div>
            <div className="characters-container">{ characters() }</div>
            <div onClick={ incrementLimit }>
              <ShowMore />
            </div>
         </div>
        : 'loding'
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
