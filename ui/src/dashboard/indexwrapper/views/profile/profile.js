import React, { Component } from 'react';
import { requestUserDetails } from './profile.act';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {...state.user};
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: username => requestUserDetails(username)(dispatch)
    };
};

class ConnectedProfile extends Component {
    componentDidMount () {
        this.props.getUserDetail(this.props.match.params.username);
    }

    render () {
        return <h1>ProfileView</h1>;
    }
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);
