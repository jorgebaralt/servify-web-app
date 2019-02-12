import React, { Component } from 'react';
// react-redux & axios
import  { connect } from 'react-redux';
import  { toast } from 'react-toastify';
import axios from '../../../axios-services';
import { authActions } from '../../../store/actions'
// Input Validity
import { checkValidity } from '../../../shared/checkValidity';
// CSS
import classes from './Edit.module.css';
// JSX
import Layout from '../../../hoc/Users/Layout/Layout';
import SVG from '../../../components/SVG/SVG';
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Button from '../../../components/UI/Button/Button';
import ProfilePhoto from '../../../components/Users/ProfilePhoto/ProfilePhoto';
import Separator from '../../../components/UI/Separator/Separator';
import LoadingDots from '../../../components/UI/LoadingDots/LoadingDots';
import InputImage from '../../../components/UI/Input/InputImage/InputImage';
import DeleteImage from '../../../components/UI/Input/InputImage/DeleteImage/DeleteImage';

class Edit extends Component {
    constructor(props) {
        super(props);
        const imagesInfo = [{ // For the image delete input
            url: props.userDetails.photoURL,
            filename: props.userDetails.uid
        }];
        this.state={
            bIsLoading: true,
            bIsUpdatingUser: false,
            bIsMounted: false,
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
            images: [props.userDetails.photoURL],
            formIsValid: true,
        };
    }    
    // To fetch user data
    componentDidMount() {
        axios.get('/user', { params: {uid: this.props.userDetails.uid }})
            .then(response => {
                const imagesInfo = response.data.imagesInfo;
                // For the image delete input
                if (imagesInfo) {
                    this.setState({
                        imagesInfo: imagesInfo,
                        images: [imagesInfo[0].url],
                        bIsMounted: true
                    });
                }
            })
            .catch(() => {
                toast.error(
                    `Something went wrong, you might not be able to delete or update your 
                    profile picture Reload the page if you want to try again.`);
            })
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

    updateUserDetails = (newUserDetails) => {
        const updatedUserDetails = {
            ...this.props.userDetails,
            ...newUserDetails
        };
        this.props.updateUserDetails(updatedUserDetails);
    }

    // Updates profile picture.
    uploadImage = (imagesInfo) => {
        const photoURL = imagesInfo[0].url;
        axios.put('/user', 
            {
                uid: this.props.userDetails.uid, 
                updatedUser: { imagesInfo: imagesInfo, photoURL: photoURL }
            })
            .then(response => {
                const updatedUserDetails = response.data;
                this.updateUserDetails(updatedUserDetails);
                // For the image delete input
                this.setState({
                    imagesInfo: updatedUserDetails.imagesInfo,
                    images: [updatedUserDetails.imagesInfo[0].url],
                })
                toast.success('Profile updated successfully.');
            }).catch(() => {
                toast.error('Something went wrong while trying to update your profile. You may try again.');
            });
    }

    // To delete profile picture.
    onDelete = () => {
        axios.put('/user', { 
                uid: this.props.userDetails.uid, 
                deletePhotoURL: true,
                updatedUser: { imagesInfo: null }
            })
            .then(response => {
                const updatedUserDetails = response.data;
                this.updateUserDetails(updatedUserDetails);
                // For the image delete input
                this.setState({
                    imagesInfo: updatedUserDetails.imagesInfo,
                    images: [],
                })
                toast.success('Your profile picture has been removed.');
            }).catch(() => {
                toast.error('Something went wrong while trying to update your profile. You may try again.');
            });
    }

    // Currently, this only updates displayName.
    onSubmitHandler = () => {
        this.setState({
            bIsUpdatingUser: true
        });
        axios.put('/user', { 
                uid: this.props.userDetails.uid, 
                updatedUser: { displayName: this.state.controls.displayName.value } 
            })
            .then(response => {
                const updatedUserDetails = response.data;
                this.updateUserDetails(updatedUserDetails);
                toast.success('Profile updated successfully.');
                this.setState({
                    bIsUpdatingUser: false
                });
            })
            .catch(() => {
                toast.error('Something went wrong while trying to update your profile. You may try again.');
                this.setState({
                    bIsUpdatingUser: false
                });
            });
    }

    render () {
        const creationDate = (new Date(Number(this.props.userDetails.metadata.a))).toLocaleDateString();
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <Layout>
                <Panel header='Account Details'>
                    <div className={classes.JoinDate}>
                        Member since: <span>{creationDate}</span>
                    </div>
                    <Separator />
                    <div>
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
                        <Button 
                            clicked={this.onSubmitHandler}
                            disabled={!this.state.formIsValid || this.state.bIsUpdatingUser} 
                            type='success' 
                            style={{height: '50px'}}
                            blockButton={true}>
                            {this.state.bIsUpdatingUser ? <LoadingDots /> : 'Save Profile'}
                        </Button>
                        <Separator />
                        <div style={{marginBottom: '12px'}} className={classes.InputTitle}>
                            Profile Picture
                        </div>
                        <Separator />
                        {/*
                        * Only render the InputImage and DeleteImage components if
                        * the user did NOT create an account through the google or facebook API.
                        */}
                        {this.props.userDetails.providerData[0].providerId === 'password' ? 
                            // Only makes sense to render DeleteImage if there is a profile picture already.
                            this.state.images.length && this.state.bIsMounted ? 
                                <DeleteImage 
                                    onDelete={this.onDelete}
                                    uid={this.props.userDetails.uid} 
                                    imagesInfo={this.state.imagesInfo} />
                                : (
                                    <InputImage 
                                        profileUpload 
                                        submit 
                                        bIsSingleImage 
                                        onUpload={this.uploadImage} 
                                        onSubmit={this.onSubmitHandler} />
                                )
                            : (
                                <div className={classes.Image}>
                                    <ProfilePhoto noWrapper draggable={false} src={this.props.userDetails.photoURL} />
                                    <span className={classes.Provider}>
                                        Profile picture associated to your {this.props.userDetails.providerData[0].providerId} account.
                                    </span>
                                </div>
                            )}
                    </div>
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

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserDetails: (userDetails) => dispatch(authActions.authUpdateUserDetails(userDetails)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);