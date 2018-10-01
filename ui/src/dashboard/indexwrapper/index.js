import React, { Component } from 'react';
import { NavBar } from '../../components/navbar';
import { Home } from '../home';
import { Login } from '../login';
import { Logout } from '../logout';
import { Signup } from '../signup';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { validateToken } from '../../reducers/auth/auth.act';
import { connect } from 'react-redux';
import './style.css';

const mapStateToProps = (state) => {
    return {...state.auth};
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkToken: () => validateToken()(dispatch)
    };
}

class ConnectedIndex extends Component {

    componentDidMount () {
        if(!this.props.isLoggedIn) {
            this.props.checkToken();
        }
    }

    render () {

        let body = (
            <div className="index-body">
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/signup" component={Signup} />
            </div>
        );

        if(this.props.loginThrobber) {
            body = (
                <div className="login-throbber">
                    <ReactLoading type="spinningBubbles" color="#000"></ReactLoading>
                </div>
            );
        }

        return (                
            <BrowserRouter>
                <div className="application-container">
                    <NavBar />
                    {body}
                    <div className="footer">
                        Made with love at IIITDMJ
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

export const Index = connect(mapStateToProps, mapDispatchToProps)(ConnectedIndex);