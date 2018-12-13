import React, { Component } from 'react';
import { NavBar } from '../../components/navbar/navbar';
import { ContestsHome } from './views/contests/contests-home/contest-home';
import { Home } from './views/home/home';
import { Login } from './views/login/login';
import { Logout } from './views/logout/logout';
import { Signup } from './views/signup/signup';
import { Profile } from './views/profile/profile';
import { BrowserRouter, Route } from 'react-router-dom';
import { validateToken } from './indexwrapper.act';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
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
                <Route exact path="/contests" component={ContestsHome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/profile/:username" component={Profile} />
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