import React from 'react';
// CSS
import classes from './CarouselSlot.module.css';

const CarouselSlot = (props) => {
    return (
        <div order={props.order} className={classes.CarouselSlot} >
            {props.order}
            {props.children}
        </div>
    );
};

export default CarouselSlot;