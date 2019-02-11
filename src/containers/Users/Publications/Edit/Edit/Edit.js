import React, { Component } from 'react';
// Worker functions
import { checkValidity } from '../../../../../shared/checkValidity';
import isArray from '../../../../../shared/isArray';
import { parseLocationData } from '../../../../../shared/parseLocationData';
import { parseLogistic } from '../../../../../shared/parseLogistic';
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

const datalist = [
    {
        value: {
            bool: false,
            display: 'physical',
        },
        displayValue: 'Physical store only.'
    },
    {
        value: {
            bool: true,
            display: 'both',
        },
        displayValue: 'Physical store and deliveries.'
    },
    {
        value: {
            bool: true,
            display: 'delivery',
        },
        displayValue: 'Deliveries only.'
    }
];

class Edit extends Component {
    state = {
        controls: {
            title: null,
            aboutService: null,
            provider: null,
            aboutProvider: null,
            website: null,
            street: null,
            name: null,
            city: null,
            state: null,
            postalCode: null,
            option: null,
            address: null,
        },
        map: null,
        images: null,
        loading: true
    }; // Initial state

    setData = () => {
        this.setState(() => {
            // !! Optional value fields need to check if value is null.
            return {
                controls: {
                    title: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Name of your service',
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
                    // languages: {
                    //     elementType: 'input',
                    //     elementConfig: {
                    //         type: 'text',
                    //         placeholder: 'Languages ',
                    //         autoCorrect:"off",
                    //         autoCapitalize:"off",
                    //         spellCheck:"false"
                    //     },
                    //     value: this.props.infoPoints.languages,
                    //     valueType: 'language',
                    //     valid: true,
                    //     touched: false,
                    //     style: {marginTop: '46px 0'}
                    // },
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
                    provider: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Company Name (optional)',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoSections.provider.title ? this.props.infoSections.provider.title : '',
                        valueType: 'title',
                        validation: {
                            required: false,
                        },
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    aboutProvider: {
                        elementType: 'textarea',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'About the provider (optional)',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoSections.provider.info ? this.props.infoSections.provider.info : '',
                        valueType: 'text',
                        validation: {
                            required: false,
                        },
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    website: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Website (optional)',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.infoPoints.website ? this.props.infoPoints.website : '',
                        valueType: 'website',
                        valid: true,
                        touched: false,
                        style: {marginTop: '46px 0'}
                    },
                    street: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            autoComplete: 'new-password',
                            placeholder: 'Street address',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.locationData.street,
                        valueType: 'text',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false,
                    },
                    name: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            autoComplete: 'new-password',
                            placeholder: 'Street address 2 (optional)',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.locationData.name ? this.props.locationData.name : '',
                        valueType: 'text',
                        validation: {
                            required: false,
                        },
                        valid: true,
                        touched: false
                    },
                    city: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            autoComplete: 'new-password',
                            placeholder: 'City',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.locationData.city,
                        valueType: 'text',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false
                    },
                    state: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            autoComplete: 'new-password',
                            placeholder: 'State',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.locationData.region,
                        valueType: 'text',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false
                    },
                    postalCode: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            autoComplete: 'new-password',
                            placeholder: 'Postal Code',
                            autoCorrect:"off",
                            autoCapitalize:"off",
                            spellCheck:"false"
                        },
                        value: this.props.locationData.postalCode,
                        valueType: 'number',
                        validation: {
                            required: true,
                            number: true
                        },
                        valid: true,
                        touched: false
                    },
                    // Logistic
                    option: {
                        elementType: 'select',
                        elementConfig: {
                            label: 'Choose an option that is appropriate to your service',
                            placeholder: 'Select an option',
                            options: datalist,
                            displayValue: parseLogistic(this.props.logistic),
                        },
                        value: {
                            bool: this.props.isDelivery,
                            display: this.props.logistic
                        },
                        valueType: 'text',
                        validation: {
                            required: true
                        },
                        valid: true,
                        touched: false,
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
                        value: '',
                        valueType: 'address',
                        validation: {
                            required: true,
                        },
                        valid: true,
                        touched: false,
                    }
                },
                map: this.props.map,
                images: this.props.imagesInfo,
                formIsValid: true,
                loading: false
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

    onImageDelete = (data) => {
        this.props.handleData(data);
        this.setData();
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

    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value.display, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            if (!updatedOrderForm[inputIdentifier]) { continue; } // Pointer protection
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }
    
    inputImageChangeHandler = (files) => {
        this.setState({
            imageFiles: files, 
        });
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

    /**
     * If there is a valid address, then IF there is no geodata, OR else if the previous props parsed location 
     * data is NOT equal to address (this.myAddress ref), then debounce search the address to obtain a geoData. 
     * This is done so that when the user changes the location data, the map will update with the entered data. 
     * The user will only have to pretty much, confirm the location.
     */
    componentDidUpdate(_, prevState) {
        const prevAddress = {
            street: prevState.controls.street ? prevState.controls.street.value : null,
            name: prevState.controls.name ? prevState.controls.name.value : null,
            city: prevState.controls.city ? prevState.controls.city.value : null,
            region: prevState.controls.state ? prevState.controls.state.value : null,
            postalCode: prevState.controls.postalCode ? prevState.controls.postalCode.value : null,
        };
        if (this.myAddress) {
            if (!this.state.map.geoData) {
                this.debouncedSearch(this.myAddress);
            } else if (parseLocationData(prevAddress) !== this.myAddress) {
                this.debouncedSearch(this.myAddress);
            }
        }
    }
    
    componentWillUnmount() {
        const newState = {
            title: this.state.controls.title.value,
            images: this.state.images,
            infoPoints: {
                state: this.state.controls.state.value,
                website: this.state.controls.website.value,
                // languages: this.state.controls.languages.value
            },
            infoSections: {
                service: {
                    ...this.props.infoSections.service,
                    info: this.state.controls.aboutService.value
                },
                provider: {
                    ...this.props.infoSections.provider,
                    title: this.state.controls.provider.value,
                    info: this.state.controls.aboutProvider.value
                }
            },
            isDelivery: this.state.controls.option.value.bool,
            logistic: this.state.controls.option.value.display,
            locationData: {
                street: this.state.controls.street.value,
                name: this.state.controls.name.value,
                city: this.state.controls.city.value,
                region: this.state.controls.state.value,
                postalCode: this.state.controls.postalCode.value,
            },
            // If the input has a value,
            physicalLocation: this.state.controls.address.value ? 
                this.state.controls.address.value
                : this.myAddress,
            map: this.state.map,
            formIsValid: this.state.formIsValid
        };
        this.props.updateState(newState);
        window.scrollTo(0,0);
    }

    myAddress = null;

    render() {
        if (this.state.loading) { return null; } // Protection
        const formElementsArray = Object.entries(this.state.controls);
        this.myAddress = parseLocationData({
            street: this.state.controls.street.value,
            name: this.state.controls.name.value,
            city: this.state.controls.city.value,
            region: this.state.controls.state.value,
            postalCode: this.state.controls.postalCode.value,
        });
        const isDelivery = this.state.controls.option.value.bool;
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
                            // Address and option are rendered below with the map.
                            if (input[0] === 'address' || input[0] === 'option') { return null; }
                            return (
                                <div className={classes.InputWrapper} key={input[0]}>
                                    <div className={classes.InputContainer}>
                                        <Input 
                                            style={input[1].style}
                                            elementType={input[1].elementType} 
                                            elementConfig={input[1].elementConfig} // Referenced to state to mutate
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
                            // Image upload quantity limit, maximum of 5 images.
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
                                onDelete={this.onImageDelete}
                                serviceId={this.props.service.id} 
                                imagesInfo={this.props.imagesInfo} />
                        </div>
                    </div>
                    : null}
                <div className={classes.MapContainer}>
                    <Title>Logistics</Title>
                    <Input 
                        style={this.state.controls.option.style}
                        elementType={this.state.controls.option.elementType} 
                        elementConfig={this.state.controls.option.elementConfig} // Referenced to state to mutate
                        changed={(event) => this.inputSelectChangeHandler(event, 'option')}
                        invalid={!this.state.controls.option.valid}
                        shouldValidate={this.state.controls.option.validation}
                        touched={this.state.controls.option.touched}
                        value={this.state.controls.option.value} 
                        valueType={this.state.controls.option.valueType} />
                    <Title>Your Service Address</Title>
                    <Input 
                        style={this.state.controls.address.style}
                        elementType={this.state.controls.address.elementType} 
                        elementConfig={this.state.controls.address.elementConfig} // Referenced to state to mutate
                        changed={(event) => this.inputChangeHandler(event, 'address')}
                        invalid={!this.state.controls.address.valid}
                        shouldValidate={this.state.controls.address.validation}
                        touched={this.state.controls.address.touched}
                        // value={this.myAddress ? this.myAddress : this.state.controls.address.value} 
                        value={this.state.controls.address.value === '' ? this.myAddress : this.state.controls.address.value} 
                        valueType={this.state.controls.address.valueType} />
                    {/* Only render the distance slider and circlce if the service offers deliveries. */}
                    {isDelivery ? 
                        <InputSlider onChange={this.inputSliderHandler} 
                            header='Distance' 
                            value={this.state.map.radiusInMiles}
                            maxValue={this.state.map.maxRadius} 
                            valueType='miles (approx)' />
                        : null
                    }
                    <Map circle={isDelivery ? true : false} height='350px' map={this.state.map} />
                </div>
            </>
        );
    }
}

export default Edit;