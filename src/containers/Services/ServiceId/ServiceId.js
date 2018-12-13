import React, { Component } from 'react'
// CSS
import classes from './ServiceId.module.css'
// JSX
import PhotosCarousel from './PhotosCarousel/PhotosCarousel';
import SVG from '../../../components/SVG/SVG';
import InfoPoint from './InfoPoint/InfoPoint';
import InfoSection from './InfoSection/InfoSection';
import Rating from '../../../components/UI/Rating/Rating';
import Review from './Review/Review';
import Carousel from '../../../components/UI/Carousel/Carousel';
import Service from '../../../components/Landing/Service/Service'

class ServiceId extends Component {

    constructor (props) {
        super(props);
        this.myGallery = React.createRef();
    }

    state = {
        imageSizes: {
            width: null,
            height: null
        }
    }

    setGalleryDimensions () {
        this.setState(() => {
            return {
                imageSizes: {
                    width: this.myGallery.current.offsetWidth,
                    height: this.myGallery.current.offsetWidth/(4/3)
                }
            }
        });
    }

    componentDidMount () {
        this.setGalleryDimensions();
        
        window.onresize = () => {
            this.setGalleryDimensions();
        }
    }

    componentWillMount () {
        window.onresize = () => {
            return;
        }
    }

    render () {
        return (
            <>
                <div className={classes.ServiceContainer}>
                    <div className={classes.GalleryWrapper}>
                        <div ref={this.myGallery}
                            className={classes.GalleryContainer}>
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
                                <span className={classes.RatingAvg}>5.0</span>
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
                <div className={classes.SectionSeparator}><div className={classes.SectionSeparatorLine}><div/></div></div>
            </>
        );
    }
}

export default ServiceId;