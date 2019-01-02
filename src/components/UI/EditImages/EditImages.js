import React from 'react';
// CSS
import classes from './EditImages.module.css';
// JSX
import { Slider, Slide } from '../Slider';
import DragList, { getItems } from '../DragList/DragList';

export const setItems = getItems;

const editImages = (props) => {
    const slides = props.items.map( (item) => {
        return (
            <Slide key={item.id}>
                {item.item}
            </Slide>
        );
    });
    const containerClasses = [classes.Container];
    const sliderContainerClasses = [classes.SliderContainer];
    if (props.direction === 'vertical') {
        containerClasses.push(classes.VerticalContainer);
        sliderContainerClasses.push(classes.VerticalSliderContainer);
    }
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Title}>
                <div>
                    Edit Pictures
                </div>
            </div>
            <div className={containerClasses.join(' ')}>
                <div className={sliderContainerClasses.join(' ')}>
                    <div className={classes.Slider}>
                        <Slider>
                            {slides}
                        </Slider>
                    </div>
                </div>
                <DragList direction={props.direction} updateItems={props.updateItems} items={props.items} />
            </div>
            <div className={classes.Instructions}>
                You can move the image thumbnails above 
                {props.direction === 'horizontal' ? ' left or right ' : ' up or down '} 
                to change the order on which they will be displayed.
            </div>
        </div>
    );
}

export default editImages;