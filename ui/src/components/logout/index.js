import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestLogout } from '../../reducers/auth/auth.act';
import './style.css';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(requestLogout())
    }
}

class ConnectedLogout extends Component {
    
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = (event) => {
        event.preventDefault();
        this.props.logout();
    };

    render () {
        console.log(this.props.isLoggedIn);
        if(!this.props.isLoggedIn) return <Redirect to="/" />;

        return (
            <div className="logout-container">
                <h3><b>Are you sure about logging out?</b></h3>
                <br />
                <div style={{'float': 'right'}}>
                    <Button
                        color="success"
                        size="lg"
                        onClick={this.handleLogout}
                    >
                        Yes
                    </Button>
                    <Button color="danger" size="lg">Go Back</Button>
                </div>
            </div>
        );
    };
};

export const Logout = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogout);