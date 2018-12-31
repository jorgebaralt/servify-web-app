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
            <li>
                <ul className={classes.ListWrapper}>
                    <Link onClick={() => this.props.onClick()} to="/users/show">
                        <li className={classes.ListItem}>View Profile</li>
                    </Link>
                    <Link onClick={() => this.props.onClick()} to="/users/publications">
                        <li className={classes.ListItem}>Check Publications</li>
                    </Link>
                    <Link onClick={() => this.props.onClick()} to="/users/edit">
                        <li className={classes.ListItem}>Edit Profile</li>
                    </Link>
                    <Link onClick={() => this.props.onClick()} to="/users/settings">
                        <li className={classes.ListItem}>Account Settings</li>
                    </Link>
                    <Link onClick={() => this.props.onClick()} to="/users/invite">
                        <li className={classes.ListItem}>Invite Friends</li>
                    </Link>
                    <Link onClick={() => this.props.onClick()} to="/users/signout">
                        <li className={classes.ListItem}>Sign out</li>
                    </Link>
                </ul>
            </li>
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
        console.log(this.props)
        return (
            !this.props.width ? // Width is passed as a prop to determine breakpoint, if it's null it means the breakpoint was reached.
                list :
                widescreen
        );
    }
}

export default UserButton;