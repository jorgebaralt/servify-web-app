import React, { Component } from 'react';
// react-redux, axios & toast
import { connect } from 'react-redux';
import axios from '../../../axios-services';
import { toast } from 'react-toastify';
// Input Validity
import { checkValidity } from '../../../shared/checkValidity';
// CSS
import classes from './Feedback.module.css';
// JSX
import Layout from '../../../hoc/Users/Layout/Layout';
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Button from '../../../components/UI/Button/Button';
import Separator from '../../../components/UI/Separator/Separator';
import LoadingDots from '../../../components/UI/LoadingDots/LoadingDots';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state={
            bIsUploading: false,
            controls: {
                feedbackOne: {
                    elementType: 'textarea',
                    title: `How satisfied are you with Servify as an user?`,
                    elementConfig: {
                        type: 'text',
                        autoCorrect:"off",
                        autoCapitalize:"on",
                        spellCheck:"false"
                    },
                    value: '',
                    valueType: 'text',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    style: {margin: 0}
                },
                feedbackTwo: {
                    elementType: 'textarea',
                    title: `What other thoughts or suggestions do you 
                            have about Servify (either positive or constructive feedback)?`,
                    elementConfig: {
                        type: 'text',
                        autoCorrect:"off",
                        autoCapitalize:"on",
                        spellCheck:"false"
                    },
                    value: '',
                    valueType: 'text',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    style: {margin: 0}
                }
            },
            formIsValid: false,
            bIsSent: false
        };
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

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({
            bIsUploading: true
        });
        axios.post('/feedback', 
            { 
                uid: this.props.userDetails.uid,
                satisfaction: this.state.controls.feedbackOne.value, 
                improvements: this.state.controls.feedbackTwo.value 
            })
            .then(() => {
                this.setState({
                    bIsUploading: false,
                    bIsSent: true
                });
                toast.success('Your feedback has been sent succesfully. Thank you for taking the time in reaching out to us.');
            })
            .catch(() => {
                this.setState({
                    bIsUploading: false
                });
                toast.error('Something went wrong when trying to send your feedback.');
            })
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <Layout>
                <Panel header='Feedback'>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className={classes.Title}>
                            We take feedback from our customers seriously as we're constantly trying to improve and provide excellent
                            service. We'd love to hear feedback from you with a brief customer survey down below:
                        </div>
                        <Separator />
                        {formElementsArray.map( (input) => {
                            return (
                                <div className={classes.InputWrapper} key={input[0]}>
                                    <div className={classes.InputContainer}>
                                        <div className={classes.InputTitle}>
                                            {input[1].title}
                                        </div>
                                        <div className={classes.Input}>
                                            <Input 
                                                style={input[1].style}
                                                elementType={input[1].elementType} 
                                                elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                                changed={(event) => this.inputChangeHandler(event, input[0])}
                                                invalid={!input[1].valid}
                                                shouldValidate={input[1].validation}
                                                touched={input[1].touched}
                                                value={input[1].value} 
                                                valueType={input[1].valueType} />
                                        </div>
                                    </div>
                                    <Separator />
                                </div>
                            );
                        })}
                        <Button submit style={{fontSize: '17px', height: '50px'}} 
                            disabled={!this.state.formIsValid || this.state.bIsUploading || this.state.bIsSent} 
                            type='success' 
                            blockButton>
                            {this.state.bIsUploading ? <LoadingDots /> : 'Submit'}
                        </Button>
                    </form>
                </Panel>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

export default connect(mapStateToProps)(Feedback);