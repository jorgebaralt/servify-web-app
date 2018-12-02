import React, { Component } from 'react';
// CSS
import classes from './HeaderImage.module.css'

class HeaderImage extends Component {
    // src set to null on constructor, will change when image is loaded
    state = { 
        src: null 
    };

    componentDidMount() {
        // src object variable equal to props received
        const src = this.props.src;
        // imageLoader variable declaration to be a new Image element type object
        const imageLoader = new Image();
        imageLoader.src = src;
        // src is loaded, sets the state's src equal to the props.src, and then is rendered on the image element in render()
        imageLoader.onload = () => {
            this.setState({ 
                src: src 
            });
        };
    }

    render () {
        return (
            // TODO Make a new li element that renders when image is loaded to trigger fade in animation
            <li style={{ backgroundImage: `url(${this.state.src})` }} className={[classes.HeaderImage, classes.FadeIn].join(' ')} />
        );
    }
}

export default HeaderImage;