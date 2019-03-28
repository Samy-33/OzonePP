import React from 'react'
import Routes from './routes'
import { validateToken } from './auth/actions'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Alert from 'react-s-alert'
import { Throbber } from './components/throbber/throbber'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import './App.css'

class App extends React.Component {
  componentDidMount = () => {
    this.props.validateToken()
  }

  render () {

    if(this.props.validatingToken) {
      return (
        <Throbber type="spin" color="#0000ff" text="Validating Session..."/>
      )
    }

    return (
      <React.Fragment>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Alert stack={{limit: 4}} effect="stackslide" position="bottom-right"/>
      </React.Fragment>
    )
  }
}
const mapStateToProps = ({auth}) => ({validatingToken: auth.validatingToken})
const mapDispatchToProps = { validateToken }

export default connect(mapStateToProps, mapDispatchToProps)(App)