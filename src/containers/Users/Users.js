import React, { Component } from 'react';
// Anon User Image
import anonUser from '../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './Users.module.css';
// JSX
import { NavLink } from 'react-router-dom';
import ImageFadeIn from '../../components/UI/ImageFadeIn/ImageFadeIn';

class Users extends Component {
    render () {
        return (
            <div className={classes.Container}>
                <div className={classes.MenuWrapper}>
                    <div className={classes.MenuContainer}>
                        <div className={classes.ProfilePhoto}>
                            <ImageFadeIn draggable={false} src={anonUser} />
                        </div>
                        <div className={classes.Panel}>
                            <div className={classes.PanelHeader}>
                                <span>Account Menu</span>
                            </div>
                            <div className={classes.PanelBody}>
                                <ul className={classes.MenuNav}>
                                    <NavLink activeClassName={classes.Active} className={classes.NavLink} to='/users/show'><span>Help</span></NavLink>
                                    <NavLink activeClassName={classes.Active} className={classes.NavLink} to='/users/publications'><span>Check Publications</span></NavLink>
                                    <NavLink activeClassName={classes.Active} className={classes.NavLink} to='/users/edit'><span>Edit Profile</span></NavLink>
                                    <NavLink activeClassName={classes.Active} className={classes.NavLink} to='/users/settings'><span>Account Settings</span></NavLink>
                                    <NavLink activeClassName={classes.Active} className={classes.NavLink} to='/users/invite'><span>Invite Friends</span></NavLink>
                                    <NavLink activeClassName={classes.Active} className={classes.NavLink} to='/users/signout'><span>Sign out</span></NavLink>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.ContentWrapper}>
                    <h1 className={classes.Title}>
                        Hi<span>{this.props.userFirstname ? [',I\'m ', this.props.userFirstname, "!"].join('') : '!'}</span>
                    </h1>
                    <div className={classes.JoinDate}>
                        Member since: <span>December 2018</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;