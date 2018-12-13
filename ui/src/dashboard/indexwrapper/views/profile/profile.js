import React, { Component } from 'react';
import { requestUserDetails } from './profile.act';
import { connect } from 'react-redux';
import { Row, Col, Container, Table } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './style.css';

const mapStateToProps = state => {
    return {...state.user, isLoggedIn: state.auth.isLoggedIn};
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: username => requestUserDetails(username)(dispatch)
    };
};

class ConnectedProfile extends Component {
    componentDidMount () {
        console.log(this.props.match.params.username);
        this.props.getUserDetail(this.props.match.params.username);
    }
    
    render () {

        if(!this.props.isLoggedIn) return <Redirect to="/login" />;

        let userSubmissionsHTML = <tr><td bgcolor="#ff6868" colSpan={3}>No data available</td></tr>;
        if(this.props.submissionsData != null && this.props.submissionsData.length !== 0) {
            let userSubmissions = this.props.submissionsData.slice(0, 9);
            userSubmissionsHTML = userSubmissions.map(sub => {
                return (
                    <tr>
                        <td><Link to="/">{sub.problem_code}</Link></td>
                        <td>{sub.planguage}</td>
                        <td>{sub.verdict}</td>
                    </tr>
                );
            });
        }

        return (
            <Container fluid>
                <Row>
                    <Col xs="9">
                        <div className="top-profile-row-col main-profile-view">
                            <Container>
                                <Row>
                                    <Col xs="4" className="profile-dp-col">
                                        <img src={this.props.userData.dp_url} alt="Profile" height={350} width={350}/>
                                        <div>
                                        <b><h3 style={{"color": this.props.userData.color}}>{this.props.userData.username}</h3></b>
                                        {this.props.userData.full_name}<hr />
                                        <b>Rating: {this.props.userData.rating} <br />
                                        Contribution: {this.props.userData.contribution_rating} </b>
                                        <br /> {this.props.userData.intitute} {this.props.userData.country}
                                        </div>
                                    </Col>
                                    <Col xs="8" className="profile-extrainfo-col">
                                        hello
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col s="3">
                        <div className="top-profile-row-col side-submission-view">
                            <h5>Recent Submissions</h5>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Problem</th>
                                        <th>lang</th>
                                        <th>verdict</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userSubmissionsHTML}
                                </tbody>
                            </Table>
                        
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);
