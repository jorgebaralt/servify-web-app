import React, { Component } from 'react';
import axios from 'axios';
import geo from 'mapbox-geocoding';
// CSS
import classes from '../../Publish.module.css';
// JSX
import ReactMapboxGl, { Layer, Feature, Marker , ZoomControl, ScaleControl } from "react-mapbox-gl";
import Separator from '../../../../components/UI/Separator/Separator';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import SVG from '../../../../components/SVG/SVG';

const mapboxPKey = "pk.eyJ1Ijoicm9iZXJ0MDMxMCIsImEiOiJjam5mZjlzZnQwazhuM3BwN283b3Q0ZDFqIn0.xxJ6Db0UXKmKp3_Z6I_low";

// Mapbox Geocoding
geo.setAccessToken(mapboxPKey);
// Mapbox Component
const Map = ReactMapboxGl({
    accessToken: mapboxPKey,
    dragRotate: false,
    interactive: true,
    minZoom: 7.5,
});

const metersToPixelsAtMaxZoom = (meters = 6000, latitude) => {
    return meters / 0.075 / Math.cos(latitude * Math.PI / 180);
}

class StepFour extends Component {
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
        formIsValid: false,
        geoData: null
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
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
        // Mapbox coordinate update
        let delayTimer;
        const doSearch = (address) => {
            clearTimeout(delayTimer);
            delayTimer = setTimeout( () => {
                geo.geocode('mapbox.places', address, (err, geoData) => {
                    this.setState( () => {
                        return {
                            geoData: geoData
                        }
                    });
                });
            }, 4000); // 4s delay
        }
        doSearch(event.target.value);
    }

    savePosition = (position) => {
        const address = [position.data.city, position.data.postal, position.data.region, position.data.country].join(' ');
        geo.geocode('mapbox.places', address, (err, geoData) => {
            this.setState( () => {
                return {
                    geoData: geoData
                }
            });
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
                            className={classes.HiddenInput} hidden={true} 
                            type="text" 
                            value={this.state.geoData ? this.state.geoData.features[0].center : null} />
                        {formElementsArray.map( (input) => {
                            return <Input 
                                style={input[1].style}
                                key={input[0]} 
                                elementType={input[1].elementType} 
                                elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                changed={(event) => this.inputChangeHandler(event, input[0])}
                                invalid={!input[1].valid}
                                shouldValidate={input[1].validation}
                                touched={input[1].touched}
                                value={input[1].value} 
                                valueType={input[1].valueType} />;
                        })}
                        <div className={classes.MapWrapper}>
                            <Map style="mapbox://styles/mapbox/streets-v9"
                                center={this.state.geoData ? this.state.geoData.features[0].center : [-81.39636489999998, 28.4807739]}
                                containerStyle={{
                                    height: "100%",
                                    width: "100%"
                                }}
                                flyToOptions={{
                                    speed: 5
                                }}
                                >
                                {/* <Layer
                                type="circle"
                                id="marker"
                                layout={{ "icon-image": "marker-15" }}>
                                    <Feature
                                    coordinates={this.state.geoData ? this.state.geoData.features[0].center : [-81.39636489999998, 28.4807739]}

                                        />
                                </Layer> */}
                                {this.state.geoData ? 
                                    <Layer
                                        type="circle" 
                                        id="marker" 
                                        paint={{
                                            'circle-color': "transparent",
                                            'circle-radius': {
                                                stops: [
                                                    [0, 0],
                                                    [20, metersToPixelsAtMaxZoom(this.state.radiusInMeters, this.state.geoData.features[0].center[1])]
                                                ],
                                                base: 2
                                            },
                                            'circle-stroke-width': 2,
                                            'circle-stroke-color': '#484848',
                                            'circle-stroke-opacity': 1
                                        }}>
                                        <Feature
                                            coordinates={this.state.geoData ? this.state.geoData.features[0].center : [-81.39636489999998, 28.4807739]} />
                                    </Layer>
                                : null}
                                <Marker
                                    coordinates={this.state.geoData ? this.state.geoData.features[0].center : [-81.39636489999998, 28.4807739]}
                                    anchor="bottom">
                                    <SVG svg='location-pin' />
                                </Marker>
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