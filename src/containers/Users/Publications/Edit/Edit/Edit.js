import React, { Component } from 'react';
// Input validity and isArray
import { checkValidity } from '../../../../../shared/checkValidity';
import isArray from '../../../../../shared/isArray';
// CSS
import classes from './Edit.module.css';
// JSX
import Gallery from '../../../../../components/Services/Gallery/Gallery';
import Map, { setAddress } from '../../../../../components/UI/Map/Map';
import Input from '../../../../../components/UI/Input/Input';
import InputImage from '../../../../../components/UI/Input/InputImage/InputImage';
import DeleteImage from '../../../../../components/UI/Input/InputImage/DeleteImage/DeleteImage';
import InputSlider from '../../../../../components/UI/Input/InputSlider/InputSlider';
import EditImages from '../../../../../components/UI/EditImages/EditImages';
import Title from '../../../../../components/Services/Title/Title';

class Edit extends Component {
    constructor (props) {
        super(props);
        this.myGallery = React.createRef();
        this.state = null;
    }

    state = null; // Initial state

    setData = () => {
        this.setState(() => {
            return {
                controls: {
                    state: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'State',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoPoints.state,
                        valueType: 'state',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    title: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Service Title',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.title,
                        valueType: 'title',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    website: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Website',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoPoints.website,
                        valueType: 'website',
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    languages: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Languages ',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoPoints.languages,
                        valueType: 'language',
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    aboutService: {
                        elementType: 'textarea',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'About your service',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoSections.service.info,
                        valueType: 'text',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    aboutProvider: {
                        elementType: 'textarea',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'About the provider',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoSections.provider.info,
                        valueType: 'text',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    address: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            autoComplete: 'address',
                            placeholder: 'Service address',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.address,
                        valueType: 'address',
                        validation: {
                            required: true,
                        },
                        valid: false,
                        touched: false,
                    }
                },
                map: this.props.map,
                images: this.props.imagesInfo,
                formIsValid: true,
            }
        });
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.setData();
    }

    updateImages = (newImages) => {
        this.setState( (prevState) => {
            return {
                ...prevState,
                images: newImages
            }
        });
    }

    onImageUpload = (imagesInfo) => {
        let newImages;
        if (isArray(this.props.imagesInfo)) {
            newImages = [...imagesInfo, ...this.props.imagesInfo];
        } else {
            newImages = [...imagesInfo];
        }
        const data = { imagesInfo: newImages };
        if (!this.props.updateData) { return; } // Pointer protection
        this.props.updateData(data, this.setData);
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
        if (inputIdentifier === 'address') { 
            this.debouncedSearch(updatedFormElement.value);
        }
    }
    
    inputImageChangeHandler = (files) => {
        this.setState({
            imageFiles: files, 
        });
    }

    // Mapbox coordinate update based on input's value field
    debouncedSearch = (address) => {
        clearTimeout(this.myTimer);
        this.myTimer = setTimeout( () =>  {
            setAddress(address, (nextMapState) => {
                this.setState( (prevState) => {
                    return {
                        map: {
                            ...prevState.map,
                            ...nextMapState
                        }
                    }
                });
            })
        }, 1500);
    }

    inputSliderHandler = (event) => {
        const miles = event.target.value;
        this.setState( (prevState) => {
            return {
                map: {
                    ...prevState.map,
                    radiusInMiles: miles
                }
            }
        });
    }
    
    componentWillUnmount() {
        const newState = {
            // category: this.state.controls.category.value,
            title: this.state.controls.title.value,
            images: this.state.images,
            infoPoints: {
                state: this.state.controls.state.value,
                website: this.state.controls.website.value,
                languages: this.state.controls.languages.value
            },
            infoSections: {
                service: {
                    ...this.props.infoSections.service,
                    info: this.state.controls.aboutService.value
                },
                provider: {
                    ...this.props.infoSections.provider,
                    info: this.state.controls.aboutProvider.value
                }
            },
            address: this.state.controls.address.value,
            map: this.state.map,
            formIsValid: this.state.formIsValid
        };
        this.props.updateState(newState);
    }

    render() {
        if (!this.state) { return null; } // Protection
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <>
                <div className={classes.ServiceContainer}>
                    <div className={classes.GalleryWrapper}>
                        <Gallery>
                            {/**
                             * If the imageInfo prop is null, or is an empty array, 
                             * then it will be recognized as having no images.
                             */}
                            {this.props.imagesInfo ? 
                                    !this.props.imagesInfo.length ? 
                                    <div className={classes.Warning}><strong>Hey!</strong> You haven't uploaded any images yet.</div> 
                                    : <></>
                                : <div className={classes.Warning}><strong>Hey!</strong> You haven't uploaded any images yet.</div> }
                            <EditImages direction='horizontal' updateImages={this.updateImages} images={this.state.images} />
                        </Gallery>
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <Title>Your Service Information</Title>
                        {formElementsArray.map( (input) => {
                            if (input[0] === 'address') { return null; }
                            return (
                                <div className={classes.InputWrapper} key={input[0]}>
                                    <div className={classes.InputContainer}>
                                        <Input 
                                            style={input[1].style}
                                            elementType={input[1].elementType} 
                                            elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                            changed={(event) => this.inputChangeHandler(event, input[0])}
                                            invalid={!input[1].valid}
                                            shouldValidate={input[1].validation}
                                            touched={input[1].touched}
                                            value={input[1].value} 
                                            valueType={input[1].valueType} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.InputImageWrapper}>
                    <Title>Image Upload</Title>
                    <div className={classes.InputImageContainer}>
                        <InputImage 
                            submit
                            // Image upload quantity limit
                            uploadQtyLimit={
                                this.props.images ? 
                                5 - this.props.images.length
                                : 5 }
                            onUpload={this.onImageUpload}
                            onChange={this.inputImageChangeHandler} />
                    </div>
                </div>
                {this.props.imagesInfo ? 
                    <div className={classes.InputImageWrapper}>
                        <Title>Delete Images</Title>
                        <div className={classes.InputImageContainer}>
                            <DeleteImage 
                                onDelete={this.props.handleData}
                                serviceId={this.props.service.id} 
                                imagesInfo={this.props.imagesInfo} />
                        </div>
                    </div>
                    : null}
                <div className={classes.MapContainer}>
                    <Title>Your Service Address</Title>
                    <Input 
                        style={this.state.controls.address.style}
                        elementType={this.state.controls.address.elementType} 
                        elementConfig={this.state.controls.address.elementConfig} // Referenced to state to mutate
                        changed={(event) => this.inputChangeHandler(event, 'address')}
                        invalid={!this.state.controls.address.valid}
                        shouldValidate={this.state.controls.address.validation}
                        touched={this.state.controls.address.touched}
                        value={this.state.controls.address.value} 
                        valueType={this.state.controls.address.valueType} />
                    <InputSlider onChange={this.inputSliderHandler} 
                        header='Distance' 
                        value={this.state.map.radiusInMiles}
                        maxValue={this.state.map.maxRadius} 
                        valueType='miles (approx)' />
                    <Map circle height='350px' map={this.state.map} />
                </div>
            </>
        );
    }
}

export default Edit;