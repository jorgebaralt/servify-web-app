import React, { Component } from 'react';

import classes from './HeaderImage.module.css'

class HeaderImage extends Component {
    state = { 
        src: null 
    };

    componentDidMount() {
        const { src } = this.props;

        const imageLoader = new Image();
        imageLoader.src = src;

        imageLoader.onload = () => {
            this.setState({ 
                src 
            });
        };
    }

    render () {
        return (
            <li style={{ backgroundImage: `url(${this.state.src})` }} className={[classes.HeaderImage, classes.FadeIn].join(' ')} />
        );
    }
}

export default HeaderImage;