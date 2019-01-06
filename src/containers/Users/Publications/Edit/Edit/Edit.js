import React, { PureComponent } from 'react';
import categories from '../../../../../shared/categories';
// Input Validity
import { checkValidity } from '../../../../../shared/checkValidity';
// CSS
import classes from './Edit.module.css';
// JSX
import { ToastContainer } from 'react-toastify';
import Map, { setInitialMapboxPosition, setAddress, defaultAddress } from '../../../../../components/UI/Map/Map';
import Separator from '../../../../../components/UI/Separator/Separator';
import Image from '../../../../../components/UI/Image/Image';
import Input from '../../../../../components/UI/Input/Input';
import InputSlider from '../../../../../components/UI/Input/InputSlider/InputSlider';
import EditImages, { setItems } from '../../../../../components/UI/EditImages/EditImages';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.title,
        displayValue: category.title,
    };
});

class Edit extends PureComponent {
    constructor (props) {
        console.log('constructor inside Edit.js props', props)
        super(props);
        const images = props.images;
        const listImages = images.map( image => {
            return (
                <Image draggable="false" src={image} />
            );
        });
        this.state = {
            controls: {
                // category: {
                //     elementType: 'select',
                //     elementConfig: {
                //         label: 'Choose a category',
                //         placeholder: 'Select a category',
                //         options: categoriesDatalist
                //     },
                //     value: props.category,
                //     valueType: 'category',
                //     validation: {
                //         required: true
                //     },
                //     valid: true,
                //     touched: false,
                // },
                title: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Service Title',
                        autoCorrect:"off",
                        autoCapitalize:"off",
                        spellCheck:"false"
                    },
                    value: props.title,
                    valueType: 'title',
                    validation: {
                        required: true,
                    },
                    valid: true,
                    touched: false,
                    style: {marginTop:  '50px 0'}
                },
                state: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'State',
                        autoCorrect:"off",
                        autoCapitalize:"off",
                        spellCheck:"false"
                    },
                    value: props.infoPoints.state,
                    valueType: 'state',
                    validation: {
                        required: true,
                    },
                    valid: true,
                    touched: false,
                    style: {marginTop:  '50px 0'}
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
                    value: props.infoPoints.website,
                    valueType: 'website',
                    valid: true,
                    touched: false,
                    style: {marginTop:  '50px 0'}
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
                    value: props.infoPoints.languages,
                    valueType: 'language',
                    valid: true,
                    touched: false,
                    style: {marginTop:  '50px 0'}
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
                    value: props.infoSections.service.info,
                    valueType: 'text',
                    validation: {
                        required: true,
                    },
                    valid: true,
                    touched: false,
                    style: {marginTop:  '50px 0'}
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
                    value: props.infoSections.provider.info,
                    valueType: 'text',
                    validation: {
                        required: true,
                    },
                    valid: true,
                    touched: false,
                    style: {marginTop:  '50px 0'}
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
                    valid: false,
                    touched: false,
                    style: {marginTop: 0}
                }
            },
            map: {
                initialPosition: null,
                geoData: null,
                radiusInMiles: 4, // Initial value
                maxRadius: 60 // For the input slider
            },
            images: images,
            items: setItems(listImages), // current images
            formIsValid: true,
        }
    }

    updateImages = (items) => {
        const newImages = [];
        items.forEach( (item) => {
            newImages.push(item.content.props.src);
        })
        this.setState( (prevState) => {
            return {
                ...prevState,
                images: newImages,
                items: items
            }
        });
    }
    
    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
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

    setInitialPosition = (position) => {
        let address;
        if (position) {
            address = [position.data.city, position.data.postal, position.data.region, position.data.country].join(' ');
        } else {
            address = defaultAddress;
        }
        setInitialMapboxPosition(address, (nextMapState) => {
            this.setState( (prevState) => {
                return {
                    map: {
                        ...prevState.map,
                        ...nextMapState
                    }
                }
            })
        });
    }

    // Mapbox coordinate update based on input's value field
    debouncedSearch = (address) => {
        clearTimeout(this.myTimer);
        this.myTimer = setTimeout( () =>  {
            setAddress(address, (nextMapState) => {
                console.log('18239128391829312', nextMapState)
                this.setState( (prevState) => {
                    return {
                        map: {
                            ...prevState.map,
                            ...nextMapState
                        }
                    }
                })
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

    componentDidMount() {
        window.scrollTo(0,0);
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
            formIsValid: this.state.formIsValid
        };
        this.props.updateState(newState);
    }

    render() {
        console.log('QJWEIQJWEIJQIWEJIQWJEQW', this.state.map)
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={6000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover />
                <div className={classes.ServiceContainer}>
                    <div className={classes.GalleryWrapper}>
                        <div ref={this.myGallery} className={classes.GalleryContainer}>
                            <EditImages direction='horizontal' updateItems={this.updateImages} items={this.state.items} />
                        </div>
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.TitleContainer}>
                            <div className={classes.Title}>
                                <h1 tabIndex="-1">Your Service Information</h1>
                            </div>
                        </div>
                        {formElementsArray.map( (input) => {
                            let inputHandler = this.inputChangeHandler;
                            if (input[1].elementType === 'select') {
                                inputHandler = this.inputSelectChangeHandler;
                            }
                            if (input[0] === 'address') { return null; }
                            return (
                                <div className={classes.InputWrapper} key={input[0]}>
                                    <div className={classes.InputContainer}>
                                        <Input 
                                            style={input[1].style}
                                            elementType={input[1].elementType} 
                                            elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                            changed={(event) => inputHandler(event, input[0])}
                                            invalid={!input[1].valid}
                                            shouldValidate={input[1].validation}
                                            touched={input[1].touched}
                                            value={input[1].value} 
                                            valueType={input[1].valueType} />
                                        <Separator/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Separator/>
                <div className={classes.MapContainer}>
                    <div className={classes.TitleContainer}>
                        <div className={classes.Title}>
                            <h1 tabIndex="-1">Your Service Address</h1>
                        </div>
                    </div>
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
                    <Map height='300px' map={this.state.map} />
                </div>







            </>
        );
    }
}

export default Edit;