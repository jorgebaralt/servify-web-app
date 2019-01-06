import React, { Component } from 'react';
// CSS
import classes from './Preview.module.css';
// JSX
import ReactResizeDetector from 'react-resize-detector';
import PhotosCarousel from '../../../../../components/UI/PhotosCarousel/PhotosCarousel';
import Map from '../../../../../components/UI/Map/Map';
import SVG from '../../../../../components/SVG/SVG';
import Review from '../../../../../components/Services/Review/Review';
import Rating from '../../../../../components/UI/Rating/Rating';
import InfoPoint from '../../../../../components/Services/InfoPoint/InfoPoint';
import InfoSection from '../../../../../components/Services/InfoSection/InfoSection';

class Preview extends Component {
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

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <>
                <div className={classes.ServiceContainer}>
                    <div className={classes.GalleryWrapper}>
                        <div ref={this.myGallery}
                            className={classes.GalleryContainer}>
                            <ReactResizeDetector handleWidth handleHeight onResize={this.setGalleryDimensions} />
                            <PhotosCarousel
                                fadeTimeout={0}
                                dimensions={this.state.imageSizes}
                                images={this.props.images} />
                        </div>
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.HeaderContent}>
                            <div className={classes.CategoryContainer}>
                                <small className={classes.Category}>{this.props.category}</small>
                            </div>
                            <div className={classes.TitleContainer}>
                                <div className={classes.Title}>
                                    <h1>
                                        {this.props.title ?
                                                this.props.title
                                                : <span className={classes.Error}>Service title is missing.</span>}
                                    </h1>
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
                        <InfoPoint symbol={<SVG svg='location-pin' />} 
                            location={
                                this.props.infoPoints.state ? 
                                    this.props.infoPoints.state 
                                    : <span className={classes.Error}>State can't be empty.</span>} />
                        {this.props.infoPoints.website ? 
                            <InfoPoint symbol={<SVG svg='location-pin' />} website={this.props.infoPoints.website}/> 
                            : null}
                        {this.props.infoPoints.languages ? 
                            <InfoPoint symbol={<SVG svg='chat' />} info={this.props.infoPoints.languages}/> 
                            : null}
                        <div className={classes.SeparatorWrapper}><div  className={classes.Separator}/></div>
                        {Object.values(this.props.infoSections).map( section => {
                            return (
                                <InfoSection 
                                    title={section.title}
                                    contact={section.contact}
                                    header={section.header}>
                                    <div>
                                        <p>
                                            {section.info ?
                                                section.info
                                                : <span className={classes.Error}>Please provide the necessary information.</span>}
                                        </p>
                                    </div>
                                </InfoSection>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.SectionSeparator}><div className={classes.SectionSeparatorLine}><div/></div></div>
                <Map className={classes.MapWrapper} map={this.props.map} />
                <div className={classes.SectionSeparator}><div className={classes.SectionSeparatorLine}><div/></div></div>
                <div className={classes.ReviewsWrapper}>
                    <div className={classes.ReviewsContainer}>
                        <div className={classes.RatingsWrapper}>
                            <div className={classes.RatingsContainer}>
                                <section>
                                    <div className={classes.RatingsHeader}> 
                                        {/* TODO Make dynamic */}
                                        <h1 tabIndex='-1' className={classes.Reviews}>{this.props.rating.totalReviews} total reviews from people who used this service</h1>
                                    </div>
                                </section>
                                <span className={classes.RatingAvg}>{this.props.rating.avg.toFixed(1)}</span>
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
            </>
        );
    }
}

export default Preview;