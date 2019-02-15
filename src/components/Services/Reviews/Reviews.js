import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector'
import axios, { CancelToken } from '../../../axios-services';
// worker functions
import { authActions } from '../../../store/actions';
import { checkValidity } from '../../../shared/checkValidity';
import { toast } from 'react-toastify';
// Redux & Router
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// CSS
import classes from './Reviews.module.css';
// JSX
import Tooltip from 'react-png-tooltip';
import Close from './Close/Close';
import WriteReview from './WriteReview/WriteReview';
import Ratings from './Ratings/Ratings';
import Review from './Review/Review';
import Score from './Score/Score';
import Information from './Information/Information';
import UserReview from '../../Users/UserReview/UserReview';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import LoadingBounce from '../../UI/LoadingBounce/LoadingBounce'; // Placeholder while loading
import LoadingDots from '../../UI/LoadingDots/LoadingDots'; // Submit button

const calculateNewRatings = (oldRatings, review, bIsDelete) => {
    const ratings = { ...oldRatings };
    // If it's delete then the count decreses by 1. Else it will add 1.
    if (bIsDelete) {
        ratings.priceCount--;
        ratings.ratingCount--;
    } else {
        ratings.priceCount++;
        ratings.ratingCount++;
    }
    // If it's a post, then sum. Else it will be a difference between the old sum
    // and the deleted review's rating.
    if (bIsDelete) {
        ratings.priceSum -= review.price;
        ratings.ratingSum -= review.rating;
    } else {
        ratings.priceSum += review.price;
        ratings.ratingSum += review.rating;
    }
    ratings.price = ( // Average
        (ratings.priceSum) / (ratings.priceCount)
    );
    ratings.rating = ( // Average
        (ratings.ratingSum) / (ratings.ratingCount)
    );
    return ratings;
};

class Reviews extends Component {
    constructor(props){
        super(props);
        this.myForm = React.createRef();
        this.hiddenStyle = {height: 0, overflow: 'hidden'};
        this.myTimer = null;
        // To cancel axios requests on componentWillUnmount
        this.cancelAxios = null;
    }

    _bIsMounted = false;

