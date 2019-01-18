import React, { Component } from 'react';
import axios from 'axios';
// redux-sagas
import { connect } from 'react-redux';
import { servicesCreator } from '../../../store/actions/';
// Shared
import isString from '../../../shared/isString';
import isObject from '../../../shared/isObject';
// CSS
import classes from './ServicesId.module.css';
// JSX
import ReactResizeDetector from 'react-resize-detector';
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

class ServicesId extends Component {
    constructor (props) {
        super(props);
        this.myGallery = React.createRef();
        // Mapbox Geocoding
        setMapboxAccessToken();
        props.servicesInit();
    }

    state = {
        imageSizes: {
            width: null,
            height: null
        },
        address: defaultAddress,
        map: {
            initialPosition: null,
            geoData: null,
            radiusInMiles: 4, // Initial value
            maxRadius: 60 // For the input slider
        },
        rating: {
            totalReviews: 3,
            avg: 5
        },
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
        axios.get('http://ipinfo.io').then(
            (response) => this.setInitialPosition(response)
        ).catch(
            () => this.setInitialPosition()
        );
    }

    render () {
        return (
            <>
                <div className={classes.Container}>
                    <Gallery reference={this.myGallery}>
                        <ReactResizeDetector handleWidth handleHeight onResize={this.setGalleryDimensions} />
                        <PhotosCarousel
                            dimensions={this.state.imageSizes}
                            images={[
                                    'https://images.unsplash.com/photo-1531817506236-027915e5b07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                                    'https://images.unsplash.com/photo-1516788875874-c5912cae7b43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80',
                                    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                                    'https://images.unsplash.com/photo-1519781542704-957ff19eff00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1146&q=80',
                                    'https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=916&q=80',
                                ]} />
                    </Gallery>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Header}>
                            <div className={classes.CategoryContainer}>
                                <small className={classes.Category}>Home Service</small>
                            </div>
                            <Title>Service Title</Title>
                        </div>
                        <SocialButtons />
                        <InfoPoint symbol={<SVG svg='location-pin' />} location='Florida'/>
                        <InfoPoint symbol={<SVG svg='location-pin' />} website='bonpreufoods.com'/>
                        <InfoPoint symbol={<SVG svg='chat' />} info='Services offered in English and Spanish'/>
                        <Separator />
                        <InfoSection 
                            title='Service'
                            contact={true}
                            header='About the service'>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </InfoSection>
                        <Separator />
                        <InfoSection
                            title='Servify'
                            header='About the provider'>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </InfoSection>
                        <Separator />
                    </div>
                </div>
                <div className={classes.MapContainer}>
                    <Title>Service Address</Title>
                    <div className={classes.Description}>
                        <InfoPoint symbol={<SVG svg='location-pin' />} location={this.state.address}/>
                    </div>
                    <Map className={classes.MapWrapper} map={this.state.map} />
                </div>
                <Separator />
                <Reviews rating={this.state.rating} />
                { this.props.services.nearServices ? 
                    <>
                        <Separator />
                        <div className={classes.SimilarServices}>
                            <div className={classes.ServicesWrapper}>
                                <Title>Similar services near you</Title>
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
                                                    image={service.image}/>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </>
                    : null}
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesId);