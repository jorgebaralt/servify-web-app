import React, { Component } from 'react';
// Input Validity
import { checkValidity } from '../../../shared/checkValidity';
// CSS
import classes from './Edit.module.css';
// JSX
import Layout from '../../../hoc/Users/Layout/Layout';
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Button from '../../../components/UI/Button/Button';
import Separator from '../../../components/UI/Separator/Separator';
import EditImages, { setItems } from '../../../components/UI/EditImages/EditImages';
import SVG from '../../../components/SVG/SVG';
import ImageFadeIn from '../../../components/UI/ImageFadeIn/ImageFadeIn';
import InputImage from '../../../components/UI/Input/InputImage/InputImage';

class Edit extends Component {
    constructor(props) {
        super(props);
        // TODO remove placeholder
        const listImages = [
            <ImageFadeIn draggable="false" src='https://images.unsplash.com/photo-1531817506236-027915e5b07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' />,
            <ImageFadeIn draggable="false" src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' />,
            <ImageFadeIn draggable="false" src='https://images.unsplash.com/photo-1519781542704-957ff19eff00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1146&q=80' />,
            <ImageFadeIn draggable="false" src='https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=916&q=80' />,
        ];
        this.state={
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
                    valueType: 'first name',
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
                    valueType: 'last name',
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
            images: setItems(listImages), // current images
            imageFiles: null, // to be uploaded
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

    inputImageChangeHandler = (files) => {
        this.setState({
            imageFiles: files, 
        });
    }

    updateImages = (images) => {
        this.setState( () => {
            return {
                images: images
            }
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <Layout>
                <Panel header='Account Details'>
                    <div className={classes.JoinDate}>
                        Member since: <span>December 2018</span>
                    </div>
                    <Separator />
                    <form onSubmit={this.onSubmitHandler}>
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
                                    {input[1].private ? 
                                                <div className={classes.Private}>
                                                    <i className={classes.Icon}><SVG svg='security' /></i>{input[1].private}
                                                </div>
                                                : null }
                                    <Separator />
                                </div>
                            );
                        })}
                        <EditImages direction='vertical' updateItems={this.updateImages} items={this.state.images} />
                        <Separator />
                        <InputImage onChange={this.inputImageChangeHandler} onSubmit={this.onSubmitHandler} />
                        <Separator />
                        <Button style={{fontSize: '21px'}} disabled={!this.state.formIsValid} type='primary' blockButton={true}>Save</Button>
                    </form>
                </Panel>
            </Layout>
        );
    }
}

export default Edit;