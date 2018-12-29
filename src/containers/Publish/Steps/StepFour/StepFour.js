import React, { PureComponent } from 'react';
import axios from 'axios';
// CSS
import classes from '../../Publish.module.css';
// JSX
import Separator from '../../../../components/UI/Separator/Separator';
import Map, { setMapboxAccessToken, setInitialMapboxPosition, setAddress } from '../../../../components/UI/Map/Map';
import Input from '../../../../components/UI/Input/Input';
import InputSlider from '../../../../components/UI/Input/InputSlider/InputSlider';

// Mapbox Geocoding
setMapboxAccessToken();

class StepFour extends PureComponent {
    constructor(props) {
        super(props);
        this.myTimer = null;
    }
    state = {
        controls: {
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
                style: {marginTop: '22px'}
            }
        },
        map: {
            initialPosition: null,
            geoData: null,
            radiusInMiles: 4, // Initial value
            maxRadius: 60 // For the input slider
        },
        formIsValid: false
    }

    setInitialPosition = (position) => {
        const address = [position.data.city, position.data.postal, position.data.region, position.data.country].join(' ');
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

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value; // Address
        updatedFormElement.valid = this.props.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
        this.debouncedSearch(updatedFormElement.value);
    }

    componentWillMount () {
        axios.get('http://ipinfo.io').then(
            (response) => this.setInitialPosition(response)
        );
    }

    componentDidUpdate = () => {
        const data = {};
        for (let key in this.state.controls) {
            data[key] = this.state.controls[key].value;
        }
        // Pointer protection
        if (this.state.map.geoData) {
            data.coordinates = this.state.map.geoData.features[0];
        }
        data.distance = this.state.map.radiusInMiles;
        const formIsValid = this.state.formIsValid;
        this.props.updateData(this.props.stepKey, data, formIsValid);
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <div style={{backgroundColor: 'lightorange'}} className={classes.Container}>
                <div className={classes.FormWrapper}>
                    <div className={classes.Step}><span>S</span>tep 4</div>
                    <h2>
                        Finally we need to wrtie down your address. This is to let customers know where you are located.
                        Type your address into the field and set the distance you're able to cover, then wait for the map 
                        to update.
                    </h2>
                    <Separator />
                    <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                        <input name="GeoData_Coordinates" 
                            readOnly
                            className={classes.HiddenInput} hidden={true} 
                            type="text" 
                            value={this.state.map.geoData ?
                                    (
                                        this.state.map.geoData.features.length > 0 ?
                                            this.state.map.geoData.features[0].center
                                            : [0,0]
                                    )
                                    : ''} />
                        {formElementsArray.map( (input) => {
                            return (
                                <Input 
                                    style={input[1].style}
                                    key={input[0]} 
                                    elementType={input[1].elementType} 
                                    elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                    changed={(event) => this.inputChangeHandler(event, input[0])}
                                    invalid={!input[1].valid}
                                    shouldValidate={input[1].validation}
                                    touched={input[1].touched}
                                    value={input[1].value} 
                                    valueType={input[1].valueType} />
                            );
                        })}
                        <InputSlider onChange={this.inputSliderHandler} 
                            header='Distance' 
                            value={this.state.map.radiusInMiles}
                            maxValue={this.state.map.maxRadius} 
                            valueType='miles (approx)' />
                        <Map height='300px' map={this.state.map} />
                    </form>
                </div>
            </div>
        )
    }
}

export default StepFour;