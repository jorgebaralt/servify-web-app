import React from 'react';
// CSS
import classes from './HeaderImage.module.css'
// JSX
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const headerImage = (props) => {
    return (
        // TODO Make a new li element that renders when image is loaded to trigger fade in animation
        <li  
            className={[classes.HeaderImage, classes.FadeIn].join(' ')} >
            <ImageFadeIn src={props.src} />
        </li>
    );
}

export default headerImage;