import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Form, FormGroup,
    FormFeedback, FormText, Label, Input } from 'reactstrap';
import { requestSignUp } from '../../reducers/auth/auth.act';
import './style.css';

const mapStateToProps = (state) => {
    return {...state.auth};
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: userData => requestSignUp(userData)(dispatch),
    };
}

class ConnectedSignup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.props.signup({...this.state});
    };

    render () {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />;
        }

        let errors = {...this.props.signupErrors};
        let requiredAsterisk = <font color="red">*</font>
        return (
            <Container className="signup-form-container">
                <center><h4><b>Sign Up</b></h4></center>

                <Form>
                    <FormGroup>
                        <Label for="username">Username{requiredAsterisk}</Label>
                        <Input type="text"
                            name="username"
                            id = "username"
                            placeholder="Username"
                            invalid={errors.username?true:false}
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, username: e.target.value});}}/>
                        <FormFeedback valid={!errors.username}>
                            {errors.username}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password{requiredAsterisk}</Label>
                        <Input type="password"
                            name="password"
                            id = "password"
                            placeholder="********"
                            invalid={errors.password?true:false}
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, password: e.target.value});}}/>
                        <FormText>Password must be at least 8 characters long.</FormText>
                        <FormFeedback valid={!errors.password}>
                            {errors.password}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email Address{requiredAsterisk}</Label>
                        <Input type="email"
                            name="email"
                            id = "email"
                            placeholder="username@iiitdmj.ac.in"
                            invalid={errors.email?true:false}
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, email: e.target.value});}}/>
                        <FormFeedback valid={!errors.email}>
                            {errors.email}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="first_name">First Name{requiredAsterisk}</Label>
                        <Input type="text"
                            name="first_name"
                            id = "first_name"
                            placeholder="Subhash"
                            invalid={errors.first_name?true:false}
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, first_name: e.target.value});}}/>
                        <FormFeedback valid={!errors.first_name}>
                            {errors.first_name}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="last_name">Last Name{requiredAsterisk}</Label>
                        <Input type="text"
                            name="last_name"
                            id = "last_name"
                            placeholder="Gupta"
                            invalid={errors.last_name?true:false}
                            onChange = {e => { e.preventDefault(); this.setState({...this.state, last_name: e.target.value});}}/>
                        <FormFeedback valid={!errors.last_name}>
                            {errors.last_name}
                        </FormFeedback>
                    </FormGroup>
                    <Button color="success" block onClick={this.handleSubmit}>Register</Button>

                </Form>
            </Container>
        );
    }
};

export const Signup = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignup);