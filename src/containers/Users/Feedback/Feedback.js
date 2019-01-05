import React, { Component } from 'react';
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
import SVG from '../../../components/SVG/SVG';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state={
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
            
            formIsValid: true,
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
                        <Button style={{fontSize: '21px'}} disabled={!this.state.formIsValid} type='primary' blockButton={true}>Save</Button>
                    </form>
                </Panel>
            </Layout>
        );
    }
}

export default Feedback;