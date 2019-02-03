import React, { Component } from 'react'
import { connect } from 'react-redux';
import ComicsComponent from '../ComicsComponent/ComicsComponent'
import charApi from '../../api/characters-api'

const mapStateToProps = state => {
  return {
    char: state.characters
  };
};

class CharacterDetails extends Component {
  state = {
    characterData: {},
    charComics: [],
    requestProps : {
      limit: 10
    }
  }

  componentDidMount() {
    const findCharDetails = () => {
      const charArr = [...this.props.char]
      const charactersDetails = charArr.find((el) => { return el.id === parseInt(this.props.match.params.id) })
      return this.setState(() => { return { characterData: charactersDetails }})
    }

    const requestCharDetails = () => {
      charApi.getCharDetails(this.props.match.params.id, this.state.requestProps).then((data) => {
        this.setState(() => { return { characterData: data.data.results[0] }})
      })
    }

    const getComics = () => {

      return charApi.getCharComics(this.props.match.params.id, this.state.requestProps).then((data) => {
        return this.setState(() => { return { charComics: data.data.results }})
      })
    }

    getComics()
    return this.props.char.length ? findCharDetails() : requestCharDetails()
  }

  render() {
    const renderCharComics = () => {
      if (this.state.charComics) {
        return this.state.charComics.map((el) => {
          return <ComicsComponent key={el.id} data={el}/>
        })
      }
    }

    const characterDetails = () => {
      return <div className="char-details-container">
        <div className="char-details-container__wrapper">
          <div className="char-details-container__img-wrapper">
            <img className="char-details-container__img" src={ `${this.state.characterData.thumbnail.path}.jpg` }/>
          </div>
          <div className="char-details-container__descr-wrapper">
            <div className='char-details-container__name'>{ this.state.characterData.name }</div>
            <p className='char-details-container__descr'>{ this.state.characterData.description }</p>
          </div>
        </div>
        <div className='comics-component'>{ renderCharComics() }</div>
      </div>
    }
    return this.state.characterData.name ? characterDetails() : <div className='loading'>loading...</div>
  }
}


export default connect (mapStateToProps)(CharacterDetails)
