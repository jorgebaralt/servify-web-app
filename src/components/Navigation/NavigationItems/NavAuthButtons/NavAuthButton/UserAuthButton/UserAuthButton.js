import React, { Component } from 'react';
// CSS
import classes from './UserAuthButton.module.css';
// JSX
import { Link } from 'react-router-dom';
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

    componentDidMount() {
        document.body.addEventListener("click", this.closeList);
    }

    componentWillUnmount() {
        document.body.removeEventListener("click", this.closeList);
    }

    render () {
        const list = (
            <ul className={classes.ListWrapper}>
                <Link to="/users/show">
                    <li onClick={this.props.onClick} className={classes.ListItem}>View Profile</li>
                </Link>
                <Link to="/users/publications">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Check Publications</li>
                </Link>
                <Link to="/users/edit">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Edit Profile</li>
                </Link>
                <Link to="/users/settings">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Give us some feedback</li>
                </Link>
                <Link to="/users/signout">
                    <li onClick={this.props.onClick} className={classes.ListItem}>Sign out</li>
                </Link>
            </ul>
        );
        const widescreen = (
            <li className={[this.props.className, classes.Anchor].join(' ')} >
                <button onClick={this.toggleList}>
                    <SVG svg='user' />
                </button>
                {this.state.bIsListOpen ? 
                    list
                    : null}
            </li>
        )
        return (
            !this.props.width ? // Width is passed as a prop to determine breakpoint, if it's null it means the breakpoint was reached.
                list :
                widescreen
        );
    }
}

export default UserButton;