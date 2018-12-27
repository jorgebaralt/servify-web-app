import React from 'react';
// CSS
import classes from './SliderButtons.module.css'
const sliderButtons = (props) => {
    return (
        <>
            {/* Prev */}
            {props.activeSlide < 1 ? 
                null :
                <button className={classes.Prev} onClick={ () => props.onClick('prev') }></button>
            }
            {/* Next */}
            {props.activeSlide === props.totalSlides - 1 ? 
                null :
                <button className={classes.Next} onClick={ () => props.onClick('next') }></button>
            }
        </>
    )
}

export default sliderButtons;