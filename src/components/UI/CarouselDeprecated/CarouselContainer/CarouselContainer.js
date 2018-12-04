import React from 'react';
// CSS
import classes from './CarouselContainer.module.css';

const CarouselContainer = (props) => {
    console.log('props.sliding',props.sliding)
    let style = null;
    if (props.sliding) {
        style={transition: 'transform 1s ease', transform: 'translateX(0%)'};
    } else {
        style={transition: 'none', transform: 'translateX(calc(0% - 20px))'};
    }
    return (
        <div style={style} className={classes.CarouselContainer} >
            {props.children}
        </div>
    );
};

export default CarouselContainer;