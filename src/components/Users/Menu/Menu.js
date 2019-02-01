import React from 'react';
// Redux Saga
import  { connect } from 'react-redux';
// Anon User Image
import anonUser from '../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './Menu.module.css';
// JSX
import { NavLink } from 'react-router-dom';
import Panel from '../../UI/Panel/Panel';
import ProfilePhoto from '../../Users/ProfilePhoto/ProfilePhoto';

const menu = (props) => {
    if (!props.userDetails) { return null; } // Protection
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <div className={classes.Photo}>
                    <ProfilePhoto src={props.userDetails.photoURL ? props.userDetails.photoURL : anonUser} />
                </div>
                <Panel bold header='Account Menu'>
                    <ul className={classes.Nav}>
                        <NavLink to='/users/show' exact activeClassName={classes.Active} className={classes.NavLink}><span>View Profile</span></NavLink>
                        <NavLink to='/users/publications' exact activeClassName={classes.Active} className={classes.NavLink}><span>Check Publications</span></NavLink>
                        <NavLink to='/users/edit' exact activeClassName={classes.Active} className={classes.NavLink}><span>Edit Profile</span></NavLink>
                        <NavLink to='/users/feedback' exact activeClassName={classes.Active} className={classes.NavLink}><span>Give us some feedback</span></NavLink>
                        <NavLink to='/users/signout' exact activeClassName={classes.Active} className={classes.NavLink}><span>Sign out</span></NavLink>
                    </ul>
                </Panel>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

export default connect(mapStateToProps)(menu);