import React, { Component, Suspense } from 'react';
// Worker functions
import defaultImage from '../../../../shared/defaultServiceImage';
import { setImagesArray } from '../../../../shared/imagesHandler';
import { parseLocationData } from '../../../../shared/parseLocationData';
// Axios, Router & Redux
import axios from '../../../../axios-services';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// CSS
import classes from './PublicationsId.module.css';
// JSX
import LoadingPage from '../../../../components/UI/LoadingPage/LoadingPage';
import { setMapboxAccessToken, defaultAddress } from '../../../../components/UI/Map/Map';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Button from '../../../../components/UI/Button/Button';
import Separator from '../../../../components/UI/Separator/Separator';
import Edit from './Edit/Edit';

// NotFound lazy import in case a service is not found, or the user does not owns the service
const NotFound = React.lazy(() => import('../../../NotFound/NotFound'));

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
        title: null,
        infoPoints: null,
        infoSections: null,
        service: null,
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

    onSubmitChangesHandler = async () => {
        const updatedService = await {
            // Basic Information
            title: this.state.title,
            provider: this.state.infoSections.provider.title,
            website: this.state.infoPoints.website, // (Optional)
            phone: this.state.contact.phone, // (Optional)
            contactEmail: this.state.contact.email, // (Optional)
            // Details
            description: this.state.infoSections.service.info,
            providerDescription: this.state.infoSections.provider.info,
            // Images (Optional)
            imagesInfo: this.state.images, // Images is the variable handed back by Edit.js component
            // Logistic
            isDelivery: this.state.isDelivery,
            logistic: this.state.logistic,
            // Service Address
            locationData: this.state.locationData,
            zipCode: this.state.locationData.postalCode,
            // The Map
            miles: this.state.map.radiusInMiles,
            physicalLocation: this.state.physicalLocation,
            geolocation: {
                // Geolocation provides data to a constructor that returns
                // coordinates to calculate points between services, distante 
                // to the current location of the user, fetching close services 
                // and such.
                latitude: this.state.map.initialPosition[1],
                longitude: this.state.map.initialPosition[0]
            }
        }
        try {
            const serviceId = await this.props.match.params.id;
            await axios.put('/service', { serviceId: serviceId, updatedService: updatedService });
            await toast.success('Your changes were submitted successfully.');
        } catch (error) {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    bIsEditingHandler = (bool) => {
        this.setState( {
            bIsEditing: bool
        });
    }

    updateValidity = (formIsValid) => {
        this.setState({
            formIsValid: formIsValid
        });
    }

    handleData = (data) => {
        if (data) {
            // Error handling in case there's an empty response
            if (data.uid !== this.props.userDetails.uid) { 
                return this.setState({
                    loading: false,
                    error: true
                });
            } else {
                const images = setImagesArray(data.imagesInfo);
                this.setState( () => {
                    return {
                        loading: false,
                        images: images ? images : [defaultImage(data.category)],
                        imagesInfo: data.imagesInfo,
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
                                title: data.provider,
                                header: 'About the provider',
                                info: data.providerDescription
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
                        isDelivery: data.isDelivery,
                        logistic: data.logistic,
                        physicalLocation: parseLocationData(data.locationData),
                        map: {
                            initialPosition: [data.location._longitude, data.location._latitude],
                            geoData: null,
                            radiusInMiles: data.miles, // Initial value
                            maxRadius: 60 // For the input slider
                        },
                        serviceId: data.id
                    }
                });
            }
        }
    }

    updateData = async (updatedService, fn) => {
        try {
            const serviceId = await this.props.match.params.id;
            const response = await axios.put('/service', { serviceId: serviceId, updatedService: updatedService });
            await this.handleData(response.data);
            if (fn) {
                await fn();
            }
            await toast.success('Your changes were submitted successfully.');
        } catch (error) {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    fetchData = () => {
        const serviceId = this.props.match.params.id;
        axios.get('/service', { params: { serviceId: serviceId } })
            .then( response => {
                this.handleData(response.data);
            })
            .catch( () => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    // To update state from the Edit.js container
    updateState = (newState) => {
        this.setState({...newState});
    }

    componentDidMount () {
        this.fetchData();        
    }

    shouldComponentUpdate(_, nextState) {
        return nextState !== this.state;
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
            default:
                return <Edit
                    handleData={this.handleData} 
                    updateData={this.updateData} 
                    updateValidity={this.updateValidity} 
                    updateState={this.updateState} 
                    {...this.state} />;
        }
    }

    render() {
        let tabsClasses = [classes.TabsContainer, classes.Edit];
        if (!this.state.bIsEditing) {
            tabsClasses.push(classes.Preview);
        }
        /**
         * If there is an error then no JSX will be rendered except the NotFound page.
         * The only ways for there to be an error is for there to be no data fetched
         * from the backend database or if the service is not owned by the current user.
         */
        return (
            this.state.error ? 
                <NotFound />
                : <div className={classes.Wrapper}>
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
                            {/* <SubmitButton disabled={!this.state.formIsValid} clicked={this.onSubmitChangesHandler} /> */}
                            {this.state.bIsEditing ?
                                <PreviewButton clicked={this.onPreviewChangesHandler} />
                                : <SubmitButton disabled={false} clicked={this.onSubmitChangesHandler} />
                            }
                        </div>
                    </div>
                    <div className={classes.ViewLink}>
                        <Link style={{width: '100%'}} to={['/services',this.state.serviceId].join('/')}>
                            <Button blockButton type='default'>Go to service</Button>
                        </Link>
                    </div>
                    <Separator />
                    <div className={classes.Container}>
                        {this.onRenderHandler()}
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

export default withRouter(connect(mapStateToProps)(PublicationsId));