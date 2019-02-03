import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return <Link className="marvel-navbar-link go-back" to={ "/" }>
    <div>Go Back</div>
  </Link>
}

export default Header