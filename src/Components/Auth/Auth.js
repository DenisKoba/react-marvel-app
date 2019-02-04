import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import authApi from "../../api/auth-api";
import * as actionTypes from "../../store/actions";

let email = null
let password = null

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: () => {
      const data = {
        email: email,
        password: password,
        returnSecureToken: true,
      }

      return authApi.signUp(data).then((data) => {
        dispatch({type: actionTypes.SIGN_UP, data })
        return data
      }).catch((error) => {
        return error
      })
    },
    signIn: () => {
      const data = {
        email: email,
        password: password,
        returnSecureToken: true,
      }

      return authApi.signIn(data).then((data) => {
        dispatch({type: actionTypes.SIGN_UP, data })
        return data
      }).catch((error) => {
        return error
      })
    },
  }
}

class Auth extends Component {
  state = {
    email: '',
    password: '',
    signState: true,
    errorText: null,
    isSigningIn: false,
  }

  render() {
    const validateEmail = (email) => {
      return /^(([^а-яА-Яыъ<>()[\]\\.,;:\s@\"]+(\.[^а-яА-Яыъ<>()[\]\\.,;:\s@\"]+)*)|(\"[a-zA-Z\-0-9]+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    const validateForm = () => {
      if (!validateEmail(this.state.email)) {
        return this.setState(() => { return { errorText: 'Invalid email. Try another email.' }})
      } else if (this.state.password.length <= 7) {
        return this.setState(() => { return { errorText: 'Password should be at least 7 characters length' }})
      }

      return true
    }

    const resolveSignUp = () => {
      if (validateForm()) {
        this.setState(() => { return { isSigningIn: true }})
        this.props.signUp().then((data) => {
          this.setState(() => { return { isSigningIn: false }})
          if (data.idToken) {
            return this.props.history.push('/')
          }
          return this.setState(() => { return { errorText: 'Such email is already exists.' }})
        })
      }
    }

    const resolveSignIn = () => {
      if (validateForm()) {
        this.setState(() => { return { isSigningIn: true }})
        this.props.signIn().then((data) => {
          this.setState(() => { return { isSigningIn: false }})
          if (data.idToken) {
            return this.props.history.push('/')
          }

          return this.setState(() => { return { errorText: 'Invalid email. Try another email.' }})
        })
      }
    }

    const resolveEmail = (e) => {
      const target = e.currentTarget
      this.setState(() => { return { email: target.value }})
      return email = target.value
    }

    const resolvePassword = (e) => {
      const target = e.currentTarget
      this.setState(() => { return { password: target.value }})
      return password = target.value
    }

    const removeError = () => {
      return this.setState(() => { return { errorText: null }})
    }

    const changeSignState = () => {
      const loginInput = document.querySelectorAll('.js-input')
      loginInput.forEach((el) => {
        el.value = ''
      })
      this.setState(() => { return { errorText: '' }})
      return this.setState(() => { return { signState: !this.state.signState, password: null, email: null }})
    }

    const isSigningIn = () => {
      return this.state.isSigningIn ? <span>...Processing</span> : <span>Sign In</span>
    }

    const isSigningUp = () => {
      return this.state.isSigningIn ? <span>...Processing</span> : <span>Sign Up</span>
    }

    const signInMode = () => {
      return  <div className="login-button-wrapper">
                <button className="login-button-wrapper__button" onClick={ resolveSignIn }>{ isSigningIn() }</button>
                <div className="login-button-wrapper__text">Don't have an account?
                  <span onClick={ changeSignState }
                        className="login-button-wrapper__link"> Sign Up</span>
                </div>
              </div>
    }

    const signUpMode = () => {
      return  <div className="login-button-wrapper">
        <button className="login-button-wrapper__button" onClick={ resolveSignUp }>{ isSigningUp() }</button>
        <div onClick={ changeSignState } className="login-button-wrapper__text login-button-wrapper__link">Sign In</div>
      </div>
    }

    const resolveState = () => {
      return this.state.signState ? signInMode() : signUpMode()
    }

    return <div>
      <div className="login-form-wrapper">
        <div className="image-container"></div>
        <div className="login-container">
          <div className="login-container__form">
            <input className="login-container__input js-input" placeholder='email' onInput={ resolveEmail } onClick={removeError}/>
            <input className="login-container__input js-input" placeholder='password' onInput={ resolvePassword } onClick={removeError} type="password"/>
            { resolveState() }
            <div className="error-container">{ this.state.errorText } </div>
          </div>
        </div>
      </div>
    </div>
  }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Auth)
