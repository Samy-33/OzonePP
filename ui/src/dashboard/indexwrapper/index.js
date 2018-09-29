import React, { Component } from 'react';
import { NavBar } from '../../components/navbar';
import { Home } from '../home';
import { Login } from '../../components/login';
import { Logout } from '../../components/logout';
import { BrowserRouter, Route } from 'react-router-dom';
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
        return (                
            <BrowserRouter>
                <div className="application-container">
                    <NavBar />
                    <div className="index-body">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                    </div>
                    <div className="footer">
                        Made with love at IIITDMJ
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

export const Index = connect(mapStateToProps, mapDispatchToProps)(ConnectedIndex);