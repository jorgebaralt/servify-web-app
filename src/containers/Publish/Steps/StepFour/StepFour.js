import React, { Component } from 'react';
import axios from 'axios';
import geo from 'mapbox-geocoding';
// CSS
import classes from '../../Publish.module.css';
// JSX
import ReactMapboxGl, { Layer, Feature, Marker , ZoomControl, ScaleControl, Popup } from "react-mapbox-gl";
import Separator from '../../../../components/UI/Separator/Separator';
import Input from '../../../../components/UI/Input/Input';
import InputSlider from '../../../../components/UI/Input/InputSlider/InputSlider';
import Button from '../../../../components/UI/Button/Button';
import SVG from '../../../../components/SVG/SVG';

const mapboxPKey = "pk.eyJ1Ijoicm9iZXJ0MDMxMCIsImEiOiJjam5mZjlzZnQwazhuM3BwN283b3Q0ZDFqIn0.xxJ6Db0UXKmKp3_Z6I_low";

// Mapbox Geocoding
geo.setAccessToken(mapboxPKey);
// Mapbox Component
const Map = ReactMapboxGl({
    accessToken: mapboxPKey,
    dragRotate: false,
    interactive: true
});

const metersToPixelsAtMaxZoom = (meters, latitude) => {
    const milesToMeters = 1609.34;
    return meters*milesToMeters / 0.075 / Math.cos(latitude * Math.PI / 180);
}

class StepFour extends Component {
    constructor(props) {
        super(props);
        this.myTimer = null;
    }
    state = {
        controls: {
            title: {
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
                valueType: 'text',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                style: {marginTop: '22px'}
            }
        },
        map: {
            initialPosition: [0,0], // Initialize value, can't be null
            geoData: null,
            radiusInMiles: 60
        },
        formIsValid: false
    }

    // Mapbox coordinate update
    debouncedSearch = (address) => {
        clearTimeout(this.myTimer);
        this.myTimer = setTimeout( () =>  {
            geo.geocode('mapbox.places', address, (err, geoData) => {
                this.setState( (prevState) => {
                    return {
                        map: {
                            ...prevState.map,
                            geoData: geoData
                        }
                    }
                });
            });
        }, 1500);
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

    savePosition = (position) => {
        const address = [position.data.city, position.data.postal, position.data.region, position.data.country].join(' ');
        geo.geocode('mapbox.places', address, (err, geoData) => {
            this.setState( (prevState) => {
                return {
                    map: {
                        ...prevState.map,
                        geoData: geoData,
                        initialPosition: geoData.features[0].center
                    }
                }
            });
        });
    }

    onInputSliderHandler = (event) => {
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

    componentWillMount () {
        axios.get('http://ipinfo.io').then(
            (response) => this.savePosition(response)
        );
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <div style={{backgroundColor: 'lightorange'}} className={classes.Container}>
                <div className={classes.Form}>
                    <div className={classes.Step}><span>S</span>tep 4</div>
                    <h2>
                        Finally we need to get your address. This is to let customers now where you are located.
                        Type your address into the input box, then wait for the map to update.
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
                        <InputSlider onChange={this.onInputSliderHandler} header='Distance' value={this.state.map.radiusInMiles} valueType='miles' />
                        <div className={classes.MapWrapper}>
                            <Map style="mapbox://styles/mapbox/streets-v9"
                                center={this.state.map.geoData ?
                                    (
                                        this.state.map.geoData.features.length > 0 ?
                                            this.state.map.geoData.features[0].center
                                            : [0,0]
                                    )
                                    : this.state.map.initialPosition}
                                containerStyle={{
                                    height: "100%",
                                    width: "100%"
                                }}
                                zoom={[11]}
                                flyToOptions={{
                                    zoom: 9,
                                    speed: 0.8,
                                    curve: 1,
                                    easing: (t) => {
                                        return t;
                                    }
                                }}>
                                {this.state.map.geoData ?
                                    (
                                    this.state.map.geoData.features.length > 0 ?
                                        <Layer
                                            type="circle" 
                                            id="marker" 
                                            paint={{
                                                'circle-color': "transparent",
                                                'circle-radius': {
                                                    stops: [
                                                        [0, 0],
                                                        [20, metersToPixelsAtMaxZoom(this.state.map.radiusInMiles, this.state.map.geoData.features[0].center[1])]
                                                    ],
                                                    base: 2
                                                },
                                                'circle-stroke-width': 2,
                                                'circle-stroke-color': '#484848',
                                                'circle-stroke-opacity': 1
                                            }}>
                                            {/* {console.log('inside layer feature circle')} */}
                                            <Feature
                                                coordinates={this.state.map.geoData ? this.state.map.geoData.features[0].center : this.state.map.initialPosition} />
                                        </Layer>
                                        : null
                                    )
                                    : null}
                                <Marker
                                    coordinates={this.state.map.geoData ?
                                    (
                                        this.state.map.geoData.features.length > 0 ?
                                            this.state.map.geoData.features[0].center
                                            : [0,0]
                                    )
                                    : this.state.map.initialPosition}
                                    anchor="bottom">
                                    <SVG svg='location-pin' />
                                </Marker>
                                {this.state.map.geoData ?
                                (
                                    this.state.map.geoData.features.length === 0 ?
                                        <Popup
                                            coordinates={[0,0]}
                                            offset={{
                                                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                                            }}>
                                            <h2>Not found.</h2>
                                        </Popup>
                                        : null
                                )
                                : null}
                                <ZoomControl/>
                                <ScaleControl position="top-left" />
                            </Map>
                        </div>
                        <Button type='primary' disabled={!this.state.formIsValid}>Next</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default StepFour;