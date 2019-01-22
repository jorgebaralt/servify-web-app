
import React, { Component } from 'react';
// axios
import axios from '../../../../../axios-services';
// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CSS
import classes from './DeleteImage.module.css';
// JSX
import SVG from '../../../../SVG/SVG';
import Image from '../../../Image/Image';
import LoadingBounce from '../../../LoadingDots/LoadingDots';

const Images = (props) => {
    return (
        props.images.map((image, i) =>
            <div key={i} className={[classes.ImageWrapper,classes.FadeIn].join(' ')}>
                <div onClick={() => props.removeImage(image.fileName)} 
                    className={classes.Delete}>
                    <SVG svg='delete' className={[classes.Icon, classes.Delete].join(' ')} size='2x' />
                </div>
                <Image draggable="false" className={classes.Image} src={image.url} />
            </div>
        )
    );
}


class InputImage extends Component {
    state = {
        bIsDeleting: false
    }

    removeImage = (fileName) => {
        this.setState({
            bIsDeleting: true
        });
        axios.delete('/images_service', { data: { fileName: fileName, serviceId: this.props.serviceId } })
            .then( response => {
                toast.success('File deleted successfully.');
                this.setState({
                    bIsDeleting: false
                });
                if (this.props.onDelete) {
                    this.props.onDelete(response.data);
                }
            })
            .catch( () => {
                toast.error('Something went wrong.');
                this.setState({
                    bIsDeleting: false
                });
            });
    }

    render() {
        if (!this.props.imagesInfo) { return null; } // Protection
        return (
            <div className={classes.Wrapper}>
                {this.state.bIsDeleting ? <div className={classes.Loader}><LoadingBounce /></div> : null}
                <div className={classes.Container}>
                    <Images images={this.props.imagesInfo} 
                        removeImage={this.removeImage}  />
                </div>
            </div>
        );
    }
}

export default InputImage;