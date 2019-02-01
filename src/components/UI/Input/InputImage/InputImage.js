
import React, { Component } from 'react';
// axios
import axios from '../../../../axios-services';
// toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CSS
import classes from './InputImage.module.css';
// JSX
import Button from '../../Button/Button';
import Spinner from '../../LoadingBounce/LoadingBounce';
import SVG from '../../../SVG/SVG';
import ProgressRing from '../../ProgressRing/ProgressRing';
import LoadingDots from '../../../UI/LoadingDots/LoadingDots';

const Buttons = (props) => {
    const buttonsClasses = [classes.Container, classes.FadeIn];
    return (
        <div className={buttonsClasses.join(' ')}>
            <div className={classes.Button}>
                <label htmlFor='Single_Image_Upload'>
                    <SVG className={classes.Icon} svg='single-image' color='#3B5998' size='10x' />
                </label>
                <input ref={props.mySingleFile} type='file' className={classes.Input} id='Single_Image_Upload' onChange={props.onChange} /> 
            </div>
            {props.bIsSingleImage ? // Props sent by parent component in case only single image upload is desired (profiles).
                null
                : (
                    <div className={classes.Button}>
                        <label htmlFor='Multi_Image_Upload'>
                            <SVG className={classes.Icon} svg='multi-image' color='#6d84b4' size='10x' />
                        </label>
                        <input ref={props.myMultiFiles} type='file' className={classes.Input} id='Multi_Image_Upload' onChange={props.onChange} multiple />
                    </div>
                )
            }
        </div>
    );
}

export const Images = (props) => {
    return (
        props.images.map((image, i) => {
            props.inputRefs[image.file.name] = React.createRef();
            return (
                <div key={i} className={[classes.ImageWrapper,classes.FadeIn].join(' ')}>
                    <div className={classes.Progress}>
                        <ProgressRing 
                            radius={36} 
                            stroke={6} 
                            progress={props.progressRings ? props.progressRings[image.file.name] : 0} />
                    </div>
                    <div onClick={() => props.removeImage(image.public_id, image.file.name)} 
                        className={classes.Delete}>
                        <SVG svg='delete' className={[classes.Icon, classes.Delete].join(' ')} size='2x' />
                    </div>
                    <img ref={props.inputRefs[image.file.name]} draggable="false" className={classes.Image} src={URL.createObjectURL(image.file)} alt='' />
                </div>
            );
        })
    );
}

export const getImagesFromFiles = (files) => {
    return Array.from(files)
        .map( (file) => {
            return {
                file: file,
                public_id: [file.name, file.size].join('_')
            }
        }
    );
}

class InputImage extends Component {
    constructor(props) {
        super(props);
        this.mySingleFile = React.createRef();
        this.myMultiFiles = React.createRef();
        this.inputRefs = {};
    }

    state = {
        bIsUploading: false,
        activeRef: null,
        progressRings: {},
        images: [],
        files: []
    }

    getFormData = () => {
        const images = Array.from(this.state.images);
        const formData = new FormData()
        images.forEach((image, i) => {
            formData.append(i, image.file);
        })
        return formData;
    }

    setActiveRef = (ref) => { // Single file or multi files setter
        this.setState({
            activeRef: ref
        });
    }

    onChange = (e) => {
        /**
         * If the uploadQtyLimit is 0, then the limit will be 0. 
         * Otherwise, it will be the limit if it exists, or 5 as a default value.
         */
        const limit = this.props.uploadQtyLimit === 0 ? this.props.uploadQtyLimit : this.props.uploadQtyLimit | 5;
        // #1 There are too many files!
        if (e.target.files.length > limit) {
            let msg;
            if (limit === 0) {
                msg = `You can't upload any more images, delete some before uploading.`;
            } else {
                msg = `Only ${limit} images can be uploaded at a time`;
            }
            e.target.files = null;
            return toast.error(msg);
        }

        const errormsg = [];
        const types = ['image/png', 'image/jpeg', 'image/gif'];
        Array.from(e.target.files).forEach( (file) => {
            // #2 Catching wrong file types on the client
            if (types.every(type => file.type !== type)) {
                errormsg.push(`${file.type} is not a supported format.`)
            }
            // #3 Catching files that are too large on the client
            if (file.size > 600000) {
                errormsg.push(`${file.name} is too large, please pick a smaller file that is less than 600 KB.`)
            }
        });

        if (errormsg.length) {
            return errormsg.forEach(err => toast.error(err));
        }

        const files = getImagesFromFiles(e.target.files);

        this.setState({ 
            images: files,
            files: e.target.files
        });
    }

