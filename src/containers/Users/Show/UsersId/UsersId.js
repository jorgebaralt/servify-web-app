import React, { Component } from 'react';
// redux-saga, react-router-dom and axios
import axios from '../../../../axios-services'
import  { connect } from 'react-redux';
// Anon User Image
import anonUser from '../../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './UsersId.module.css';
// JSX
import Review from '../../../../components/Services/Reviews/Review/Review';
import Service from '../../../../components/Services/Service/Service';
import ImageFadeIn from '../../../../components/UI/ImageFadeIn/ImageFadeIn';
import Separator from '../../../../components/UI/Separator/Separator';
import { Slider, Slide } from '../../../../components/UI/Slider/';

class UsersId extends Component {
    state = {
        userDetails: null,
        reviews: null,
        favoriteServices: null
    }

    componentDidMount() {
        console.log(this.props.userDetails.uid)
        console.log(this.props)
        console.log(this.props.match.params.id)
        axios.get('/favorites', { uid: this.props.userDetails.uid })
            .then(response => {
                const favoriteServices = response.data;
                console.log(response)
                this.setState({
                    favoriteServices: favoriteServices
                });
            })
    }

    render () {
        const creationDate = (new Date(Number(this.props.userDetails.metadata.a))).toLocaleDateString();
        return (
            <>
                <div style={{paddingBottom: 0}} className={classes.Container}>
                    <div className={classes.ProfileWrapper}>
                        <div className={classes.ProfileContainer}>
                            <Slider>
                                <Slide>
                                    <div className={classes.ProfilePhoto}>
                                        <ImageFadeIn draggable={false} src={this.props.userDetails.photoURL ? this.props.userDetails.photoURL : anonUser} />
                                    </div>
                                </Slide>
                            </Slider>
                        </div>
                    </div>
                    <div className={classes.ContentWrapper}>
                        <div className={classes.Title}>
                            {!this.props.userDetails.displayName ? 
                                <span>Hi!</span>
                                : <span>{['Hi, I\'m ', this.props.userDetails.displayName, '!'].join('')}</span>
                            }
                        </div>
                        <div className={classes.JoinDate}>
                            Member since: <span>{creationDate}</span>
                        </div>
                        <Separator />
                        <div className={classes.ReviewsContainer}>
                            <div className={classes.Reviews}>{this.props.userDetails.reviewsCount | 0}</div> 
                            <span>Reviews</span>
                        </div>
                        <Separator />
                        <h1 className={classes.Title}>Reviews</h1>
                        {this.props.userDetails.reviews ? 
                            <div className={classes.ReviewsWrapper}>
                                <Review />
                                <Review />
                                <Review />
                            </div>
                            : 
                            <div className={classes.ReviewsWrapper}>
                                <span>No reviews yet.</span>
                            </div>
                        }
                    </div>
                </div>
                <div style={{paddingTop: 0, flexFlow: 'column'}} className={classes.Container}>
                    <Separator />
                    <h1 className={classes.Title}>Favorite Services</h1>
                    {this.props.userDetails.favoriteServices ? 
                        <div className={classes.ServicesWrapper}>
                            <div className={classes.ServicesContainer}>
                                {this.props.services.favoriteServices.map( (service, index) => {
                                    return (
                                        <div className={classes.Service}>
                                            <Service
                                                key={index}
                                                header={service.category.replace("_", " ")}
                                                title={service.title}
                                                priceRating={service.priceRating/4}
                                                href={service.id}
                                                ratingAvg={service.rating/5}
                                                ratingAmount={service.ratingCount}
                                                image={service.imagesInfo}/>
                                        </div>
                                    );
                                } )}
                            </div>
                        </div>
                        : <span>No favorite services yet.</span>
                    }
                </div>
            </>
        );
    }
}

export default UsersId;