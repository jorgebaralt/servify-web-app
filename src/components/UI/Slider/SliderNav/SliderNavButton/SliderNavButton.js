import React from 'react';
// CSS
import classes from './SliderNavButton.module.css';

const sliderNavButton = (props) => {
    const buttonClasses = [classes.SliderNavButton];
    if (props.activeSlide === Number(props.slide)) {
        buttonClasses.push(classes.Active);
    }
    return (
        <button onClick={ () => props.onClick(null, props.slide) } className={buttonClasses.join(' ')} />
    );
}

export default sliderNavButton;