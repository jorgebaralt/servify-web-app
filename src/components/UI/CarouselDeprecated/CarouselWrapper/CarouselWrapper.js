import React from 'react';
// CSS
import classes from './CarouselWrapper.module.css';

const CarouselWrapper = (props) => {
    return (
        <div className={classes.CarouselWrapper} >
            {props.children}
        </div>
    );
};

export default CarouselWrapper;