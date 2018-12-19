import React, { Component } from 'react';
// CSS
import classes from './ImageFadeIn.module.css';
// fadeIn function for elements
import fadeIn from '../../../shared/fadeInElement';
import LoadingBounce from '../LoadingBounce/LoadingBounce';

class ImageFadeIn extends Component {
    constructor (props) {
        super(props);
        // Checks if there is a srcset
        this.bIsSrcset = props.srcset ? true : false;
        // Image reference
        this.myImage = React.createRef();
    }

    state = {
        bShouldUpdate: true,
        watcherImageWidth: null, // To update on resize
        src: null,
        srcset: null
    }

    setImage () {
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
                    watcherImageWidth: this.props.style ? this.props.style.width : null,
                    src: src,
                    srcset: srcset,
                    bShouldUpdate: false
                });
            };
        } else {
            imageLoader.onload = () => {
                this.setState({
                        watcherImageWidth: this.props.style ? this.props.style.width : null,
                        src: src,
                        bShouldUpdate: false
                });
            };
        }
    }

    componentDidMount () {
        this.setImage();
    }

    componentWillMount () {
        // TODO Fix memory leaks
        if (!this.state.bShouldUpdate) {
            this.setImage = () => {
                return;
            }
        }
    }

    // If there is a resize, then reset the image
    componentDidUpdate () {
        if (this.props.style) { 
            if (this.state.watcherImageWidth !== this.props.style.width) {
                this.setImage();
            }
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        // Pointer protection
        if (this.props.style) {
            // To update on resize
            if (nextState.watcherImageWidth !== nextProps.style.width) {
                return true;
            }
        }
        return this.state.bShouldUpdate;
    }

    render () {
        let imgClasses = classes.Image;
        // if there is prop className use those instead
        if (this.props.className) {
            imgClasses = this.props.className;
        }
        return (
            <div className={this.props.className ? null : classes.ImageWrapper}>
                {!this.state.src ? 
                    this.props.loading ? 
                        <div className={classes.Loading}><LoadingBounce /></div> 
                        : null
                : null}
                {this.bIsSrcset ? 
                    // If there is a srcset, otherwise render image without srcset
                    <img
                        draggable={this.props.draggable}
                        ref={this.myImage}
                        alt=''
                        sizes="100vw"
                        src={this.state.src}
                        srcSet={this.state.srcset}
                        style={this.props.style}
                        className={imgClasses}
                        onLoad={fadeIn(this.myImage.current, (this.props.timeout ? this.props.timeout : 500))} /> 
                    : <img
                        draggable={this.props.draggable}
                        ref={this.myImage}
                        alt=''
                        src={this.state.src}
                        style={this.props.style}
                        className={imgClasses}
                        onLoad={fadeIn(this.myImage.current, (this.props.timeout ? this.props.timeout : 500))} />
                }
            </div>
            
        );
    }
}

export default ImageFadeIn;