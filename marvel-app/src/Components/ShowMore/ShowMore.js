import React from 'react'

const ShowMore = (props) => {
  const button = () => {
    return <div className="show-more-button-container__button"><span>Show More</span></div>
  }
  const buttonLoading = () => {
    return <div className="show-more-button-container__button"><span className="show-more-button-container__loading">Loading...</span></div>
  }
  const renderButton = () => {
    if (props.loading) {
      return buttonLoading()
    } else {
      return button()
    }
  }
  return <div className="show-more-button-container">{ renderButton() }</div>
}

export default ShowMore
