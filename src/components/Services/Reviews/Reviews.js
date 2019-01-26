import React, { Component } from 'react';
import axios from '../../../axios-services';
// Check Validity
import { checkValidity } from '../../../shared/checkValidity';
// Redux
import { connect } from 'react-redux';
// CSS
import classes from './Reviews.module.css';
// JSX
import Ratings from './Ratings/Ratings';
import Review from './Review/Review';
import Score from './Score/Score';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import LoadingBounce from '../../UI/LoadingBounce/LoadingBounce';

class Reviews extends Component {
    constructor(props){
        super(props);
        this.myForm = React.createRef();
    }

    state = {
        loading: true,
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

    toggleFormHandler = () => {
        this.setState(prevState => {
            return {
                bIsShown: !prevState.bIsShown
            }
        });
    }

    onScoreHandler = (score) => {
        this.setState({
            score: score
        });
    }

    submitReview = (event) => {
        event.preventDefault();
        const review = {
            id: this.props.id,
            rating: this.state.score,
            price: this.state.priceScore
        }
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
        const wellClasses = [classes.Well];
        let hiddenStyle = {height: 0};
        if (this.state.bIsShown) {
            hiddenStyle = {height: this.myForm.current ? this.myForm.current.scrollHeight : 0}
            wellClasses.push(classes.Hidden);
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
                                    <form ref={this.myForm} 
                                        className={classes.Well} 
                                        style={hiddenStyle} 
                                        onSubmit={this.submitReview}>
                                        <span onClick={this.toggleFormHandler} className={classes.Close} />
                                        <Input 
                                            style={this.state.controls.displayName.style}
                                            elementType={this.state.controls.displayName.elementType} 
                                            elementConfig={this.state.controls[this.state.controls.displayName.valueType] ? this.state.controls[this.state.controls.displayName.valueType].elementConfig : this.state.controls.displayName.elementConfig} // Referenced to state to mutate
                                            value={this.props.userDetails.displayName} />
                                        <Score onChange={this.onScoreHandler} />
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

export default connect(mapStateToProps)(Reviews);