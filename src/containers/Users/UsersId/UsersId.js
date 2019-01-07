import React, { Component } from 'react';
// Anon User Image
import anonUser from '../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './UsersId.module.css';
// JSX
import Review from '../../../components/Services/Reviews/Review/Review';
import Service from '../../../components/Services/Service/Service';
import ImageFadeIn from '../../../components/UI/ImageFadeIn/ImageFadeIn';
import Separator from '../../../components/UI/Separator/Separator';
import { Slider, Slide } from '../../../components/UI/Slider/';

class UsersId extends Component {
    state = {
        reviews: 12
    }

    render () {
        return (
            <>
                <div style={{paddingBottom: 0}} className={classes.Container}>
                    <div className={classes.ProfileWrapper}>
                        <div className={classes.ProfileContainer}>
                            <Slider>
                                <Slide>
                                    <div className={classes.ProfilePhoto}>
                                        <ImageFadeIn draggable={false} src={anonUser} />
                                    </div>
                                </Slide>
                            </Slider>
                        </div>
                    </div>
                    <div className={classes.ContentWrapper}>
                        <div className={classes.Title}>
                            <span>{['Hi, I\'m ', this.props.firstName, '!'].join('')}</span>
                        </div>
                        <div className={classes.JoinDate}>
                            Member since: <span>December 2018</span>
                        </div>
                        <Separator />
                        <div className={classes.ReviewsContainer}>
                            <div className={classes.Reviews}>{this.state.reviews}</div> 
                            <span>Reviews</span>
                        </div>
                        <Separator />
                        <h1 className={classes.Title}>Reviews</h1>
                        <div className={classes.ReviewsWrapper}>
                            <Review />
                            <Review />
                            <Review />
                        </div>
                    </div>
                </div>
                <div style={{paddingTop: 0, flexFlow: 'column'}} className={classes.Container}>
                    <Separator />
                    <h1 className={classes.Title}>Favorite Services</h1>
                    <div className={classes.ServicesWrapper}>
                        <div className={classes.ServicesContainer}>
                            <div className={classes.Service}>
                                <Service
                                    header='Home Services'
                                    title='A Random Service'
                                    priceRating='0.05'
                                    ratingAvg={0.97}
                                    ratingAmount='1293'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                                    href='/services/1' />
                            </div>
                            <div className={classes.Service}>
                                <Service
                                    header='Home Services'
                                    title='A Random Service'
                                    priceRating='0.05'
                                    ratingAvg={0.97}
                                    ratingAmount='1293'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                                    href='/services/1' />
                            </div>
                            <div className={classes.Service}>
                                <Service
                                    header='Home Services'
                                    title='A Random Service'
                                    priceRating='0.05'
                                    ratingAvg={0.97}
                                    ratingAmount='1293'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                                    href='/services/1' />
                            </div>
                            <div className={classes.Service}>
                                <Service
                                    header='Home Services'
                                    title='A Random Service'
                                    priceRating='0.05'
                                    ratingAvg={0.97}
                                    ratingAmount='1293'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                                    href='/services/1' />
                            </div>
                            <div className={classes.Service}>
                                <Service
                                    header='Home Services'
                                    title='A Random Service'
                                    priceRating='0.05'
                                    ratingAvg={0.97}
                                    ratingAmount='1293'
                                    image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                                    href='/services/1' />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UsersId;