import React, { Component } from 'react';
// redux-saga, react-router-dom and axios
import { withRouter } from 'react-router-dom';
import  { connect } from 'react-redux';
// JSX
import User from './User/User';
import UsersId from './UsersId/UsersId';

class Show extends Component {
    render () {
        if (!this.props.match.params.id) {
            return (
                <User />
            )
        }
        return (
            <UsersId />
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

export default withRouter(connect(mapStateToProps)(Show));