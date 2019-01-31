import React, { Component } from 'react';
// react-redux & axios
import  { connect } from 'react-redux';
import axios from '../../../axios-services';
// Input Validity
import { checkValidity } from '../../../shared/checkValidity';
import { setImagesArray } from '../../../shared/imagesHandler';
// CSS
import classes from './Edit.module.css';
// JSX
import Layout from '../../../hoc/Users/Layout/Layout';
import SVG from '../../../components/SVG/SVG';
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Button from '../../../components/UI/Button/Button';
import Separator from '../../../components/UI/Separator/Separator';
import InputImage from '../../../components/UI/Input/InputImage/InputImage';
import DeleteImage from '../../../components/UI/Input/InputImage/DeleteImage/DeleteImage';

class Edit extends Component {
    constructor(props) {
        super(props);
        const imagesInfo = [{ // For the image delete input
            url: props.userDetails.photoURL,
            filename: [props.userDetails.uid,'profile_picture'].join('__')
        }];
        this.state={
            bIsLoading: true,
            controls: {
                displayName: {
                    title: 'Display Name',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        autoComplete: 'name',
                        autoCorrect:"off",
                        autoCapitalize:"on",
                        spellCheck:"false"
                    },
                    value: props.userDetails.displayName ? props.userDetails.displayName : '',
                    valueType: 'display name',
                    validation: {
                        required: false
                    },
                    valid: false,
                    touched: false,
                    style: {margin: 0}
                },
            },
            imagesInfo: imagesInfo,
            images: [],
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
            imageFiles: {
                value: files
            },
        });
    }

    uploadImage = (imagesInfo) => {
        console.log(imagesInfo);
        axios.put('/user', { data: { uid: this.props.userDetails.uid, imagesInfo: imagesInfo }})
            .then(
                res => {
                    console.log(res);
                }
            ).catch(err => {
                console.log(err);
            });
    }

    onDelete = () => {
        console.log('ping');
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        axios.put('/user', { data: { uid: this.props.userDetails.uid, displayName: this.state.controls.displayName.value }})
            .then(
                res => {
                    console.log(res);
                }
            ).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        axios.get('/user', { params: {uid: this.props.userDetails.uid }})
            .then(response => {
                console.log(response)
            })
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
                        <Button submit 
                            disabled={!this.state.formIsValid} 
                            type='success' 
                            blockButton={true}>Save Profile</Button>
                        <Separator />
                        <div style={{marginBottom: '12px'}} className={classes.InputTitle}>
                            Change Profile Picture
                        </div>
                        <InputImage profileUpload submit bIsSingleImage onUpload={this.uploadImage} onSubmit={this.onSubmitHandler} />
                        <Separator />
                        <div style={{marginBottom: '24px'}} className={classes.InputTitle}>
                            Delete Profile Picture
                        </div>
                        <DeleteImage 
                            onDelete={this.state.onDelete}
                            uid={this.props.userDetails.uid} 
                            imagesInfo={this.state.imagesInfo} />
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

export default connect(mapStateToProps)(Edit);