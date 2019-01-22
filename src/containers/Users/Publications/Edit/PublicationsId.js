import React, { Component, Suspense } from 'react';
// Shared
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
const defaultImage = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-20T22%3A51%3A58.066Z_default-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=st0sONUJVHe54MOE0yY902A0gAcBCzSjxch4QbdCXJ0w2LiQgG%2FwZiv9lW6t4lV5zFhpONuNEFPOWIqC%2F1fQgI0qKX4Y1vI6nI14lx%2BYqaR%2Fg0LjIfUPeU5RSm8RJBnWIKSWVhThZT7ewez8XEg2RjIRIVllzdJht%2FRTgwzf4A%2FbsF1SsfaMFkIYH4Ee7vnNmdqOTRTwGqInjLPER9WgalWew7MXxHExGo9%2Fi%2BmIXjAxcC2%2BmTu9Pov%2BBkvfpu37miQTViUTUmE0c3jc17R%2FC816Sdmhg%2F2e8a%2FSUx9k714D5PujzvKldabGnPvwwPTO%2BtCe0yjAsbE5eehLQYEjgw%3D%3D';

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
            title: this.state.title,
            // phone: (754) 215 - 8233,
            imagesInfo: this.state.images, // Images is the variable handled back by Edit.js component
            description: this.state.service.info,
            // zipCode: 33351,
            miles: this.state.map.radiusInMiles,
            // email: robertmolina0310@gmail.com,
            location: {
                _latitude: this.state.map.initialPosition[1],
                _longitude: this.state.map.initialPosition[0]
            },
            // locationData:
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
            if (data.email !== this.props.userEmail) { 
                return this.setState({
                    loading: false,
                    error: true
                });
            } else {
                console.log('on handleData', data);
                const images = setImagesArray(data.imagesInfo);
                this.setState( () => {
                    return {
                        loading: false,
                        images: images ? images : [defaultImage],
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
                        // TODO determine if needed
                        rawData: data
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
                console.log(response.data);
                this.handleData(response.data);
            })
            .catch( () => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    updateState = (newState) => {
        this.setState({...newState});
    }

    componentDidMount () {
        this.fetchData();        
    }

    shouldComponentUpdate(nextProps, nextState) {
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
        console.log(this.state)
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