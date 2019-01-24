import React, { Component } from 'react';
// CSS
import classes from './ProgressRing.module.css';
// JSX
import SVG from '../../SVG/SVG';

export const average = arr => {
    if (!arr) { return 0; } // Protection
    return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
};

class ProgressRing extends Component {
    constructor(props) {
        super(props);
        const { radius, stroke } = props;
        this.normalizedRadius = (radius - stroke) * 2;
        this.circumference = this.normalizedRadius * 2 * Math.PI;
    }

    render() {
        // If the progress is 0 then it will be returned as null
        if (!this.props.radius || !this.props.stroke) { return null; }
        const containerClasses = [classes.FadeIn, classes.Container];
        const { radius, stroke } = this.props;
        let progress = this.props.progress;
        if (isNaN(progress)) {
            progress = 0;
        }
        if (!progress) { 
            containerClasses.push(classes.Hidden);
        } else if (progress === 100) {

        }
        // const strokeDashoffset = this.circumference - this.props.progress / 100 * this.circumference;
        const strokeDashoffset = this.circumference * (1 - progress/100);
        return (
            <div className={containerClasses.join(' ')}>
                <svg 
                    className={classes.Ring}
                    height={radius * 2}
                    width={radius * 2} >
                    <circle className={classes.Circle} cx="50%" cy="50%" r={ this.normalizedRadius } fill="none" stroke="#e6e6e6" strokeWidth={ stroke } />
                    <circle className={classes.Circle}
                        cx="50%" 
                        cy="50%" 
                        r={ this.normalizedRadius } 
                        fill="none" 
                        stroke={progress === 100 ? "#09e20f" : "#ff7043"} 
                        strokeWidth={ stroke } 
                        strokeDasharray={[this.circumference, this.circumference].join(' ')}
                        strokeDashoffset={strokeDashoffset} />
                </svg>
                { progress !== 100 ? 
                    <span className={classes.Indicator}>
                        <span className={classes.Progress}>
                            {Math.round(progress)}<span className={classes.Icon}>%</span>
                        </span>
                    </span>
                    : (
                        <span className={classes.Checkmark}>
                            <SVG 
                                fill="#09e20f"
                                width="48px"
                                height="48px"
                                svg='checkmark-nobg' />
                        </span>
                    )}
            </div>
        );
    }
}

export default ProgressRing;