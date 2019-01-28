import React, { Component } from 'react';
// react-redux
import { connect } from 'react-redux';
// Default Image
import defaultImage from '../../../assets/favicon/android-icon-48x48.png';
// CSS
import classes from './UserReview.module.css';
// JSX
import { Link } from 'react-router-dom';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import Rating from '../../../components/UI/Rating/Rating';
import LoadingDots from '../../../components/UI/LoadingDots/LoadingDots';
import { toast } from 'react-toastify';

class UserReview extends Component {
    state = {
        bIsHidden: true,
        bIsDeleting: false,
        id: this.props.userReview.id,
        uid: this.props.userReview.uid,
        date: this.props.userReview.timestamp,
        rating: this.props.userReview.rating/5,
        comment: this.props.userReview.comment
    }

    toggleModal = () => {
        this.setState((prevState) => {
            return {
                bIsHidden: !prevState.bIsHidden
            }
        });
    }

    // On delete handler, if successful the userReview will be rendered null. The modal will be unmounted.
    onDeleteReviewHandler = () => {
        const reviewId = this.state.id;
        if (!reviewId) {
            toast.error('Something went wrong');
        } else if (this.props.deleteReview) {
            return this.props.deleteReview(this.props.userReview);
        }
    }

    render() {
        if (!this.props.userDetails) { return null; } // Pointer protection, renders as null if there is no user.
        const totalStarsRatingAmount = this.props.totalAmount ? this.props.totalAmount : 5;
        return (
            <div className={classes.Header}>
                <Modal show={!this.state.bIsHidden}
                    closeModal={this.toggleModal}
                    toggleModal={this.toggleModal}>
                    <div className={classes.Modal}>
                        <div className={classes.Prompt}>
                            Are you sure that you want to delete this review?
                        </div>
                        <Button style={{height: '50px'}} clicked={this.onDeleteReviewHandler} blockButton type='success'>
                            {/* If deleting, will display animation. */}
                            {this.props.bIsDeleting ? <LoadingDots /> : 'Proceed'}
                        </Button>
                    </div>
                </Modal>
                <div className={classes.HeaderContainer}>
                    {/* Image */}
                    <div className={classes.HeaderItem}>
                        <div className={classes.ImageContainer}>
                            <Link 
                                to={['/users/show/', this.props.uid].join('')}
                                aria-label={this.props.user}
                                aria-busy="false">
                                <img 
                                    className={classes.Image}
                                    src={this.props.userDetails.photoURL ? this.props.userDetails.photoURL : defaultImage}
                                    height="48" 
                                    width="48" 
                                    alt={this.props.user} 
                                    title={this.props.user} />
                            </Link>
                        </div>
                    </div>
                    {/* User info */}
                    <div className={classes.HeaderItem}>
                        <div className={classes.UserContainer}>
                            {this.props.highlight ?
                                <div className={classes.Hightlight}>
                                    Highlighted Review
                                </div>
                            : null}
                            <div className={classes.User}>
                                <Link 
                                    to={['/users/show/', this.props.uid].join('')}
                                    aria-label={this.props.user}
                                    aria-busy="false">
                                    <span className={classes.Username}>{this.props.userDetails.displayName}</span>
                                </Link>
                                <span style={{margin: '0 1ch 3px'}}>-</span>
                                <span className={classes.Date}>{new Date(String(this.state.date)).toLocaleDateString()}</span>
                            </div>
                            <div className={classes.Rating}>
                                <Rating rating={this.state.rating} amount={totalStarsRatingAmount} height={'15px'} width={'15px'} type='stars' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.CommentContainer}>
                    <div dir='ltr' className={classes.Comment}>
                        {this.state.comment}
                    </div>
                </div>
                <div style={{marginTop: '18px'}}>
                    <Button clicked={this.toggleModal} type='danger'>Delete Review</Button>
                </div>
                <div className={classes.SeparatorWrapper}><div className={classes.Separator}/></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

export default connect(mapStateToProps)(UserReview);