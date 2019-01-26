import React from 'react';
// Logistics parsing
import { parseLogistic } from '../../../shared/parseLogistic';
// CSS
import classes from './InfoPoint.module.css';
// JSX
import SVG from '../../SVG/SVG';

const infoPoint = (props) => {
    let point;
    let icon;
    switch (true) {
        case props.location ? true : false:
            icon = <SVG svg='location-pin' />;
            point = (
                <button type='button' 
                    aria-busy='false'
                    className={classes.Link}>
                    <span className={classes.SeoTool}>Location:</span>
                    <span>{props.location}</span>
                    <span className={classes.SeoTool}>Show on map</span>
                </button>
            );
            break;
        case props.website ? true : false:
            // Parsing website url
            let url = [];
            icon = <SVG svg='website' />;
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
            break;
        case props.logistic ? true : false:
            icon = <SVG svg='delivery-truck' />;
            point = (
                <button type='button' 
                    aria-busy='false'
                    className={classes.Link}>
                    <span className={classes.SeoTool}>Location:</span>
                    <span>{parseLogistic(props.logistic)}</span>
                    <span className={classes.SeoTool}>Show on map</span>
                </button>
            );
            break;
        default:
            icon = <SVG svg='checkmark-nobg' width={'18px'} height={'18px'} />;
            point = (
                <div className={classes.InfoContainer}>
                    <span>{props.info}</span>
                </div>
            );
    }
    return (
        <div className={classes.Container}>
            <div className={classes.IconWrapper}>
                <div className={classes.IconContainer}>
                    <span className={classes.Icon}>{icon}</span>
                </div>
            </div>
            <div className={classes.InfoWrapper}>
                {point}
            </div>
        </div>
    );
}

export default infoPoint;