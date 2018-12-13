import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Alert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { requestRecentSubmissions, requestOngoingContests } from './contests-home.act';
import './style.css';

const mapStateToProps = state => {
    return {
        ...state.contests,
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestRecentSubmissions: () => requestRecentSubmissions()(dispatch),
        requestOngoingContests: () => requestOngoingContests()(dispatch)
    };
};

class ConnectedContestsHome extends Component {
    
    componentDidMount() {
        this.props.requestRecentSubmissions();
        this.props.requestOngoingContests();
    }

    render () {

        if(!this.props.isLoggedIn) return <Redirect to="/login" />;

        let userSubmissionHTML = <tr><td bgcolor="#ff6868" colSpan={3}>No data available</td></tr>;
        if(this.props.recentSubmissions !== null && this.props.recentSubmissions !== undefined && this.props.recentSubmissions.length > 0) {
            userSubmissionHTML = this.props.recentSubmissions.map(sub => {
                return (<tr key={sub.id}>
                    <td><Link to={`/profile/${sub.username}`}>{sub.username}</Link></td>
                    <td><Link to={`/contest/${sub.contest_code}/problem/${sub.problem_code}`}>{sub.problem_code}</Link></td>
                    <td>{sub.status}</td>
                </tr>);
            });
        }
        console.log(this.props.ongoingContests);
        let ongoingContestsHTML = <Alert color="danger">No Ongoing Contests.</Alert>
        if(this.props.ongoingContests && this.props.ongoingContests.length > 0) {
            ongoingContestsHTML = this.props.ongoingContests.map(contest => {
                return (
                    <p key={contest.id}>
                            <Link to={`/contest/${contest.code}`}>{contest.name}</Link>
                            <br />
                            {contest.start_time} - {contest.end_time}
                    </p>
                );
            });
        }

        return (
            <div className="contests-home">
                <Row>
                    <Col xs="3">
                        <div className="same-height-main-view left-submission-column">
                            <Table dark>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>problem</th>
                                        <th>verdict</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userSubmissionHTML}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col xs="9">
                        <div className="same-height-main-view right-ongoing-contests">
                            <center>
                                <h2> <u> <b> Ongoing Contests </b> </u></h2>
                                <br />
                                {ongoingContestsHTML}
                            </center>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export const ContestsHome = connect(mapStateToProps, mapDispatchToProps)(ConnectedContestsHome);