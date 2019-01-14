import React from 'react';
// Redux Saga
import  { connect } from 'react-redux';
// CSS
import classes from './Layout.module.css';
// JSX
import Menu from '../../../components/Users/Menu/Menu';

const layout = (props) => {
    console.log(props)
    return (
        <div className={classes.Container}>
            <Menu photoURL={props.userDetails.photoURL} />
            <div className={classes.ContentWrapper}>
                {props.children}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

export default connect(mapStateToProps)(layout);