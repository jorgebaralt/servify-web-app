import React, { Component } from 'react';
// toast, redux-saga, react-router-dom and axios
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios-services'
import  { connect } from 'react-redux';
// Anon User Image
import anonUser from '../../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './User.module.css';
// JSX
import ProfilePhoto from '../../../../components/Users/ProfilePhoto/ProfilePhoto'
import FavoriteServices from '../../../../components/Users/Show/FavoriteServices/FavoriteServices'
import UserReviews from '../../../../components/Users/Show/UserReviews/UserReviews'
import Separator from '../../../../components/UI/Separator/Separator';

class User extends Component {
    state = {
        loading: true,
        bIsDeleting: false,
        reviews: [],
        favoriteServices: [],
    }

    onDeleteReviewHandler = (deletedReview, callback) => {
        // Checking if the reviews have valid id's and the reviewId
        // is equal to the userReview.id
        if ((!deletedReview.id)) { 
            return toast.error('Something went wrong when trying to delete your review. Try reloading the page!');
        }
        this.setState({
            bIsDeleting: true
        });
        axios.delete('/review', { data: { review: deletedReview } })
            .then(() => {
                toast.success('Your review has been deleted successfully.');
                this.setState(prevState => {
                    // Filters out deleted review
                    const newReviews = prevState.reviews.filter(review => {
                        return review.id !== deletedReview.id
                    });
                    // To unmount modal
                    if (callback) {
                        callback();
                    }
                    return {
                        bIsDeleting: false,
                        reviews: newReviews
                    }
                });
            })
            .catch(() => {
                toast.error('Something went wrong when trying to delete your review. Try reloading the page!');
                this.setState({
                    bIsDeleting: false
                });
            });
    }

    fetchData = async () => {
        let response = null,
            favoriteServices = [],
            reviews = [];
        // Fetching favorite services
        try {
            response = await axios.get('/favorites', { params: { uid: this.props.userDetails.uid } });
            favoriteServices = await response.data;
            await this.setState({
                favoriteServices: favoriteServices
            });
        } catch {
            this.setState({
                favoriteServices: []
            });
        }
        // Fetching user reviews
        try {
            response = await axios.get('/reviews', { params: { uid: this.props.userDetails.uid } });
            reviews = await response.data.reviews;
            await this.setState({
                reviews: reviews,
                loading: false
            });
        } catch {
            this.setState({
                reviews: []
            });
        }
        await this.setState({
            loading: false
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render () {
        const creationDate = (new Date(Number(this.props.userDetails.metadata.a))).toLocaleDateString();
        return (
            <>
                <div className={classes.Wrapper}>
                    <div className={classes.Header}>
                        {/* Profile */}
                        <div className={classes.Photo}>
                            <ProfilePhoto rounded src={this.props.userDetails.photoURL ? this.props.userDetails.photoURL : anonUser} />
                        </div>
                        <div className={classes.Content}>
                            {/* Header Title */}
                            <div className={classes.Title}>
                                {!this.props.userDetails.displayName ? 
                                    <span>Hi!</span>
                                    : <span>{['Hi, I\'m ', this.props.userDetails.displayName, '!'].join('')}</span>
                                }
                            </div>
                            {/* Join Date */}
                            <div className={classes.JoinDate}>
                                Member since: <span>{creationDate}</span>
                            </div>
                            <Separator />
                            {/* Reviews */}
                            <UserReviews 
                                loading={this.state.loading}
                                // Reviews props
                                deleteReview={this.onDeleteReviewHandler} 
                                bIsDeleting={this.state.bIsDeleting}
                                reviews={this.state.reviews} />
                        </div>
                    </div>
                    <div className={classes.Container}>
                        <FavoriteServices loading={this.state.loading} favoriteServices={this.state.favoriteServices} />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

export default withRouter(connect(mapStateToProps)(User));