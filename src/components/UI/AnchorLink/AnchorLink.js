import React from 'react'
// CSS
import classes from './AnchorLink.module.css';
// JSX
import { Link } from 'react-router-dom';
import SVG from '../../SVG/SVG';

const anchorLink = (props) => {
    return (
        <div className={classes.Wrapper}>
            <Link to={props.href} type="button" className={classes.AnchorLink}>
                <span style={props.color ? {color: props.color} :  {color: "rgb(255, 112, 67)"} } className={classes.Text}>{props.text}</span>
                <span style={{display: 'inline'}}>
                    <SVG fill={props.fill ? props.fill : 'rgb(255, 112, 67)'} svg='right-arrow' />
                </span>
            </Link>
        </div>
    );
};

export default anchorLink;