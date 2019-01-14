import React from 'react';
// CSS
import classes from './InfoPoint.module.css';

const infoPoint = (props) => {
    let point;
    if (props.location) {
        point = (
            <button type='button' 
                aria-busy='false'
                className={classes.Link}>
                <span className={classes.SeoTool}>Location:</span>
                <span>{props.location}</span>
                <span className={classes.SeoTool}>Show on map</span>
            </button>
        );
    } else if (props.website) {
        // Parsing website url
        let url = [];
        switch (false) {
            case props.website.includes('http'):
                url = ['http://', props.website];
                break;
            case props.website.includes('https'):
                url = ['https://', props.website];
                break;
            default:
                url = props.website;
        }
        point = (
            <a type='button'
                href={url.join('')}
                target='_blank'
                rel="noopener noreferrer"
                className={classes.Link}>
                <span className={classes.SeoTool}>Website:</span>
                <span>Company website</span>
                <span className={classes.SeoTool}>{props.website}</span>
            </a>
        );
    } else {
        point = (
            <div className={classes.InfoContainer}>
                <span>{props.info ? props.info : 'No information found amongst props.'}</span>
            </div>
        );
    }
    return (
        <div className={classes.Container}>
            <div className={classes.IconWrapper}>
                <div className={classes.IconContainer}>
                    <span className={classes.Icon}>{props.symbol ? props.symbol : '?'}</span>
                </div>
            </div>
            <div className={classes.InfoWrapper}>
                {point}
            </div>
        </div>
    );
}

export default infoPoint;