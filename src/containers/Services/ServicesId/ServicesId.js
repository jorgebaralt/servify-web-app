import React, { Component, Suspense } from 'react';
// import axios from 'axios';
import axios from '../../../axios-services';
// react-router-dom, react-redux, redux-sagas
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { servicesCreator } from '../../../store/actions/';
// Shared
import isString from '../../../shared/isString';
import isObject from '../../../shared/isObject';
import { setImagesArray } from '../../../shared/imagesHandler';
// CSS
import classes from './ServicesId.module.css';
// JSX
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';
import Title from '../../../components/Services/Title/Title';
import Gallery from '../../../components/Services/Gallery/Gallery';
import Reviews from '../../../components/Services/Reviews/Reviews';
import InfoPoint from '../../../components/Services/InfoPoint/InfoPoint';
import InfoSection from '../../../components/Services/InfoSection/InfoSection';
import SocialButtons from '../../../components/Services/SocialButtons/SocialButtons';
import Service from '../../../components/Services/Service/Service';
import Carousel from '../../../components/UI/Carousel/Carousel';
import PhotosCarousel from '../../../components/UI/PhotosCarousel/PhotosCarousel';
import Map, { setMapboxAccessToken, setInitialMapboxPosition, defaultAddress } from '../../../components/UI/Map/Map';
import Separator from '../../../components/UI/Separator/Separator';

// NotFound lazy import in case a service is not found
const NotFound = React.lazy(() => import('../../NotFound/NotFound'));

// Default Image URL if the fetched service has no URLs
const defaultImage = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-20T22%3A51%3A58.066Z_default-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=st0sONUJVHe54MOE0yY902A0gAcBCzSjxch4QbdCXJ0w2LiQgG%2FwZiv9lW6t4lV5zFhpONuNEFPOWIqC%2F1fQgI0qKX4Y1vI6nI14lx%2BYqaR%2Fg0LjIfUPeU5RSm8RJBnWIKSWVhThZT7ewez8XEg2RjIRIVllzdJht%2FRTgwzf4A%2FbsF1SsfaMFkIYH4Ee7vnNmdqOTRTwGqInjLPER9WgalWew7MXxHExGo9%2Fi%2BmIXjAxcC2%2BmTu9Pov%2BBkvfpu37miQTViUTUmE0c3jc17R%2FC816Sdmhg%2F2e8a%2FSUx9k714D5PujzvKldabGnPvwwPTO%2BtCe0yjAsbE5eehLQYEjgw%3D%3D';

class ServicesId extends Component {
    constructor (props) {
        super(props);
        this.myGallery = React.createRef();
        // Mapbox Geocoding
        setMapboxAccessToken();
        props.servicesInit();
        this.state = {
            service: {},
            contact: {},
            ratings: {},
            locationData: {},
            address: null,
            map: {},
            servicesReviewsParams: null,
            loading: true
        }
    }

    setGalleryDimensions = () => {
        this.setState(() => {
            return {
                imageSizes: {
                    width: this.myGallery.current.offsetWidth,
                    height: this.myGallery.current.offsetWidth/(4/3)
                }
            }
        });
    }

