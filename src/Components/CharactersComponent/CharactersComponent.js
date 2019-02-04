import React from 'react'
import { Link } from 'react-router-dom'

const CharacterComponent = (props) => {
  return <Link className="char-component" to={`/character/${props.data.id}`} key={props.data.id}>
    <div className="hero-img-container">
      <div className="hero-img-container__wrap">
        <img className="hero-img-container__img" src={`${props.data.thumbnail.path}.jpg`} />
        <div className="hero-img-container__title-wrap">
          <div className="hero-img-container__hover"></div>
          <p className="hero-img-container__title">{props.data.name}</p>
        </div>
      </div>
    </div>
  </Link>
}

export default CharacterComponent