    state = {
        bIsUploading: false,
        bIsDeleting: false,
        bIsLoading: true,
        /**
         * Storing the current pathname in case the user is not authenticated and tries to leave a review, 
         * this will set a redirect path so that after a successful login the user will be redirected to 
         * this page.
         */
        pathname: this.props.location.pathname, 
        reviews: [], // Initialize as empty array to avoid crashes.
        ratings: this.props.ratings ? { ...this.props.ratings } : null,
        bUserReviewFetched: false, // Means the user review has not been fetched yet, this avoids infinite axios callbacks.
        userReview: null,
        // Review score
        score: null,
        // Form
        controls: {
            displayName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    disabled: true,
                    autoComplete: 'new-password',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false",
                    style: { cursor: 'not-allowed' }
                },
                value: this.props.userDetails ? this.props.userDetails.displayName : null,
                valueType: 'name',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
                style: {cursor: 'not-allowed'}
            },
            review: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'What did you like about the service?',
                },
                value: '',
                valueType: 'review',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        bIsShown: false,
        hiddenStyle: {height: 0, overflow: 'hidden'},
        formIsValid: false,
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    /**
     * Overflow hidden will be removed after the form has expanded fully.
     */
    setOverflow = () => {
        if (!this.myForm) { return; } // Protection
        // Execute only if form is shown.
        if (this.state.bIsShown) {
            if (this.myForm.current) { // Protection
                const scrollHeight = this.myForm.current.scrollHeight;
                const offsetHeight = this.myForm.current.offsetHeight;
                // If the form is fully opened, remove overflow hidden.
                if (scrollHeight === offsetHeight) {
                    if (this._bIsMounted) {
                        this.setState({
                            hiddenStyle: {
                                height: this.myForm.current ? this.myForm.current.scrollHeight : 0,
                                overflow: 'visible'
                            }
                        });
                    }
                }
            }
        }
    }
    
    setRedirectPath = () => {
        const path = this.state.pathname;
		this.props.authSetRedirectPath(path);
	}

    toggleFormHandler = () => {
        if (!this.myForm) { return; } // If form is not set then don't so anything.
        /**
         * If the user is not logged in, store the current pathname and redirect to authenticate.
         * The user will be redirected back to this page after a successful authentication.
         */
        if (!this.props.userDetails) {
            this.setRedirectPath();
            this.props.history.push('/authenticate');
        }
        if (this._bIsMounted) {
            this.setState(prevState => {
                let hiddenStyle;
                // If the the current state is hidden, then next style will be visible.
                if (!this.state.bIsShown) {
                    hiddenStyle = {
                        ...this.state.hiddenStyle,
                        height: this.myForm.current ? this.myForm.current.scrollHeight : 0,
                    }
                // Otherwise, hide.
                } else {
                    hiddenStyle = {height: 0, overflow: 'hidden'};
                }
                return {
                    bIsShown: !prevState.bIsShown,
                    hiddenStyle: hiddenStyle
                }
            });
        }
    }

    onRatingHandler = (score) => {
        this.setState({
            rating: score
        });
    }

    onPriceRatingHandler = (score) => {
        this.setState({
            priceRating: score
        });
    }

    submitReview = (event) => {
        event.preventDefault();
        if (!this.state.formIsValid) { // Protection against invalid forms.
            return toast.error('Please, fill in the review fields.');
        }
        const review = {
            rating: this.state.rating,
            price: this.state.priceRating,
            comment: this.state.controls.review.value,
            reviewerDisplayName: this.props.userDetails.displayName,
            reviewerEmail: this.props.userDetails.email,
            uid: this.props.userDetails.uid,
            serviceId: this.props.serviceId
        };
        if (!review.serviceId || !review.uid) { // Checking if the review object has valid id's
            return toast.error('Something went wrong when trying to post your review.');
        }
        this.setState({
            bIsUploading: true
        });
        axios.post('/review', { serviceId: this.props.serviceId, review: review })
            .then( response => {
                toast.success('Your review has been posted successfully!');
                const newReview = response.data;
                newReview.timestamp = new Date(); // To mimic the backend's timestamp by firebase.
                // Reviews will be the state's reviews array or an empty array if no reviews,
                // then we push the new review to set a new state.
                const reviews = this.state.reviews ? [ ...this.state.reviews ] : [];
                const newRatings = calculateNewRatings(this.state.ratings, newReview);
                reviews.push(newReview);
                this.setState({
                    bIsUploading: false,
                    // Pushing the new userReview and newRatings to display them
                    ratings: newRatings,
                    userReview: newReview,
                    bUserReviewFetched: true // To avoid fetching data since review is already updated.
                });
            })
            .catch(() => {
                toast.error('Something went wrong when trying to post your review. Try reloading the page!');
                this.setState({
                    bIsUploading: false
                });
            });
    }

    deleteReview = (deletedReview) => {
        // Checking if the reviews have valid id's and the reviewId
        // is equal to the userReview.id
        if ((!deletedReview.id || !this.state.userReview.id) || (deletedReview.id !== this.state.userReview.id)) { 
            return toast.error('Something went wrong when trying to delete your review. Try reloading the page!');
        }
        this.setState({
            bIsDeleting: true
        });
        axios.delete('/review', { data: { review: deletedReview } })
            .then(() => {
                toast.success('Your review has been deleted successfully.');
                const newRatings = calculateNewRatings(this.state.ratings, deletedReview, true);
                this.setState({
                    bIsDeleting: false,
                    // Pushing the new userReview and newRatings to display them
                    ratings: newRatings,
                    userReview: null,
                });
            })
            .catch(() => {
                toast.error('Something went wrong when trying to delete your review. Try reloading the page!');
                this.setState({
                    bIsDeleting: false
                });
            });
    }

    componentDidMount() {
        this._bIsMounted = true;
        const uid = this.props.userDetails ? this.props.userDetails.uid : null;
        axios.get('/reviews', 
            { params: { serviceId: this.props.serviceId, uid: uid } },
            { cancelToken: new CancelToken((c) => {
                // An executor function receives a cancel function as a parameter
                this.cancelAxios = c;
            }) })
            .then( response => {
                const reviews = response.data;
                if (this._bIsMounted) {
                    if (reviews.length) {
                        this.setState({
                            bIsLoading: false,
                            reviews: reviews
                        });
                    } else {
                        this.setState({
                            bIsLoading: false,
                            reviews: []
                        });
                    }
                }
            })
            .catch( () => {
                if (this._bIsMounted) {
                    this.setState({
                        bIsLoading: false,
                        error: true
                    });
                }
            });
    }

    // If there is an authenticated user and there no 
    // userReviews then fetch user reviews then set the state.
    debouncedFetchUserReviews = () => {
        clearTimeout(this.myTimer);
        this.myTimer = setTimeout( () =>  {
            if (this.props.userDetails && !this.state.userReview && !this.state.bUserReviewFetched) {
                const uid = this.props.userDetails.uid
                // Only request if uid is not null (redundant, but why not?).
                if (uid) {
                    axios.get('/reviews', { params: { serviceId: this.props.serviceId, uid: uid } },
                        { cancelToken: new CancelToken((c) => {
                            // An executor function receives a cancel function as a parameter
                            this.cancelAxios = c;
                        }) })
                        .then( response => {
                            const reviews = response.data.reviews;
                            const userReview = response.data.userReview;
                            this.setState({
                                reviews: reviews,
                                userReview: userReview,
                                bUserReviewFetched: true // To avoid infinite axios callbacks.
                            });
                        })
                        .catch(() => {
                            this.setState({
                                userReview: null,
                                bUserReviewFetched: true // To avoid infinite axios callbacks.
                            });
                        });
                }
            }
        }, 250);
    }

    componentDidUpdate() {
        // Debounced function that fetches user reviews, ignores 
        // multiple updates until it stops updating, then triggers.
        this.debouncedFetchUserReviews();
        // If user logs out account, then update userReview to null
        // and pass the old user review to the state's reviews array.
        // bUserReviewFetched set back to undefined in case the user logs
        // back in, debouncedFetchUserReviews will trigger again.
        if (!this.props.userDetails && this.state.userReview) {
            if (this._bIsMounted) {
                this.setState(() => {
                    const userReviews = this.state.userReview
                    const reviews = this.state.reviews ? [ ...this.state.reviews ] : [];
                    reviews.push(userReviews);
                    return {
                        reviews: reviews,
                        userReview: null,
                        bUserReviewFetched: null
                    }
                });
            }
        }
    }

    componentWillUnmount() {
        // Prevent this.setState on unmounted component
        this._bIsMounted = false;
        // Cancelling setTimeout
        clearTimeout(this.myTimer);
        // Cancelling axios requests if any.
        if (this.cancelAxios) {
            this.cancelAxios();
        }
        this.debouncedFetchUserReviews = null;
    }

    render() {
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Container}>
                    {this.state.bIsLoading ? 
                        <LoadingBounce />
                        : (this.state.reviews.length || this.state.userReview) ? 
                            <>
                                <Ratings ratings={this.state.ratings} />
                                <div style={{display: 'block', margin: '0 auto'}} className={classes.Wrapper}>
                                    {this.state.userReview ? 
                                        <UserReview
                                            highlight
                                            // TODO will be deprecated when reviews are fetched individually
                                            userReview={this.state.userReview}
                                            deleteReview={this.deleteReview}
                                            bIsDeleting={this.state.bIsDeleting} />
                                    : null}
                                    <>
                                        {this.state.reviews.map( (review, index) => {
                                            // TODO passing some of the props will be deprecated when reviews are fetched individually
                                            return (
                                                <Review 
                                                    key={index}
                                                    review={review} />
                                            );
                                        })}
                                    </>
                                </div>
                            </>
                        : <h1 className={classes.Rate}>Be the first to rate this service.</h1>}
                </div>
                {/* Don't display while loading or if there is no user review. */}
                {this.state.bIsLoading || this.state.userReview ? 
                    null 
                    : (
                        // If there are no reviews, then it'll display at the top.
                        <div style={{order: this.state.reviews ? '-1' : null}}>
                            {/* <Button clicked={this.toggleFormHandler} className={classes.Button} blockButton>Write A Review</Button> */}
                            <WriteReview 
                                userDetails={this.props.userDetails} 
                                toggleFormHandler={this.toggleFormHandler} />
                            {/* Only render the form if there are user details and if 'this.props.bShowForm' is true, otherwise render null. */}
                            {this.props.userDetails && this.props.bShowForm ?
                                <div className={classes.Form}>
                                    <ReactResizeDetector handleWidth handleHeight onResize={this.setOverflow} />
                                    <form ref={this.myForm} 
                                        className={classes.Well} 
                                        style={this.state.hiddenStyle} 
                                        onSubmit={this.submitReview}>
                                        <Close onClick={this.toggleFormHandler} />
                                        <Input 
                                            style={this.state.controls.displayName.style}
                                            elementType={this.state.controls.displayName.elementType} 
                                            elementConfig={this.state.controls[this.state.controls.displayName.valueType] ? this.state.controls[this.state.controls.displayName.valueType].elementConfig : this.state.controls.displayName.elementConfig} // Referenced to state to mutate
                                            value={this.props.userDetails.displayName} />
                                        <div className={classes.Score}>
                                            <Score onChange={this.onRatingHandler} /><sub><h4>(Rating)</h4></sub>
                                        </div>
                                        <div className={classes.Score}>
                                            <Score priceRating amount={4} onChange={this.onPriceRatingHandler} /><sub><h4>(Price Rating)</h4></sub>
                                            {/**
                                            *    Only render tooltip when the form is shown. If not shown it'll return null, thus
                                            *    resetting the tooltip's state to hidden.
                                             */}
                                            {this.state.bIsShown ? 
                                                <div className={classes.Tooltip}>
                                                    <Tooltip>
                                                        <Information />
                                                    </Tooltip>
                                                </div>
                                                : null}
                                        </div>
                                        <Input 
                                            style={this.state.controls.review.style}
                                            elementType={this.state.controls.review.elementType} 
                                            elementConfig={this.state.controls.review.elementConfig} // Referenced to state to mutate
                                            changed={(event) => this.inputChangeHandler(event, 'review')}
                                            invalid={!this.state.controls.review.valid}
                                            shouldValidate={this.state.controls.review.validation}
                                            touched={this.state.controls.review.touched}
                                            value={this.state.controls.review.value} 
                                            valueType={this.state.controls.review.valueType} />
                                        {/* Displays a loading animation when uploading review */}
                                        <Button className={classes.Submit} disabled={(!this.state.formIsValid || this.state.bIsUploading)} submit type='success' blockButton>
                                            {this.state.bIsUploading ? <LoadingDots/> : 'Submit'}
                                        </Button>
                                    </form>
                                </div>
                                : null}
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authSetRedirectPath: (path) => dispatch(authActions.authSetRedirectPath(path))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews));