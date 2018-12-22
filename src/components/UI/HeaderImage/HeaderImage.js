import React, { Component } from 'react';
// CSS
import classes from './HeaderImage.module.css'
// JSX
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

class HeaderImage extends Component {
    render () {
        return (
            // TODO Make a new li element that renders when image is loaded to trigger fade in animation
            <li  
                className={[classes.HeaderImage, classes.FadeIn].join(' ')} >
                <ImageFadeIn src={this.props.src} />
            </li>
        );
    }
}

export default HeaderImage;