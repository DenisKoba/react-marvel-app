import React, { Component } from 'react'
import CharactersList from '../CharactersList/CharactersList'
import CharacterDetails from '../CharacterDetails/CharacterDetails'
import { Route } from 'react-router-dom'

const MarvelComponent = (props) => {
  return <div>
    <Route path='/' exact  component={ CharactersList }/>
    <Route path='/:id' component={ CharacterDetails }/>
  </div>
}

export default MarvelComponent
