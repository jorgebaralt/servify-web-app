import React from 'react';
// CSS
import classes from './Content.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const Triangle = () => {
    return (
        <svg 
            className={classes.Triangle}
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" 
            y="0px" 
            width="24px" 
            height="24px" 
            viewBox="0 0 20 20" 
            style={{enableBackground: 'new 0 0 20 20'}}>
                <path fill="#FFFFFF" d="M0,0 20,0 10,10z"/>
                <path fill="transparent" stroke="#E6E6E6" d="M0,0 10,10 20,0"/>
        </svg>
    )
}

const content = (props) => {
    const wrapperClasses = [classes.Wrapper];
    if (props.className) {
        wrapperClasses.push(props.className);
    }
    return (
        <div tabIndex="1"
            ref={props.reference}
            onBlur={props.onBlur}
            className={wrapperClasses.join(' ')} 
            style={props.style}>
            <div className={classes.Container}>
                <button onClick={props.onClick} type='button' className={classes.Cancel}><SVG svg='cancel' /></button>
                <div className={classes.Content}>
                    {props.children}
                </div>
            </div>
            <Triangle />
        </div>
    );
}

export default content;