    /**
     * Removes be images and the upload progress from the images container.
     */
    removeImage = (id, progressRef) => {
        const images = this.state.images.filter(image => {
            return image.public_id !== id
        });
        this.setState((prevState) => { 
            return {
                uploading: false,
                images: images,
                progressRings: {
                    ...prevState.progressRings,
                    [progressRef]: 0
                }
            };
        });
    }

    /**
     * Updates and/or sets the upload progress of a respective image.
     */
    setUploadProgress = (ref, progress) => {
        this.setState((prevState) => {
            return {
                progressRings: {
                    ...prevState.progressRings,
                    [ref]: progress
                }
            }
        });
    }

    /**
     * Uploads all the images simultaneously and waits till every image is uploaded 
     * or there is a reply from the server. Afterwards, if there is an on upload prop
     * passed on, execute it.
     */
    uploadData = async () => {
        await this.setState({
            bIsUploading: true
        });
        const headers = await {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        const imagesInfo = await [];
        await Promise.all(Object.values(this.state.files).map(async (file) => {
            const formData= new FormData();
            formData.append('image', file, file.name);
            const url = this.props.profileUpload ? '/images_profile' : '/images_service'
            const response = await axios.post(url, 
                formData,  
                { onUploadProgress: progressEvent => {
                    const progress = (progressEvent.loaded / progressEvent.total * 100);
                    const ref = file.name;
                    this.setUploadProgress(ref, progress);
                } ,headers: headers}
            );
            if (response.status === 200) {
                await toast.success(`${file.name} has been uploaded successfully.`);
                await this.removeImage([file.name, file.size].join('_'), file.name)
                const imageInfo = response.data;
                imagesInfo.push(imageInfo);
            } else {
                toast.error(`Something went wrong when uploading ${file.name}, you may try again.`);
            }
        }));
        /**
         * If there is an onUpload prop function, execute it after uploading is done.
         */
        if (this.props.onUpload) { await this.props.onUpload(imagesInfo) };
        await this.setState({
            bIsUploading: false
        });
    }

    uploadDataHandler = (e) => {
        e.preventDefault();
        this.uploadData();
    }

    componentDidUpdate() {
        if (!this.props.onChange) { return; }
        this.props.onChange(this.getFormData());
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state || nextProps.children !== this.props.children;
    }
    
    render() {
        const { uploading, images } = this.state;
        const render = () => {
            switch(true) {
            case uploading:
                return <Spinner />
            case images.length > 0:
                return <Images 
                    inputRefs={this.inputRefs}
                    progressRings={this.state.progressRings}
                    images={images} 
                    removeImage={this.removeImage}  />
            default:
                return <Buttons
                    bIsSingleImage={this.props.bIsSingleImage} 
                    onChange={this.onChange}
                    myMultiFiles={this.myMultiFiles}
                    mySingleFile={this.mySingleFile} 
                    setActiveRef={this.setActiveRef} />
            }
        }
        let bIsSubmitDisabled = false;
        /**
         * Boolean that checks if the submit button should be disabled.
         * If the input is currently uploading then it should be disabled.
         * If there are any submitted images then it should be enabled.
         */
        switch (true) {
            case this.state.bIsUploading:
                bIsSubmitDisabled = true;
                break;
            case !(this.state.images.length > 0):
                bIsSubmitDisabled = true;
                break;
            default:
                // do nothing
        }
        const input = (
            <>
                {this.props.title ? 
                    <div className={classes.Title}>
                        <div>Image Upload</div>
                    </div>
                    : null }
                <div className={classes.Wrapper}>
                    <div className={classes.Container}>
                        {render()}
                    </div>
                </div>
                {this.props.submit ? 
                    <Button style={{height: '50px'}} submit disabled={bIsSubmitDisabled} blockButton type='success'>
                        {this.state.bIsUploading ? <LoadingDots /> : 'Submit'}
                    </Button>
                    : null
                }
            </>
        );
        return (
            this.props.submit ? 
                <form onSubmit={this.uploadDataHandler} style={{width: '100%'}}>
                    {input}
                </form>
                : 
                <div>
                    {input}
                </div>
        );
    }
}

export default InputImage;