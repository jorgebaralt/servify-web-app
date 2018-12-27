import React from 'react';
// CSS
import classes from './SliderNav.module.css';
// JSX
import SliderNavButton from './SliderNavButton/SliderNavButton';

const sliderNav = (props) => {
    const sliderNavButtons = props.slides.map( slide => {
        return (
            <SliderNavButton
                key={slide}
                activeSlide={props.activeSlide}
                slide={slide}
                onClick={props.onClick} />
        );
    });
    return (
        <div className={classes.SliderNavWrapper}>
            {sliderNavButtons}
        </div>
    );
}

export default sliderNav;