import React, { Component } from 'react';
// axios, toast & react-redux
import axios from '../../../../axios-services';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { authActions } from '../../../../store/actions';
import { withRouter } from 'react-router-dom';
// worker functions
import { checkValidity } from '../../../../shared/checkValidity';
// CSS
import classes from './Report.module.css';
// JSX
import Modal from 'react-png-modal';
import Separator from '../../../UI/Separator/Separator';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import LoadingDots from '../../../UI/LoadingDots/LoadingDots';
import SVG from '../../../SVG/SVG';

const reasons = [
    {
        value: 'inappropriate',
        displayValue: 'Inappropriate content',
    },
    {
        value: 'dishonest-hateful',
        displayValue: 'Dishonest or hateful content',
    },
    {
        value: 'fake',
        displayValue: 'Fake content',
    }
]

class Report extends Component {
    state = {
        bIsModalHidden: true,
        bIsReporting: false,
        bHasReported: false, // Changes the modal to let user know the report went through
        // Form
        controls: {
            reason: {
                elementType: 'select',
                elementConfig: {
                    label: 'Choose a reason for your report',
                    placeholder: 'Select an option',
                    options: reasons
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Details about your report (optional)',
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
        /**
         * Storing the current pathname in case the user is not authenticated and tries to submit a report, 
         * this will set a redirect path so that after a successful login the user will be redirected to 
         * this page.
         */
        pathname: this.props.location.pathname
    }
    
    // Redirects to the authentiation page if user is not logged in and tries to report.
    onRedirectHandler = () => {
        const path = this.state.pathname;
		this.props.authSetRedirectPath(path);
        this.props.history.push('/authenticate');
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

    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            if (!updatedOrderForm[inputIdentifier]) { continue; } // Pointer protection
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                bIsModalHidden: !prevState.bIsModalHidden
            }
        });
    }

    closeModal = () => {
        this.setState({
            bIsModalHidden: true
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        // A loading animation will trigger.
        this.setState({
            bIsReporting: true
        });
        axios.post('/report', 
            { 
                uid: this.props.userDetails.uid,
                reason: this.state.controls.reason.value, 
                description: this.state.controls.description.value 
            })
            .then(() => {
                toast.success('Your review has been submitted successfully.');
                this.setState({
                    bIsReporting: false,
                    // bHasReported will change the content of the modal
                    bHasReported: true
                });
            })
            .catch(()=> {
                toast.success('Something went wrong when trying to report his user.');
                this.setState({
                    bIsReporting: false
                });
            });
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <>  
                <Modal 
                    show={!this.state.bIsModalHidden}
                    closeModal={this.closeModal}>
                    {
                        // We need to know if the user is logged in to be able to submit a report.
                        this.props.userDetails ?
                        
                            // After the report is complete, different content we be rendered to let the
                            // user know the report was posted successfully.
                            this.state.bHasReported ? 
                                <div className={classes.Modal}>
                                    <span style={{color: 'rgb(255, 112, 67)'}} className={classes.Title}>Thank You</span>
                                    <Separator />
                                    <div className={classes.Success}>
                                        We take these reports seriously. They help us make <strong>Servify</strong> a better place.
                                        If we have any doubts regarding the report, we'll reach out to you with further questions.
                                    </div>
                                    <div className={classes.Container}>
                                        <Button clicked={this.closeModal} style={{height: '50px'}} type='primary'>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                                : (
                                    <div className={classes.Modal}>
                                        <span className={classes.Title}>Report User</span>
                                        <Separator />
                                        <div className={classes.Prompt}>
                                            Please select a reason that fits why you're reporting this user.
                                            You may also let provide us with more details on why you're reporting this user
                                        </div>
                                        <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                                            {formElementsArray.map( (input) => {
                                                return (
                                                    <Input 
                                                        style={input[1].style}
                                                        key={input[0]} 
                                                        elementType={input[1].elementType} 
                                                        elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                                        changed={
                                                            // Pass the respective onChange handler.
                                                            input[1].elementType === 'select' ?
                                                                (event) => this.inputSelectChangeHandler(event, input[0])
                                                                : (event) => this.inputChangeHandler(event, input[0])
                                                        }
                                                        invalid={!input[1].valid}
                                                        shouldValidate={input[1].validation}
                                                        touched={input[1].touched}
                                                        value={input[1].value} 
                                                        valueType={input[1].valueType} />
                                                );
                                            })}
                                            <Button submit style={{height: '50px'}} disabled={!this.state.formIsValid || this.state.bIsReporting} blockButton type='primary'>
                                                {this.state.bIsReporting ? <LoadingDots /> : 'Submit Report'}
                                            </Button>
                                        </form>
                                    </div>
                                )
                        // If the user is not logged in.
                        : (
                            <>
                                <div className={classes.Prompt}>
                                    You need to be logged in if you want to submit a report. 
                                    Click the button below to redirect you to the authentication page.
                                </div>
                                <Separator />
                                <Button clicked={this.onRedirectHandler} style={{height: '50px'}} blockButton type='default'>
                                    Sign in
                                </Button>
                            </>
                        )
                    }
                </Modal>
                <button className={classes.Button} onClick={this.toggleModal}>
                    <div><SVG svg='flag' /><span>Report this user</span></div>
                </button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authSetRedirectPath: (path) => dispatch(authActions.authSetRedirectPath(path))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Report));