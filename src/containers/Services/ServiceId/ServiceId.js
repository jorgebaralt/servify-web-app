import React, { Component } from 'react'
// CSS
import classes from './ServiceId.module.css'
// JSX
import SVG from '../../../components/SVG/SVG';
import InfoPoint from './InfoPoint/InfoPoint';
import InfoSection from './InfoSection/InfoSection';
import Rating from '../../../components/UI/Rating/Rating';

class ServiceId extends Component {
    render () {
        return (
            <>
                <div className={classes.ServiceContainer}>
                    <div className={classes.GalleryWrapper}>
                        <div className={classes.GalleryContainer}></div>
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
                        <InfoPoint symbol={<SVG svg='location-pin' />} info='Company website'/>
                        <InfoPoint symbol={<SVG svg='chat' />} info='Services offered in English and Spanish'/>
                        <div className={classes.SeparatorWrapper}><div  className={classes.Separator}/></div>
                        <InfoSection 
                            title='Servify'
                            header='About the service'>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </InfoSection>
                    </div>
                </div>
                <div className={classes.ReviewsWrapper}>
                    <div className={classes.ReviewsSeparator}><div className={classes.ReviewsSeparatorLine}><div/></div></div>
                    <div className={classes.ReviewsContainer}>
                        <div className={classes.RatingsWrapper}>
                            <div className={classes.RatingsContainer}>
                                <section>
                                    <div className={classes.RatingsHeader}> 
                                        {/* TODO Make dynamic */}
                                        <h1 tabIndex='-1' className={classes.Reviews}>8 reviews from people who used this service</h1>
                                    </div>
                                </section>
                                <span className={classes.RatingAvg}>5.0</span><Rating height={'17.5px'} width={'17.5px'} type='stars' />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ServiceId;