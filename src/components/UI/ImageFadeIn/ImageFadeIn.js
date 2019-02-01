import React, { Component } from 'react';
// fadeIn function for elements
import fadeIn from '../../../shared/fadeInElement';
// CSS
import classes from './ImageFadeIn.module.css';
// JSX
import LoadingBounce from '../LoadingBounce/LoadingBounce';

class ImageFadeIn extends Component {
    constructor (props) {
        super(props);
        // Checks if there is a srcset
        this.bIsSrcset = props.srcset ? true : false;
        // Image reference
        this.myImage = React.createRef();
        // Pointer to avoid memory leak on component will unmount
        this.myImageLoader = new Image();
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
        // this.myImageLoader.variable declaration to be a new Image element type object
        this.myImageLoader.src = src;
        if (this.bIsSrcset) {
            const srcset = this.props.srcset ? this.props.srcset : null;
            this.myImageLoader.srcset = srcset;
            // src is loaded, sets the state's src equal to the props.src, and then is rendered on the image element in render()
            this.myImageLoader.onload = () => {
                this.setState({ 
                    watcherImageWidth: this.props.style ? this.props.style.width : null,
                    src: src,
                    srcset: srcset,
                    bShouldUpdate: false
                });
            };
        } else {
            this.myImageLoader.onload = () => {
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

    componentWillUnmount () {
        this.myImageLoader.onload = null;
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

    
    Image = () => {
        let imgClasses = classes.Image;
        // if there is prop className use those instead
        if (this.props.className) {
            imgClasses = this.props.className;
        }
        return (
            <>
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
                        onLoad={fadeIn(this.myImage.current, (this.props.timeout ? this.props.timeout : 250))} /> 
                    : <img
                        draggable={this.props.draggable}
                        ref={this.myImage}
                        alt=''
                        src={this.state.src}
                        style={this.props.style}
                        className={imgClasses}
                        onLoad={fadeIn(this.myImage.current, (this.props.timeout ? this.props.timeout : 250))} />
                }
            </>
        )
    }

    render () {
        return (
            this.props.noWrapper ? 
                <this.Image />
                : (
                    <div className={this.props.className ? null : classes.ImageWrapper}>
                        <this.Image />
                    </div>
                )
        );
    }
}

export default ImageFadeIn;