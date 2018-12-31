import React from 'react';
// Anon User Image
import anonUser from '../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './Menu.module.css';
// JSX
import { withRouter, NavLink } from 'react-router-dom';
import Panel from '../../UI/Panel/Panel';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const menu = (props) => {
    const profilePicture = (
        <div className={classes.ProfilePhoto}>
            <ImageFadeIn draggable={false} src={anonUser} />
        </div>
    )
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                {props.history.location.pathname === "/users/show" ? // Only render the profile picture if in the show page
                    profilePicture
                    : null }
                <Panel bold header='Account Menu'>
                    <ul className={classes.Nav}>
                        <NavLink to='/users/show' exact activeClassName={classes.Active} className={classes.NavLink}><span>View Profile</span></NavLink>
                        <NavLink to='/users/publications' exact activeClassName={classes.Active} className={classes.NavLink}><span>Check Publications</span></NavLink>
                        <NavLink to='/users/edit' exact activeClassName={classes.Active} className={classes.NavLink}><span>Edit Profile</span></NavLink>
                        <NavLink to='/users/settings' exact activeClassName={classes.Active} className={classes.NavLink}><span>Account Settings</span></NavLink>
                        <NavLink to='/users/invite' exact activeClassName={classes.Active} className={classes.NavLink}><span>Invite Friends</span></NavLink>
                        <NavLink to='/users/signout' exact activeClassName={classes.Active} className={classes.NavLink}><span>Sign out</span></NavLink>
                    </ul>
                </Panel>
            </div>
        </div>
    );
}

export default withRouter(menu);