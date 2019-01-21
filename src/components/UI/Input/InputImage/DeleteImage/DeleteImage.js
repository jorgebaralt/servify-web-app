
import React, { Component } from 'react';
// axios
import axios from '../../../../../axios-services';
// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CSS
import classes from '../InputImage.module.css';
// JSX
import SVG from '../../../../SVG/SVG';

const Images = (props) => {
    return (
        props.images.map((image, i) =>
            <div key={i} className={[classes.ImageWrapper,classes.FadeIn].join(' ')}>
                <div onClick={() => props.removeImage(image.fileName)} 
                    className={classes.Delete}>
                    <SVG svg='delete' className={[classes.Icon, classes.Delete].join(' ')} size='2x' />
                </div>
                <img draggable="false" className={classes.Image} src={image.url} alt='' />
            </div>
        )
    );
}


class InputImage extends Component {
    removeImage = (fileName) => {
        axios.delete('/deleteFile', { params: { fileName: fileName, serviceId: this.props.serviceId, imagesInfo: this.props.imagesInfo } })
            .then( response => {
                toast.success(response.message);
            })
            .catch( () => {
                toast.error('Something went wrong.');
            });
    }

    componentDidUpdate () {
        this.props.onChange(this.getFormData());
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state || nextProps.children !== this.props.children;
    }
    
    render() {
        if (!this.props.imagesInfo) { return null; } // Protection
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Container}>
                    <Images images={this.props.imagesInfo} 
                        removeImage={this.removeImage}  />
                </div>
            </div>
        );
    }
}

export default InputImage;