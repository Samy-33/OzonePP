import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { requestLogin } from '../../reducers/auth/auth.act';
import ReactLoading from 'react-loading';
import './style.css';

const mapStateToProps = (state) => {
    return {...state.auth};
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: credentials => requestLogin(credentials)(dispatch),
    };
}

class ConnectedLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            invalidLoginFlag: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.props.login({...this.state});
    };

    render () {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />;
        }

        if(this.props.loginThrobber) {
            return (
                <div className="login-throbber">
                    <ReactLoading type="spinningBubbles" color="#000"></ReactLoading>
                </div>
            );
        }

        return (
            <Container className="login-form-container">
                <center><h4><b>Login</b></h4></center>

                <Form>
                    <FormFeedback>
                        Invalid Credentials
                    </FormFeedback>
                    <FormGroup>
                        <Label  for="username">Username</Label>
                        <Input type="text"
                            name="username"
                            id = "username"
                            placeholder="Username"
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, username: e.target.value});}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password"
                            name="password"
                            id = "password"
                            placeholder="********"
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, password: e.target.value});}}/>
                    </FormGroup>
                    <Button color="success" block onClick={this.handleSubmit}>Login</Button>

                </Form>
            </Container>
        );
    }
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);