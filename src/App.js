import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import MarvelComponent from './Components/MarvelComponent/MarvelComponent'

class App extends Component {

  render() {
      return (
        <BrowserRouter>
          <MarvelComponent />
        </BrowserRouter>
      )
  }
}

export default App;
