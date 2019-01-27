import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector'
import axios from '../../../axios-services';
// check inputs validity, auth actions dispatchers, toast
import { authActions } from '../../../store/actions';
import { checkValidity } from '../../../shared/checkValidity';
import { toast } from 'react-toastify';
// Redux & Router
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// CSS
import classes from './Reviews.module.css';
// JSX
import Close from './Close/Close';
import Ratings from './Ratings/Ratings';
import Review from './Review/Review';
import Score from './Score/Score';
import Information from './Information/Information';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import LoadingBounce from '../../UI/LoadingBounce/LoadingBounce';
import Tooltip from '../../UI/Tooltip/Tooltip';


class Reviews extends Component {
    constructor(props){
        super(props);
        this.myForm = React.createRef();
        this.hiddenStyle = {height: 0, overflow: 'hidden'};
    }

    state = {
        loading: true,
        /**
         * Storing the current pathname in case the user is not authenticated and tries to leave a review, 
         * this will set a redirect path so that after a successful login the user will be redirected to 
         * this page.
         */
        pathname: this.props.location.pathname, 
        reviews: null,
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
        if (this.state.formIsValid) { // Protection against invalid forms.
            return toast.error('Please, fill in the review fields.');
        }
        const review = {
            rating: this.state.rating,
            price: this.state.priceRating,
            comment: this.state.controls.review.value,
            reviewerDisplayName: this.props.userDetails.displayName,
            reviewerEmail: this.props.userDetails.email,
            uid: this.props.userDetails.uid,
            serviceId: this.props.id
        };
        console.log(review);
    }

    componentDidMount() {
        axios.get('./review', { params: this.props.id })
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
            });
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
                {/* Don't display while loading. */}
                {this.state.loading ? 
                    null 
                    : (
                        // If there are no reviews, then it'll display at the top.
                        <div style={{order: this.state.reviews ? '-1' : null}}>
                            <Button clicked={this.toggleFormHandler} className={classes.Button} blockButton>Write A Review</Button>
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
                                                <Tooltip className={classes.Tooltip}>
                                                    <Information />
                                                </Tooltip>
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
                                        <Button className={classes.Submit} disabled={!this.state.formIsValid} submit type='success' blockButton>Submit</Button>
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