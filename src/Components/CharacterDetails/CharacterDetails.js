import React, { Component } from 'react'
import { connect } from 'react-redux';
import ComicsComponent from '../ComicsComponent/ComicsComponent'
import charApi from '../../api/characters-api'
import Preloader from '../Preloader/Preloader'

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
    },
    isLoading: false,
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
      this.setState(() => { return { isLoading: true }})
      return charApi.getCharComics(this.props.match.params.id, this.state.requestProps)
        .then((data) => {
        return this.setState(() => { return { charComics: data.data.results, isLoading: false }})
      })
        .finally(() => {
          this.setState(() => { return { isLoading: false }})
        })
    }

    getComics()
    return this.props.char.length ? findCharDetails() : requestCharDetails()
  }

  render() {
    const resolvePreloader = () => {
      return this.state.isLoading ? <Preloader /> : false
    }

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
        { resolvePreloader() }
      </div>
    }
    return this.state.characterData.name ? characterDetails() : <div className='loading'>loading...</div>
  }
}


export default connect (mapStateToProps)(CharacterDetails)
