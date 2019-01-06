import React, { Component } from 'react';
import axios from 'axios';
import isString from '../../../shared/isString';
import isObject from '../../../shared/isObject';
// CSS
import classes from './ServicesId.module.css';
// JSX
import ReactResizeDetector from 'react-resize-detector';
import PhotosCarousel from '../../../components/UI/PhotosCarousel/PhotosCarousel';
import Map, { setMapboxAccessToken, setInitialMapboxPosition, defaultAddress } from '../../../components/UI/Map/Map';
import SVG from '../../../components/SVG/SVG';
import Review from '../../../components/Services//Review/Review';
import Carousel from '../../../components/UI/Carousel/Carousel';
import Service from '../../../components/Services/Service/Service'
import Rating from '../../../components/UI/Rating/Rating';
import InfoPoint from '../../../components/Services/InfoPoint/InfoPoint';
import InfoSection from '../../../components/Services//InfoSection/InfoSection';

class ServicesId extends Component {
    constructor (props) {
        super(props);
        this.myGallery = React.createRef();
        // Mapbox Geocoding
        setMapboxAccessToken();
    }

    state = {
        imageSizes: {
            width: null,
            height: null
        },
        map: {
            initialPosition: null,
            geoData: null,
            radiusInMiles: 20
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
        axios.get('http://ipinfo.io').then(
            (response) => this.setInitialPosition(response)
        ).catch(
            () => this.setInitialPosition()
        );
    }

    render () {
        return (
            <>
                <div className={classes.ServiceContainer}>
                    <div className={classes.GalleryWrapper}>
                        <div ref={this.myGallery}
                            className={classes.GalleryContainer}>
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
                        </div>
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.HeaderContent}>
                            <div className={classes.CategoryContainer}>
                                <small className={classes.Category}>Home Service</small>
                            </div>
                            <div className={classes.TitleContainer}>
                                <div className={classes.Title}>
                                    <h1 tabIndex="-1">Service Title</h1>
                                </div>
                            </div>
                        </div>
                        <div className={classes.ShareButtons}>
                            <div className={classes.Share}>
                                <button className={classes.ShareButton}>
                                    <SVG svg='share' />
                                </button>
                            </div>
                            <button className={classes.ShareButton}>
                                <SVG svg='favorite' />
                            </button>
                        </div>
                        <InfoPoint symbol={<SVG svg='location-pin' />} location='Florida'/>
                        <InfoPoint symbol={<SVG svg='location-pin' />} website='bonpreufoods.com'/>
                        <InfoPoint symbol={<SVG svg='chat' />} info='Services offered in English and Spanish'/>
                        <div className={classes.SeparatorWrapper}><div  className={classes.Separator}/></div>
                        <InfoSection 
                            title='Service'
                            contact={true}
                            header='About the service'>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </InfoSection>
                        <div className={classes.SeparatorWrapper}><div  className={classes.Separator}/></div>
                        <InfoSection
                            title='Servify'
                            header='About the provider'>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </InfoSection>
                    </div>
                </div>
                <div className={classes.SectionSeparator}><div className={classes.SectionSeparatorLine}><div/></div></div>
                <Map className={classes.MapWrapper} map={this.state.map} />
                <div className={classes.SectionSeparator}><div className={classes.SectionSeparatorLine}><div/></div></div>
                <div className={classes.ReviewsWrapper}>
                    <div className={classes.ReviewsContainer}>
                        <div className={classes.RatingsWrapper}>
                            <div className={classes.RatingsContainer}>
                                <section>
                                    <div className={classes.RatingsHeader}> 
                                        {/* TODO Make dynamic */}
                                        <h1 tabIndex='-1' className={classes.Reviews}>8 total reviews from people who used this service</h1>
                                    </div>
                                </section>
                                <span className={classes.RatingAvg}>{(5).toFixed(1)}</span>
                                <Rating height={'17.5px'} width={'17.5px'} type='stars' />
                            </div>
                        </div>
                        <div className={classes.ReviewsWrapper}>
                            <Review />
                            <Review />
                            <Review />
                        </div>
                    </div>
                </div>
                <div className={classes.SectionSeparator}><div className={classes.SectionSeparatorLine}><div/></div></div>
                <div className={classes.SimilarServices}>
                    <div className={classes.ServicesWrapper}>
                        <div className={classes.ServicesContainer}>
                            <h1 tabIndex='-1'>Similar services near you</h1>
                        </div>
                    </div>
                    <div className={classes.CarouselWrapper}>
                        <div className={classes.CarouselContainer}>
                            <Carousel>
                                <Service
                                    header='Plumbing'
                                    title='A Toilet'
                                    priceRating='0.75'
                                    ratingAvg={0.17}
                                    ratingAmount='1537'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                                <Service
                                    header='Plumbing'
                                    title='A Toilet'
                                    priceRating='0.75'
                                    ratingAvg={0.17}
                                    ratingAmount='1537'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                                <Service
                                    header='Plumbing'
                                    title='A Toilet'
                                    priceRating='0.75'
                                    ratingAvg={0.17}
                                    ratingAmount='1537'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                                <Service
                                    header='Plumbing'
                                    title='A Toilet'
                                    priceRating='0.75'
                                    ratingAvg={0.17}
                                    ratingAmount='1537'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                                <Service
                                    header='Plumbing'
                                    title='A Toilet'
                                    priceRating='0.75'
                                    ratingAvg={0.17}
                                    ratingAmount='1537'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ServicesId;