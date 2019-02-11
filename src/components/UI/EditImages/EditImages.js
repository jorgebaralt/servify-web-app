import React, { Component } from 'react';
// Images handler
import defaultImage from '../../../shared/defaultServiceImage';
import { setImagesArray, setImagesInfo } from '../../../shared/imagesHandler';
// CSS
import classes from './EditImages.module.css';
// JSX
import Image from '../../../components/UI/Image/Image';
import ImageFadeIn from '../../../components/UI/ImageFadeIn/ImageFadeIn';
import { Slider, Slide } from '../Slider';
import DragList, { setItems as setter } from '../DragList/DragList';

export const setItems = setter;

class EditImages extends Component {

    updateImages = (items) => {
        const newImages = [];
        items.forEach( (item) => {
            newImages.push(item.content.props.src);
        });
        const newImagesInfo = setImagesInfo(newImages, this.props.images);
        this.props.updateImages(newImagesInfo);
    }

    render() {
        const images = setImagesArray(this.props.images);
        const src = this.props.defaultImage ? this.props.defaultImage : defaultImage()
        let listImages;
        if (images.length > 0) {
            listImages = images.map((image, index) => {
                return (
                    this.props.fadeIn ? 
                        <ImageFadeIn key={index} draggable="false" src={image} /> 
                        : <Image key={index} draggable="false" src={image} />
                );
            });
        } else {
            listImages = [
                this.props.fadeIn ? 
                    <ImageFadeIn draggable="false" src={src} /> 
                    :  <Image draggable="false" src={src} />
            ];
        }
    
        const items = setItems(listImages);
    
        const imageSizes = {
            width: this.props.dimensions ? this.props.dimensions.width : null,
            height: this.props.dimensions ? this.props.dimensions.height : null,
        }
        const sideNavSizes = {
            width: this.props.dimensions ? this.props.dimensions.width/items.length*0.9 : null,
            height: this.props.dimensions ? this.props.dimensions.height/items.length*0.9 : null,
        }
        const slides = items.map( (item) => {
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
        if (this.props.direction === 'vertical') {
            containerClasses.push(classes.VerticalContainer);
            sliderContainerClasses.push(classes.VerticalSliderContainer);
        }
        return (
            <div 
                className={classes.Wrapper}>
                {this.props.title ?
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
                            height: this.props.dimensions ? this.props.dimensions.height : null,
                        }}
                        className={classes.Slider}>
                            <Slider disableNav>
                                {slides}
                            </Slider>
                        </div>
                    </div>
                    {/* Only render if there is more than 1 item. */}
                    {items.length > 1 ? 
                        <DragList 
                            className={classes.DraggableItem}
                            dimensions={sideNavSizes} 
                            direction={this.props.direction} 
                            updateItems={this.updateImages} 
                            items={items} />
                        : null
                    }
                </div>
                <div className={classes.Instructions}>
                    You can move the image thumbnails above 
                    {this.props.direction === 'horizontal' ? ' left or right ' : ' up or down '} 
                    to change the order on which the images will be displayed.
                    <span className={classes.MobileInstructions}>If on mobile, leave your finger on the thumbnail to change the position.</span>
                </div>
            </div>
        );
    }
}

export default EditImages;