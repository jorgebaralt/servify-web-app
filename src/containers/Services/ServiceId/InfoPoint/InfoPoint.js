import React from 'react';
// CSS
import classes from './InfoPoint.module.css';

const infoPoint = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.IconWrapper}>
                <div className={classes.IconContainer}>
                    <span className={classes.Icon}>{props.symbol ? props.symbol : '?'}</span>
                </div>
            </div>
            <div className={classes.InfoWrapper}>
                {props.location ? 
                    <button type='button' 
                        aria-busy='false'
                        className={classes.LocationContainer}>
                        <span className={classes.SeoTool}>Location</span>
                        <span className={classes.Location}>{props.location}</span>
                        <span className={classes.SeoTool}>Show on map</span>
                    </button> :
                    <div className={classes.InfoContainer}>
                        <span>{props.info ? props.info : 'No information found amongst props.'}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default infoPoint;