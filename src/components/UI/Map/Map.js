import React from 'react';
import geo from 'mapbox-geocoding';
// CSS
import classes from './Map.module.css';
// JSX
import ReactMapboxGl, { Layer, Feature, Marker , ZoomControl, ScaleControl, Popup } from "react-mapbox-gl";
import SVG from '../../SVG/SVG';

const mapboxPKey = "pk.eyJ1Ijoicm9iZXJ0MDMxMCIsImEiOiJjam5mZjlzZnQwazhuM3BwN283b3Q0ZDFqIn0.xxJ6Db0UXKmKp3_Z6I_low";

// Mapbox Geocoding
export const setMapboxAccessToken = () => {
    geo.setAccessToken(mapboxPKey);
}

// Set Initial Position
export const setInitialMapboxPosition = (address, fn) => {
    return (
        geo.geocode('mapbox.places', address, (err, geoData) => {
            const map = {
                geoData: geoData,
                initialPosition: geoData.features[0].center
            }
            fn(map);
        })
    );
}

// Get Address
export const setAddress = (address, fn) => {
    return (
        geo.geocode('mapbox.places', address, (err, geoData) => {
            const map = {
                geoData: geoData
            }
            fn(map);
        })
    );
}

// Mapbox Component
const Map = ReactMapboxGl({
    accessToken: mapboxPKey,
    dragRotate: false,
    interactive: true
});

const metersToPixelsAtMaxZoom = (miles, latitude) => {
    const milesToMeters = 1609.34;
    return miles*milesToMeters / 0.075 / Math.cos(latitude * Math.PI / 180);
}

const map = (props) => {
    const mapClasses = [classes.Wrapper];
    if (props.className) {
        mapClasses.push(props.className);
    }
    const style = {
        width: props.width,
        height: props.height
    }
    return (
        <div style={style} className={mapClasses.join(' ')}>
            {/* Prevent Map from loading until the initial position */}
            {props.map.initialPosition !== null ? 
                <Map style="mapbox://styles/mapbox/streets-v9"
                    center={props.map.geoData ?
                        (
                            props.map.geoData.features.length > 0 ?
                                props.map.geoData.features[0].center
                                : props.map.initialPosition
                        )
                        : props.map.initialPosition}
                    containerStyle={{
                        height: "100%",
                        width: "100%"
                    }}
                    zoom={[11]}
                    flyToOptions={{
                        zoom: 9,
                        speed: 1.5,
                        curve: 1,
                        easing: (t) => {
                            return t;
                        }
                    }}>
                    {props.map.geoData ?
                        (
                        props.map.geoData.features.length > 0 ?
                            <Layer
                                type="circle" 
                                id="marker" 
                                paint={{
                                    'circle-color': 'rgba(30,163,204, 0.1)',
                                    'circle-radius': {
                                        stops: [
                                            [0, 0],
                                            [20, metersToPixelsAtMaxZoom(props.map.radiusInMiles, props.map.geoData.features[0].center[1])]
                                        ],
                                        base: 2
                                    },
                                    'circle-stroke-width': 2,
                                    'circle-stroke-color': '#484848',
                                    'circle-stroke-opacity': 1
                                }}>
                                <Feature
                                    coordinates={props.map.geoData ? props.map.geoData.features[0].center : props.map.initialPosition} />
                            </Layer>
                            : null
                        )
                        : null}
                    <Marker
                        coordinates={props.map.geoData ?
                        (
                            props.map.geoData.features.length > 0 ?
                                props.map.geoData.features[0].center
                                : props.map.initialPosition
                        )
                        : props.map.initialPosition}
                        anchor="bottom">
                        <SVG svg='location-pin' />
                    </Marker>
                    {props.map.geoData ?
                    (
                        props.map.geoData.features.length === 0 ?
                            <Popup
                                coordinates={props.map.initialPosition}
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
            : null}
        </div>
    );
}

export default map;