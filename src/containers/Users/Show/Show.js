import React, { Component } from 'react';
// CSS
import classes from './Show.module.css';
// JSX
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Separator from '../../../components/UI/Separator/Separator';
import SVG from '../../../components/SVG/SVG';

class Show extends Component {

    render () {
        return (
            <>
                <div className={classes.Title}>
                    <span>{['Hi, I\'m ', this.props.firstName, '!'].join('')}</span>
                </div>
                <div className={classes.JoinDate}>
                    Member since: <span>December 2018</span>
                </div>
            </>
        );
    }
}

export default Show;