import React from 'react'
import { Route } from 'react-router-dom'
import CharactersList from '../CharactersList/CharactersList'
import CharacterDetails from '../CharacterDetails/CharacterDetails'
import Header from '../Header/Header'
import Auth from '../Auth/Auth'

const MarvelComponent = (props) => {
  return <div>
    <Route path='/react-marvel-app/login' component={ Auth }/>
    <Route path='/react-marvel-app/' component={ Header }/>
    <Route path='/react-marvel-app/' exact  component={ CharactersList }/>
    <Route path='react-marvel-app//character/:id' component={ CharacterDetails }/>
  </div>
}

export default MarvelComponent
