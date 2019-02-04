import React, { Component } from 'react'

class ComicsComponent extends Component {
  state = {
    isActiveLimit: true,
  }

  render() {
    const toggleDescr = () => {
      this.setState(() => { return { isActiveLimit: !this.state.isActiveLimit }})
    }

    const renderComicsData = () => {
      if(this.props.data.description) {
        return this.state.isActiveLimit ? comicsShirtDescr() : comicsLongDescr()
      }
      return <p className="comics-wrapper__descr">No description found :-(</p>
  }

    const comicsLongDescr = () => {
      return <div>
        <p className="comics-wrapper__descr">{ this.props.data.description }</p>
        <p onClick={ toggleDescr } className="comics-wrapper__show-more">Show less</p>
      </div>
    }

    const comicsShirtDescr = () => {
      if (this.props.data.description.length > 100) {
        return <div>
          <p className="comics-wrapper__descr">{`${this.props.data.description.substring(0, 100)}...`}</p>
          <p onClick={ toggleDescr } className="comics-wrapper__show-more">Show more</p>
        </div>
      }
      return this.props.data.description
    }
    
    return <div className="comics-wrapper__container">
      <img className="comics-wrapper__img" src={`${this.props.data.thumbnail.path}.jpg`} />
      <div className="comics-wrapper__descr">{ renderComicsData() }</div>
    </div>
  }
}

export default ComicsComponent