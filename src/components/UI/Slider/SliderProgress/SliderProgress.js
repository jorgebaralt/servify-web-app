import React from 'react';
// CSS
import classes from './SliderProgress.module.css';

const sliderProgress = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <div style={{ width: [(props.activeSlide / props.totalSlides)*100,'%'].join('') }} className={classes.Bar} />
            </div>
        </div>
    );
}

export default sliderProgress;