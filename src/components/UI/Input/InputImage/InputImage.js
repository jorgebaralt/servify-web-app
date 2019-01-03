
import React, { PureComponent } from 'react';
// CSS
import classes from './InputImage.module.css';
// JSX
import Spinner from '../../LoadingBounce/LoadingBounce';
import SVG from '../../../SVG/SVG';

const Buttons = (props) => {
    const buttonsClasses = [classes.Buttons, classes.FadeIn];
    return (
        <div className={buttonsClasses.join(' ')}>
            <div className={classes.Button}>
                <label htmlFor='Single_Image_Upload'>
                    <SVG className={classes.Icon} svg='single-image' color='#3B5998' size='10x' />
                </label>
                <input ref={props.mySingleFile} type='file' className={classes.Input} id='Single_Image_Upload' onChange={props.onChange} /> 
            </div>
            <div className={classes.Button}>
                <label htmlFor='Multi_Image_Upload'>
                    <SVG className={classes.Icon} svg='multi-image' color='#6d84b4' size='10x' />
                </label>
                <input ref={props.myMultiFiles} type='file' className={classes.Input} id='Multi_Image_Upload' onChange={props.onChange} multiple />
            </div>
        </div>
    );
}

const Images = (props) => {
    return (
        props.images.map((image, i) =>
            <div key={i} className={classes.FadeIn}>
                <div onClick={() => props.removeImage(image.public_id)} 
                    className={classes.Delete}>
                    <SVG svg='delete' className={[classes.Icon, classes.Delete].join(' ')} size='2x' />
                </div>
                <img draggable="false" className={classes.Image} src={URL.createObjectURL(image.file)} alt='' />
            </div>
        )
    );
}

class InputImage extends PureComponent {
    constructor(props) {
        super(props);
        this.mySingleFile = React.createRef();
        this.myMultiFiles = React.createRef();
    }
    state = {
        uploading: false,
        activeRef: null,
        images: []
    }

    setActiveRef = (ref) => { // Single file or multi files setter
        this.setState({
            activeRef: ref
        })
    }

    onChange = (e) => {
        const files = Array.from(e.target.files)
            .map( (file, index) => {
                return {
                    file: file,
                    public_id: [file.name, file.size].join('_')
                }
            }
        );
        this.setState({ 
            images: files,
            files: e.target.files
        });
    }

    removeImage = (id) => {
        const images = this.state.images.filter(image => {
            return image.public_id !== id
        });
        this.setState({ 
            uploading: false,
            images: images
        });
    }

    getFormData = () => {
        const images = Array.from(this.state.images);
        const formData = new FormData()
        images.forEach((image, i) => {
            formData.append(i, image.file);
        })
        return formData;
    }

    componentDidUpdate () {
        this.props.onChange(this.getFormData());
    }
    
    render() {
        const { uploading, images } = this.state;
        const render = () => {
            switch(true) {
            case uploading:
                return <Spinner />
            case images.length > 0:
                return <Images images={images} 
                    removeImage={this.removeImage}  />
            default:
                return <Buttons onChange={this.onChange}
                    myMultiFiles={this.myMultiFiles}
                    mySingleFile={this.mySingleFile} 
                    setActiveRef={this.setActiveRef} />
            }
        }
        return (
            <>
                <div className={classes.Title}>
                    <div>Image Upload</div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.Buttons}>
                        {render()}
                    </div>
                </div>
            </>
        );
    }
}

export default InputImage;