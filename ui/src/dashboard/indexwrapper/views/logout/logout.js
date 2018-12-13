import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestLogout } from './logout.act';
import './style.css';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => requestLogout()(dispatch)
    };
};

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
        if(!this.props.isLoggedIn) return <Redirect to="/" />;

        return (
            <div className="logout-container">
                <h3><b>Are you sure about logging out?</b></h3>
                <br />
                <Row>
                    <Col>
                        <Button
                            className="logout-button"
                            color="success"
                            size="lg"
                            onClick={this.handleLogout}
                        >
                            Yes
                        </Button>
                    </Col>
                    <Col>
                        <Link to="/">
                            <Button className="logout-button"
                                    color="danger"
                                    size="lg">
                                Take me home
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    };
};

export const Logout = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogout);