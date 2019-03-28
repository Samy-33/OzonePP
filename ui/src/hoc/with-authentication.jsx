import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { LOGIN_ROUTE } from '../config/constants'
import Alert from 'react-s-alert'

export const withAuthenticationUnconnected = (WrappedComponent) => {
  return (props) => {
    const { userLoggedIn } = props
    if(userLoggedIn) return <WrappedComponent/>

    Alert.error('You need to log in to access the page.')
    return <Redirect to={LOGIN_ROUTE}/>
  }
}

const mapStateToProps = ({auth: {userLoggedIn}}) => ({userLoggedIn})

export const withAuthentication = compose(
  connect(mapStateToProps),
  withAuthenticationUnconnected
)