import React from 'react';
// CSS
import classes from './Toggle.module.css';
// JSX
import SVG from '../../../../components/SVG/SVG';

export const Toggle = (props) => {
    return (
        props.show ? 
            <div className={classes.ToggleWrapper}>
                <div onClick={props.onClick} className={classes.Toggle}>
                    <SVG svg='menu'/>
                </div> 
            </div>
            : null
    );
}

export const MenuToggle = (props) => {
    return (
        <div onClick={props.onClick} 
            className={[classes.Toggle, classes.MenuToggle].join(' ')}>
            <SVG svg='menu'/>
        </div>
    );
}