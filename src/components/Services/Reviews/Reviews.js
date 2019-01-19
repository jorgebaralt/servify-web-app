import React, { Component } from 'react';
import axios from '../../../axios-services';
// CSS
import classes from './Reviews.module.css';
// JSX
import Ratings from './Ratings/Ratings';
import Review from './Review/Review';
import LoadingBounce from '../../../components/UI/LoadingBounce/LoadingBounce';

class Reviews extends Component {
    state = {
        loading: true,
        reviews: null
    }

    componentDidMount() {
        axios.get('./getRatings', { params: this.props.servicesReviewsParams })
            .then( response => {
                const reviews = response.data;
                if (reviews.length) {
                    this.setState({
                        loading: false,
                        reviews: reviews
                    });
                } else {
                    this.setState({
                        loading: false,
                        reviews: null
                    });
                }
            })
            .catch( error => {
                console.log(error);
            })
    }

    render() {
        const rating = {
            avg: this.props.ratings.rating,
            totalReviews: this.props.ratings.ratingCount
        }
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Container}>
                    {this.state.loading ? 
                        <LoadingBounce />
                        : this.state.reviews ? 
                            <>
                                <Ratings rating={rating} />
                                <div style={{margin: '0 auto'}} className={classes.Wrapper}>
                                    <>
                                        {this.state.reviews.map( (review, index) => {
                                            const displayName = review.reviewerDisplayName;
                                            const creationDate = review.timestamp;
                                            const rating = review.rating;
                                            const comment = review.comment;
                                            return (
                                                <Review key={index}
                                                    displayName={displayName}
                                                    date={creationDate}
                                                    rating={rating/5}
                                                    comment={comment} />
                                            );
                                        })}
                                    </>
                                </div>
                            </>
                        : <h1 className={classes.Rate}>Be the first to rate this service.</h1>}
                </div>
            </div>
        );
    }
    
}

export default Reviews;