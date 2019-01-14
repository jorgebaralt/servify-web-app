import React from 'react';

import classes from './AnimatedBar.module.css';

const animatedBar = (props) => {
    let wrapperClassName = [classes.AnimatedBarWrapper];
    if (props.wrapperClassName) {wrapperClassName.push(props.wrapperClassName);}
    let containerClassName = [classes.AnimatedBarContainer, classes.HorizontalBarContainer];
    if (props.vertical) {
        containerClassName = [classes.AnimatedBarContainer, classes.VerticalBarContainer];
    }
    let barStyle = {
        width: props.percentage
    };
    let animatedBarClasses = [classes.AnimatedBar, classes.HorizontalBar];
    if (props.vertical) {
        barStyle = {
            height: props.percentage    
        };
        animatedBarClasses = [classes.AnimatedBar, classes.VerticalBar];
    }
    return (
        <div className={wrapperClassName.join(' ')}>
            <div 
                style={{
                    width: props.width,
                    height: props.height
                }}
                className={containerClassName.join(' ')}>
                <span 
                    style={barStyle}
                    className={animatedBarClasses.join(' ')}></span>
            </div>
        </div>
    );
}

export default animatedBar;