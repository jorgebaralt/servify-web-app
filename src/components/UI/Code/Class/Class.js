import React from 'react';
import Typist from 'react-typist';

import classes from './Class.module.css';

const classComponent = (props) => {
    if (props.extends) {
        return (
        <div className={classes.ClassContainer}>
            <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
                <div className={classes.Class}>class <span>{props.name ? props.name : 'No props.name found.'}</span> extends <span>{props.extends}</span> {'{'} </div>
            </Typist>
            <div className={classes.ClassWrapper}>
                {props.children}
            </div>
            <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
                <div className={classes.Class}>{'}'}</div>
            </Typist>
        </div>
        );
    }
    return (
        <div className={classes.ClassContainer}>
            <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
                <div className={classes.Class}>class <span>{props.name ? props.name : 'No props.name found.'}</span> {'{'} </div>
            </Typist>
            <div className={classes.ClassWrapper}>
                {props.children}
            </div>
            <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
                <div className={classes.Class}>{'}'}</div>
            </Typist>
        </div>
    );
}

export default classComponent;