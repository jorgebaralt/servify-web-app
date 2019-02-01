import React, { Component } from 'react';
// CSS
import classes from './Gallery.module.css';
// JSX
import ReactResizeDetector from 'react-resize-detector';

class Gallery extends Component {
    constructor (props) {
        super(props);
        this.myGallery = React.createRef();
        this.state = {
            imageSizes: null
        }
    }

    setGalleryDimensions = () => {
        this.setState(() => {
            return {
                imageSizes: {
                    width: this.myGallery.current.offsetWidth,
                    height: this.myGallery.current.offsetWidth/(4/3)
                }
            }
        });
    }

    componentDidMount() {
        this.setGalleryDimensions();
    }

    render() {
        const { children } = this.props;
        if (!children) { return null; } // Pointer protection
        // Cloning components to pass dimensions props
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { dimensions: this.state.imageSizes })
        );
        return (
            <div className={classes.Wrapper}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.setGalleryDimensions} />
                <div ref={this.myGallery}
                    className={classes.Container}>
                    {childrenWithProps}
                </div>
            </div>
        );
    }
}

export default Gallery;