import React, { Component, Suspense } from 'react';
// Shared
import isString from '../../../../shared/isString';
import isObject from '../../../../shared/isObject';
import { setImagesArray } from '../../../../shared/imagesHandler';
// Axios, Router & Redux
import axios from '../../../../axios-services';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// CSS
import classes from './PublicationsId.module.css';
// JSX
import LoadingPage from '../../../../components/UI/LoadingPage/LoadingPage';
import { setMapboxAccessToken, defaultAddress } from '../../../../components/UI/Map/Map';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Button from '../../../../components/UI/Button/Button';
import Edit from './Edit/Edit';

// NotFound lazy import in case a service is not found, or the user does not owns the service
const NotFound = React.lazy(() => import('../../../NotFound/NotFound'));

// Default Image URL if the fetched service has no URLs
const defaultImage = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-12T06%3A37%3A57.360Zdefault-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=VK1PwozcAgxOAYJH6%2FBnDqnSFavcUu0%2FbbWbOgowvx629SQ860EcW4l6YQpE08cu8q1XrsQW0KsLp%2BxAAOoHOomPVmZfGapqZlb821nyjFlN5aMdgTVPbTrWAScfVs3H4%2BJZLOqAZatqPw96blxY%2FIwrbu4dj0q6elQ%2FzRRqG5wLO5fkUvOTG18xF8DfZkTViHxaNiqD%2FPQS69sPRcMnF69%2BQGjC2ZecNbMeatufctbb95%2FL7%2FSJaIgO98HyZ8WJ9ZFxJbl7bqkHV3ptAMP5c8OIfCHeLqfKVtjoW6AmrnXh3LQXCY8GUOTbB09XwzUjggA6TpUuHblEd34p452%2BaA%3D%3D';

const PreviewButton = (props) => <Button clicked={props.clicked} type='default'>Preview changes</Button>;
const SubmitButton = (props) => <Button disabled={props.disabled} clicked={props.clicked} type='default'>Save changes</Button>;

class PublicationsId extends Component {
    constructor (props) {
        super(props);
        // Mapbox Geocoding
        setMapboxAccessToken();
        this.mySpinner = (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );
    }
    state = {
        loading: true,
        bIsEditing: true,
        error: false,
        images: [],
        category: null,
        title: null,
        infoPoints: null,
        infoSections: null,
        address: defaultAddress,
        map: {
            initialPosition: null,
            geoData: null,
            radiusInMiles: null, // Initial value
            maxRadius: 60 // For the input slider
        },
        rating: {
            price: null,
            service: null
        },
        formIsValid: true
    }

    onPreviewChangesHandler = () => {
        if (this.state.bIsEditing) {
            this.setState({
                bIsEditing: false
            });
        }
    }

    onSubmitChangesHandler = () => {
        toast.success('Your changes were submitted successfully.');
    }

    bIsEditingHandler = (bool) => {
        this.setState( {
            bIsEditing: bool
        });
    }
    
    onRenderHandler = () => {
        switch (true) {
            case this.state.loading:
                return <LoadingPage />;
            case !this.state.bIsEditing:
                const Preview = React.lazy( () => import('./Preview/Preview'));
                const Component = () => {
                    return (
                        <Suspense fallback={this.mySpinner}>
                            <Preview {...this.state} />
                        </Suspense>
                    )
                }
                return <Component />;
            case !this.state.map.initialPosition:
                return this.mySpinner;
            case this.state.error:
                return <NotFound />
            default:
                return <Edit updateValidity={this.updateValidity} updateState={this.updateState} {...this.state} />;
        }
    }

    updateValidity = (formIsValid) => {
        this.setState({
            formIsValid: formIsValid
        });
    }

    updateState = (newState) => {
        this.setState({...newState})
    }

    componentDidMount () {
        const serviceId = this.props.match.params.id;
        axios.get('/getServices', { params: { id: serviceId } })
            .then( response => {
                const data = response.data[0];
                // Error handling in case there's an empty response
                if (!data || data.email !== this.props.userEmail) { 
                    return this.setState({
                        loading: false,
                        error: true
                    });
                }
                console.log(data); 
                const images = setImagesArray(data.imagesInfo);
                this.setState( () => {
                    return {
                        loading: false,
                        images: images ? images : [defaultImage],
                        title: data.title,
                        infoPoints: {
                            state: data.locationData.region,
                            website: data.website,
                            languages: data.languages
                        },
                        infoSections: {
                            service: {
                                title: data.title,
                                contact: true,
                                header: 'About the service',
                                info: data.description
                            },
                            provider: {
                                title: 'Servify',
                                header: 'About the provider',
                                info: data.provider
                            },
                        },
                        service: {
                            category: data.category.replace('_', ' '),
                            title: data.title,
                            description: data.description,
                            displayName: data.displayName,
                            address: data.locationData,
                            id: data.id,
                        },
                        contact: {
                            phone: data.phone,
                            email: data.email,
                        },
                        ratings: {
                            price: {
                                price: data.price,
                                priceCount: data.priceCount,
                                priceSum: data.priceSum
                            },
                            service: {
                                rating: data.rating,
                                ratingCount: data.ratingCount,
                                ratingSum: data.ratingSum
                            }
                        },
                        locationData: {
                            city: data.locationData.city,
                            country: data.locationData.country,
                            isoCountryCode: data.locationData.isoCountryCode,
                            name: data.locationData.name,
                            postalCode: data.locationData.postalCode,
                            region: data.locationData.region,
                            street: data.locationData.street
                        },
                        address: [
                            data.locationData.street,
                            data.locationData.street ? ', ' : null,
                            data.locationData.name, 
                            data.locationData.name ? '. ' : null,
                            data.locationData.city, 
                            data.locationData.city ? ', ' : null,
                            data.locationData.region, 
                            data.locationData.region ? ' ' : null,
                            data.locationData.postalCode,
                            ].join(''),
                        map: {
                            initialPosition: [data.location._longitude, data.location._latitude],
                            geoData: null,
                            radiusInMiles: data.miles, // Initial value
                            maxRadius: 60 // For the input slider
                        },
                        // TODO remove
                        servicesReviewsParams: data
                    }
                });
            })
            .catch( () => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    render() {
        let tabsClasses = [classes.TabsContainer, classes.Edit];
        if (!this.state.bIsEditing) {
            tabsClasses.push(classes.Preview);
        }
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Navbar}>
                    <div className={classes.TabsWrapper}>
                        <div className={tabsClasses.join(' ')}>
                            <div className={[classes.Tab, this.state.bIsEditing ? classes.Active : null].join(' ')}>
                                <button className={classes.Button} onClick={() => this.bIsEditingHandler(true)}>Edit</button>
                            </div>
                            <div className={[classes.Tab, !this.state.bIsEditing ? classes.Active : null].join(' ')}>
                                <button className={classes.Button} onClick={() => this.bIsEditingHandler(false)}>Preview</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Submit}>
                        {this.state.bIsEditing ?
                            <PreviewButton clicked={this.onPreviewChangesHandler} />
                            : <SubmitButton disabled={!this.state.formIsValid} clicked={this.onSubmitChangesHandler} />
                        }
                    </div>
                </div>
                <div className={classes.Container}>
                    {this.onRenderHandler()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userEmail: state.authReducer.userEmail
	};
};

export default withRouter(connect(mapStateToProps)(PublicationsId));