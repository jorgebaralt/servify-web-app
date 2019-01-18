import React, { Component } from 'react';
// redux-sagas
import { connect } from 'react-redux';
import { authCreator } from '../../../../../../store/actions';
// CSS
import classes from './UserAuthButton.module.css';
// JSX
import { Link } from 'react-router-dom';
import ImageFadeIn from '../../../../../UI/ImageFadeIn/ImageFadeIn';
import SVG from '../../../../../SVG/SVG';

class UserButton extends Component {
    state = {
        bIsListOpen: false
    }

    closeList = () => {
        if (this.state.bIsListOpen) {
            setTimeout( () => { // To force out of main stack and let toggleList take priority allowing toggling
                this.setState( () => {
                    return {
                        bIsListOpen: false
                    }
                });
            },0 );
        }
    }

    toggleList = () => {
        this.setState( (prevState) => {
            return {
                bIsListOpen: !prevState.bIsListOpen
            }
        });
    }

    logoutHandler = () => {
        this.props.onClick();
        this.props.onLogoutHandler();
    }

    componentDidMount() {
        document.body.addEventListener("click", this.closeList);
    }

    componentWillUnmount() {
        document.body.removeEventListener("click", this.closeList);
    }

    render () {
        const list = (
            <ul className={classes.ListWrapper}>
                <Link to="/users/show/">
                    <li onClick={this.props.onClick} className={classes.ListItem}>View Profile</li>
                </Link>
                <Link to="/users/publications">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Check Publications</li>
                </Link>
                <Link to="/users/edit">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Edit Profile</li>
                </Link>
                <Link to="/users/feedback">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Give us some feedback</li>
                </Link>
                <li onClick={this.props.onLogoutHandler} className={classes.ListItem}>Sign out</li>
            </ul>
        );
        const widescreen = (
            <li className={[this.props.className, classes.Anchor].join(' ')} >
                <button onClick={this.toggleList}>
                    {this.props.userDetails ? 
                        this.props.userDetails.photoURL ? 
                            <div className={classes.User}><ImageFadeIn draggable='false' src={this.props.userDetails.photoURL} /></div>
                            : <SVG svg='user' />
                        : <SVG svg='user' />}
                </button>
                {this.state.bIsListOpen ? 
                    list
                    : null}
            </li>
        );
        return (
            !this.props.width ? // Width is passed as a prop to determine breakpoint, if it's null it means the breakpoint was reached.
                list :
                widescreen
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogoutHandler: () => dispatch(authCreator.authLogoutInit()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserButton);