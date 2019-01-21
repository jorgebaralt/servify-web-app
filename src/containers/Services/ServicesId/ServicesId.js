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
import SVG from '../../../components/SVG/SVG';

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
        console.log('this.state and props', this.props, this.state)
        const serviceId = this.props.match.params.id;
        axios.get('/getServices', { params: { id: serviceId } })
            .then( response => {
                const data = response.data[0];
                console.log(data)
                // Error handling in case there's an empty response
                if (!data) { 
                    return this.setState({
                        loading: false,
                        error: true
                    });
                }
                const images = setImagesArray(data.imagesInfo);
                console.log(images)
                this.setState( () => {
                    return {
                        loading: false,
                        images: images ? images : [defaultImage],
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
        console.log(this.state)
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
                        <InfoPoint symbol={<SVG svg='location-pin' />} location={this.state.locationData ? this.state.locationData.region : null}/>
                        {/* 
                            <InfoPoint symbol={<SVG svg='location-pin' />} website='bonpreufoods.com'/>
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
                        {this.state.provider ?
                            <>
                                <InfoSection
                                    title={this.state.provider.title}
                                    header='About the provider'>
                                    <div>
                                        <p>{this.state.provider.description}</p>
                                    </div>
                                </InfoSection>
                                <Separator />
                            </>
                        : null}
                    </div>
                </div>
                <div className={classes.MapContainer}>
                    <Title>Service Address</Title>
                    <div className={classes.Description}>
                        <InfoPoint symbol={<SVG svg='location-pin' />} location={this.state.address}/>
                    </div>
                    <Map className={classes.MapWrapper} map={this.state.map} circle />
                </div>
                <Separator />
                {this.state.ratings ? <Reviews ratings={this.state.ratings.service} servicesReviewsParams={this.state.servicesReviewsParams} /> : null}
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