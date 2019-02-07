import React from 'react';
import geo from 'mapbox-geocoding';
// CSS
import classes from './Map.module.css';
// Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// JSX
import ReactMapboxGl, { Layer, Feature, Marker , ZoomControl, ScaleControl } from "react-mapbox-gl";
import SVG from '../../SVG/SVG';

const mapboxPKey = "pk.eyJ1Ijoicm9iZXJ0MDMxMCIsImEiOiJjanFpZjNmZnMwZzFqNDJyMGdmaTJwYWtpIn0.bUv0BRK5nRmmYMp61buDUg";

// Mapbox Geocoding
export const setMapboxAccessToken = () => {
    geo.setAccessToken(mapboxPKey);
}

export const defaultAddress = 'Orlando 32810 Florida USA';

// Set Initial Position
export const setInitialMapboxPosition = (address, fn, bNotifyToast = true) => {
    return (
        geo.geocode('mapbox.places', address, (err, geoData) => {
            if (err && bNotifyToast) {
                toast.error(err);
            }
            const map = {
                geoData: geoData,
                initialPosition: geoData.features[0].center
            }
            if (!fn) { return map; }
            fn(map);
        })
    );
}

// Get Address
export const setAddress = (address, fn, bNotifyToast = true) => {
    return (
        geo.geocode('mapbox.places', address, (err, geoData) => {
            if (err && bNotifyToast) {
                toast.error(err);
            }
            if (geoData && bNotifyToast) {
                if (!geoData.features.length > 0) {
                    toast.error('No address was found');
                }
            }
            const map = {
                geoData: geoData
            }
            if (!fn) { return map; }
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
    let flyToSettings;
    if (props.flyToSettings) {
        flyToSettings = props.flyToSettings
    }
    flyToSettings = {
        zoom: 13,
        speed: 15,
        curve: 1,
        easing: (t) => {
            return t;
        }
    }
    const styles = {map: "mapbox://styles/mapbox/streets-v9"};
    let myMap = (
        <Map style={styles.map}
            center={props.map.geoData ?
                (
                    props.map.geoData.features.length ?
                        props.map.geoData.features[0].center
                        : props.map.initialPosition
                )
                : props.map.initialPosition}
            containerStyle={{
                height: "100%",
                width: "100%"
            }}
            zoom={[11]}
            flyToOptions={flyToSettings}>
            {props.map.geoData ?
                (
                props.map.geoData.features.length && props.circle ?
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
                        <Feature coordinates={props.map.geoData.features[0].center} />
                    </Layer>
                    : null
                )
                : props.map.initialPosition && props.circle ? 
                    <Layer
                        type="circle" 
                        id="marker" 
                        paint={{
                            'circle-color': 'rgba(30,163,204, 0.1)',
                            'circle-radius': {
                                stops: [
                                    [0, 0],
                                    [20, metersToPixelsAtMaxZoom(props.map.radiusInMiles, props.map.initialPosition[1])]
                                ],
                                base: 2
                            },
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#484848',
                            'circle-stroke-opacity': 1
                        }}>
                        <Feature coordinates={props.map.initialPosition} />
                    </Layer>
                    : null }
            <Marker
                coordinates={props.map.geoData ?
                (
                    props.map.geoData.features.length ?
                        props.map.geoData.features[0].center
                        : props.map.initialPosition
                )
                : props.map.initialPosition}
                anchor="bottom">
                <SVG svg='location-pin' />
            </Marker>
            <ZoomControl/>
            <ScaleControl position="top-left" />
        </Map>
    )

    if (props.map.geoData) {
        if (!Array.isArray(props.map.geoData.features) || !props.map.geoData.features.length) {
            myMap = null;
        }
    } else if (!Array.isArray(props.map.initialPosition) || !props.map.initialPosition.length) {
        myMap = null;
    }

    return (
        <div style={style} className={mapClasses.join(' ')}>
            {/* Map won't load unless there is an initial position or geoData */}
            {myMap}
        </div>
    );
}

export default map;