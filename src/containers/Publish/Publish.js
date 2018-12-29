import React, { Component } from 'react';
import categories from '../../shared/categories';
// Input Validity
import { checkValidity } from '../../shared/checkValidity';
// CSS
import classes from './Publish.module.css';
// JSX
import Button from '../../components/UI/Button/Button';
import { Slider, Slide } from '../../components/UI/Slider';
import StepOne from './Steps/StepOne/StepOne';
import StepTwo from './Steps/StepTwo/StepTwo';
import StepThree from './Steps/StepThree/StepThree';
import StepFour from './Steps/StepFour/StepFour';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.title,
        displayValue: category.title,
    };
});

class Publish extends Component {
    state = {
        step: 1,
        steps: {
            1: {
                data: {
                    category: null
                },
                formIsValid: false
            },
            2: {
                data: {
                    companyName: null,
                    serviceTitle: null,
                    contactPhone: null,
                    contactEmail: null
                },
                formIsValid: false
            },
            3: {
                data: {
                    providerDescription: null,
                    serviceDescription: null
                },
                formIsValid: false
            },
            4: {
                data: {
                    address: null
                },
                formIsValid: false
            }
        }
    }

    updateData = (key) => {

    }

    onPrevHandler = () => {
        setTimeout( () => { // Delay to wait for slider transition
            this.setState( (prevState) => {
                return {
                    step: prevState.step - 1
                }
            });
        }, 100);
    }

    onNextHandler = () => {
        setTimeout( () => { // Delay to wait for slider transition
            this.setState( (prevState) => {
                return {
                    step: prevState.step + 1
                }
            });
        }, 100);
    }

    render() {
        const buttons = {
            prev: this.state.step > 1 ? <Button  style={{marginLeft: 0}} className={classes.Button} type='primary'>Go back</Button> : <></>,
            next: <Button style={this.state.step > 1 ? null : {marginLeft: 0}} className={classes.Button} type='primary'>Next</Button>,
            onClick: {
                prev: this.onPrevHandler,
                next: this.onNextHandler
            },
            className: classes.ButtonsWrapper
        }
        return (
            <div className={classes.Wrapper}>
                <Slider disableNav buttons={buttons} >
                    <Slide>
                        <StepOne checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    <Slide>
                        <StepTwo checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    <Slide>
                        <StepThree checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    <Slide>
                        <StepFour checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                </Slider>
            </div>
        );
    }
}

export default Publish;