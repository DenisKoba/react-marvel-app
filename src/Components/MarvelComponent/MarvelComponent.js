import React from 'react'
import { Route } from 'react-router-dom'
import CharactersList from '../CharactersList/CharactersList'
import CharacterDetails from '../CharacterDetails/CharacterDetails'
import Header from '../Header/Header'
import Auth from '../Auth/Auth'

const MarvelComponent = (props) => {
  return <div>
    <Route path='/login' component={ Auth }/>
    <Route path='/' component={ Header }/>
    <Route path='/' exact  component={ CharactersList }/>
    <Route path='/character/:id' component={ CharacterDetails }/>
  </div>
}

export default MarvelComponent
