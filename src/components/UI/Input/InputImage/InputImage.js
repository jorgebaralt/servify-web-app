
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

const onAuthStateChanged = () => {
    return new Promise((resolve, reject) => {
        axios.post((user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('No user logged in.'));
            }
        });
    });
}

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
            <div key={i} className={[classes.ImageWrapper,classes.FadeIn].join(' ')}>
                <div onClick={() => props.removeImage(image.public_id)} 
                    className={classes.Delete}>
                    <SVG svg='delete' className={[classes.Icon, classes.Delete].join(' ')} size='2x' />
                </div>
                <img draggable="false" className={classes.Image} src={URL.createObjectURL(image.file)} alt='' />
            </div>
        )
    );
}

class InputImage extends Component {
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

        const files = Array.from(e.target.files)
            .map( (file) => {
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

    // TESTING only
    consoleLogData = (formData) => {
        
        const data = new FormData()
        const images = Array.from(this.state.images);
        images.forEach((image, i) => {
            formData.append(i, image.file);
        });
        this.consoleLogData(formData);
        // Display the key/value pairs
        for (let [key, value] of data.entries()) {
            console.log(key, ':', value);
        }
    }

    getFormData = () => {
        const images = Array.from(this.state.images);
        const formData = new FormData()
        images.forEach((image, i) => {
            formData.append(i, image.file);
        })
        return formData;
    }

    uploadData = (e) => {
        e.preventDefault();
        const images = Array.from(this.state.images);
        const headers = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        async function uploadFiles () {
            await Promise.all(images.map(async (image) => {
                const formData= new FormData()
                formData.append('image', image.file)
                const contents = await axios.post('/uploadFile', 
                    { image: formData },  headers
                );
                console.log(contents);
            }));
        }
        uploadFiles();
    }

    componentDidUpdate () {
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
                return <Images images={images} 
                    removeImage={this.removeImage}  />
            default:
                return <Buttons onChange={this.onChange}
                    myMultiFiles={this.myMultiFiles}
                    mySingleFile={this.mySingleFile} 
                    setActiveRef={this.setActiveRef} />
            }
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
                    <Button submit disabled={!(this.state.images.length > 0)} blockButton type='success'>Submit</Button>
                    : null
                }
            </>
        );
        return (
            this.props.submit ? 
                <form onSubmit={this.uploadData} style={{width: '100%'}}>
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