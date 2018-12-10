import React, { Component } from 'react';
// CSS
import classes from './ImageFadeIn.module.css';
// fadeIn function for elements
import fadeIn from '../../../shared/fadeInElement';

class ImageFadeIn extends Component {
    constructor (props) {
        super(props);
        // Checks if there is a srcset
        this.bIsSrcset = props.srcset ? true : false;
        // Image reference
        this.myImage = React.createRef();
    }

    state = {
        src: null,
        srcset: null
    }

    componentDidMount () {
        // src object variable equal to props received
        const src = this.props.src;
        // imageLoader variable declaration to be a new Image element type object
        const imageLoader = new Image();
        imageLoader.src = src;
        if (this.bIsSrcset) {
            const srcset = this.props.srcset ? this.props.srcset : null;
            imageLoader.srcset = srcset;
            // src is loaded, sets the state's src equal to the props.src, and then is rendered on the image element in render()
            imageLoader.onload = () => {
                this.setState({ 
                    src: src,
                    srcset: srcset,
                });
            };
        } else {
            imageLoader.onload = () => {
                this.setState({ 
                    src: src,
                });
            };
        }
    }

    render () {
        const imgClasses = [classes.Image];
        if (this.props.className) {
            imgClasses.push(this.props.className);
        }
        return (
            <div className={classes.ImageWrapper}>
                {this.bIsSrcset ? 
                    // If there is a srcset, otherwise render image without srcset
                    <img
                        ref={this.myImage}
                        alt=''
                        sizes="100vw"
                        src={this.state.src}
                        srcSet={this.state.srcset}
                        className={imgClasses.join(' ')}
                        onLoad={fadeIn(this.myImage.current, (this.props.timeout ? this.props.timeout : 1000))} /> :
                    <img
                        ref={this.myImage}
                        alt=''
                        src={this.state.src}
                        className={imgClasses.join(' ')}
                        onLoad={fadeIn(this.myImage.current, (this.props.timeout ? this.props.timeout : 1000))} />
                }
            </div>
            
        );
    }
}

export default ImageFadeIn;