    setInitialPosition = (position) => {
        let address;
        if (isObject(position)) {
            address = [position.data.city, position.data.postal, position.data.region, position.data.country].join(' ');
        } else if (isString(position)) { // checks if it's a string
            address = position;
        }
        else {
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
    
    componentDidMount () {
        const serviceId = this.props.match.params.id;
        axios.get('/service', { params: { serviceId: serviceId } })
            .then( response => {
                const data = response.data;
                // Error handling in case there's an empty response
                if (!data) { 
                    return this.setState({
                        loading: false,
                        error: true
                    });
                }
                const images = setImagesArray(data.imagesInfo);
                this.setState( () => {
                    return {
                        loading: false,
                        images: images ? images : [defaultImage],
                        service: {
                            category: data.category.replace('_', ' '),
                            title: data.title,
                            provider: data.provider,
                            description: data.description,
                            providerDescription: data.providerDescription,
                            displayName: data.displayName,
                            address: data.locationData,
                            website: data.website,
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
                        bIsDelivery: data.bIsDelivery,
                        logistic: data.logistic,
                        locationData: {
                            street: data.locationData.street,
                            name: data.locationData.name,
                            city: data.locationData.city,
                            region: data.locationData.region,
                            postalCode: data.locationData.postalCode
                        },
                        address: data.physicalLocation,
                        map: {
                            initialPosition: [data.location._longitude, data.location._latitude],
                            radiusInMiles: data.miles // Initial value
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

    render () {
        const service = (
            <>
                <div className={classes.Container}>
                    <div className={classes.Gallery}>
                        <Gallery>
                            <PhotosCarousel
                                images={this.state.images} />
                        </Gallery>
                    </div>
                    <div className={classes.Information}>
                        <div className={classes.Header}>
                            <div className={classes.CategoryContainer}>
                                <small className={classes.Category}>{this.state.service ? this.state.service.category : null}</small>
                            </div>
                            <Title>{this.state.service ? this.state.service.title : null}</Title>
                        </div>
                        <SocialButtons />
                        <InfoPoint location={this.state.locationData ? this.state.locationData.region : null}/>
                        <InfoPoint logistic={this.state.logistic}/>
                        {this.state.service.website ? <InfoPoint website='bonpreufoods.com'/> : null}
                        {/* 
                            <InfoPoint symbol={<SVG svg='chat' />} info='Services offered in English and Spanish'/> 
                        */}
                        <Separator />
                        <InfoSection 
                            title={this.state.service ? this.state.service.title : null}
                            contact={true}
                            header='About the service'>
                            <div>
                                <p>{this.state.service ? this.state.service.description : null}</p>
                            </div>
                        </InfoSection>
                        <Separator />
                        {this.state.service.provider && this.state.service.providerDescription ?
                            <>
                                <InfoSection
                                    title={this.state.service.provider}
                                    header='About the provider'>
                                    <div>
                                        <p>{this.state.service.providerDescription}</p>
                                    </div>
                                </InfoSection>
                                <Separator />
                            </>
                        : null}
                    </div>
                </div>
                <div className={classes.MapContainer}>
                <Title>Service Location</Title>
                    {/* Only render if there is a physical location */}
                    {this.state.logistic !=='delivery' && this.state.address ? 
                        <div className={classes.Description}>
                            <InfoPoint location={this.state.address}/>
                        </div>
                        : null}
                    <Map className={classes.MapWrapper} map={this.state.map} circle={this.state.bIsDelivery ? true : false} />
                </div>
                <Separator />
                {this.state.ratings ? 
                    <Reviews bShowForm 
                        ratings={this.state.ratings.service} 
                        id={{ serviceId: this.state.service.id}} /> : null}
                {this.props.services.nearServices ? 
                    <>
                        <Separator />
                        <div className={classes.SimilarServices}>
                            <div className={classes.ServicesWrapper}>
                                <Title>Other services near you</Title>
                            </div>
                            <div className={classes.CarouselWrapper}>
                                <div className={classes.CarouselContainer}>
                                    <Carousel>
                                        {Object.values(this.props.services.nearServices).map( (service, index) => {
                                            return (
                                                <Service
                                                    key={index}
                                                    header={service.category.replace("_", " ")}
                                                    title={service.title}
                                                    href={service.id}
                                                    priceRating='0.05'
                                                    ratingAvg={service.rating/5}
                                                    ratingAmount={service.ratingCount}
                                                    image={service.imagesInfo}/>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </>
                : null }
            </>
        )
        return (
            this.state.loading ?
                <LoadingPage />
                : this.state.error ? 
                    <Suspense fallback={<LoadingPage />}><NotFound /></Suspense>
                    : service
        );
    }
}

const mapStateToProps = (state) => {
	return {
        services: state.servicesReducer.services
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		servicesInit: () => dispatch(servicesCreator.servicesInitHandler()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicesId));