import React from 'react';
// CSS
import classes from './EditImages.module.css';
// JSX
import { Slider, Slide } from '../Slider';
import DragList, { getItems } from '../DragList/DragList';

export const setItems = getItems;

const editImages = (props) => {
    if (!props.items) { return null; } // Pointer protection
    const imageSizes = {
        width: props.dimensions ? props.dimensions.width : null,
        height: props.dimensions ? props.dimensions.height : null,
    }
    const sideNavSizes = {
        width: props.dimensions ? props.dimensions.width/props.items.length*0.9 : null,
        height: props.dimensions ? props.dimensions.height/props.items.length*0.9 : null,
    }
    const slides = props.items.map( (item) => {
        return (
            <Slide key={item.id}>
                <div style={imageSizes}>
                    {item.item}
                </div>
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
        <div 
        className={classes.Wrapper}>
            {props.title ?
                <div className={classes.Title}>
                    <div>
                        Edit Pictures
                    </div>
                </div>
                : null
            }
            <div className={containerClasses.join(' ')}>
                <div className={sliderContainerClasses.join(' ')}>
                    <div 
                    style={{
                        height: props.dimensions ? props.dimensions.height : null,
                    }}
                    className={classes.Slider}>
                        <Slider disableNav>
                            {slides}
                        </Slider>
                    </div>
                </div>
                {props.items.length > 1 ? 
                    <DragList dimensions={sideNavSizes} direction={props.direction} updateItems={props.updateItems} items={props.items} />
                    : null
                }
            </div>
            <div className={classes.Instructions}>
                You can move the image thumbnails above 
                {props.direction === 'horizontal' ? ' left or right ' : ' up or down '} 
                to change the order on which the images will be displayed.
                <span className={classes.MobileInstructions}>If on mobile, leave your finger on the thumbnail to change the position.</span>
            </div>
        </div>
    );
}

export default editImages;