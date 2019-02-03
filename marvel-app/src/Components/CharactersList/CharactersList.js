import React, { Component } from 'react'
import CharacterComponent from '../CharactersComponent/CharactersComponent'
import ShowMore from '../ShowMore/ShowMore'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import charApi from '../../api/characters-api'
import JSCookie from 'js-cookie'

const requestProps = {
  limit: 50
}

const mapStateToProps = state => {
  return {
    char: state.characters,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCharacters: () => {
      return charApi.getCharacters(requestProps).then((data) => {
        dispatch({type: actionTypes.GET_CHARACTERS, data: data.data.results})
      })
    },
  }
}

class CharactersList extends Component {
  state = {
    comicsData: [],
    isButtonLoading: false,
  }

  componentDidMount() {
    if (JSCookie.get('success')) {
      return this.props.char.length
        ? null
        : this.props.requestCharacters()
    }
    return this.props.history.push('/login')
  }

  render() {
    const incrementLimit = () => {
      this.setState(() => { return { isButtonLoading: true }})
      requestProps.limit = requestProps.limit + 20
      this.props.requestCharacters().then(() => { this.setState(() => { return { isButtonLoading: false }}) })
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
              <ShowMore loading={this.state.isButtonLoading}/>
            </div>
         </div>
        : 'loding'
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
