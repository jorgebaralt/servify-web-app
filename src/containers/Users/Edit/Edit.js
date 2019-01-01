import React, { Component } from 'react';
// Input Validity
import { checkValidity } from '../../../shared/checkValidity';
// CSS
import classes from './Edit.module.css';
// JSX
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Button from '../../../components/UI/Button/Button';
import Separator from '../../../components/UI/Separator/Separator';
import SVG from '../../../components/SVG/SVG';

class Edit extends Component {
    state={
        controls: {
            firstName: {
                title: 'First Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'first name',
                    autoCorrect:"off",
                    autoCapitalize:"on",
                    spellCheck:"false"
                },
                value: 'First Name', // TODO Fetch data from database
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                style: {margin: 0}
            },
            lastName: {
                title: 'Last Name',
                private: 'Your public profile only shows your first name.',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'last name',
                    autoCorrect:"off",
                    autoCapitalize:"on",
                    spellCheck:"false"
                },
                value: 'Last Name', // TODO Fetch data from database
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                style: {margin: 0}
            },
            email: {
                title: 'Email',
                private: 'We won’t share your email address with anyone else.',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    autoComplete: 'email',
                    autoCorrect:"off",
                    autoCapitalize:"off",
                    spellCheck:"false"
                },
                value: 'Email',
                valueType: 'email', // TODO Fetch data from database
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                style: {margin: 0}
            },
        },
        formIsValid: true,
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
        // this.props.onEdit(this.state.controls.email.value, this.state.controls.password.value, this.state.bRememberMe);
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <>
                <Panel header='Account Details'>
                    <div className={classes.JoinDate}>
                        Member since: <span>December 2018</span>
                    </div>
                    <Separator />
                    <form onSubmit={this.onSubmitHandler}>
                    {formElementsArray.map( (input) => {
                        return (
                            <div key={input[0]}>
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
                                {input[1].private ? 
                                            <div className={classes.Private}>
                                                <i className={classes.Icon}><SVG svg='security' /></i>{input[1].private}
                                            </div>
                                            : null }
                                <Separator />
                            </div>
                        );
                    })}
                    <Button style={{fontSize: '21px'}} disabled={!this.state.formIsValid} type='primary' blockButton={true}>Save</Button>
                    </form>
                </Panel>
            </>
        );
    }
}

export default Edit;