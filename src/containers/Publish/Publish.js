import React, { Component } from 'react';
import categories from '../../shared/categories';
// Input validity & Number clamp
import { checkValidity } from '../../shared/checkValidity';
import { Clamp } from '../../shared/clamp';
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
        },
        dataIsValid: false
    }

    updateData = (key, data, formIsValid) => {
        const updatedData = data;
        const updatedForm = formIsValid;
        this.setState( (prevState) => {
            return {
                ...prevState,
                steps: {
                    ...prevState.steps,
                    [key]: {
                        ...prevState.steps[key],
                        data: updatedData,
                        formIsValid: updatedForm
                    }
                },
                dataIsValid: updatedForm
            }
        });
    }

    onPrevHandler = () => {
        setTimeout( () => { // Delay to wait for slider transition
            this.setState( (prevState) => {
                const step = Clamp(prevState.step - 1, 1, 4);
                return {
                    step: step,
                    steps: {
                        ...prevState.steps,
                    }
                }
            });
        }, 100);
    }

    onNextHandler = () => {
        setTimeout( () => { // Delay to wait for slider transition
            this.setState( (prevState) => {
                const step = Clamp(prevState.step + 1, 1, 4);
                return {
                    step: step
                }
            });
        }, 100);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        const activeStep = this.state.step;
        const buttons = {
            prev: this.state.step > 1 ? <Button  style={{marginLeft: 0}} className={classes.Button} type='primary'>Go back</Button> : <></>,
            next: <Button disabled={!this.state.steps[activeStep].formIsValid} style={this.state.step > 1 ? null : {marginLeft: 0}} className={classes.Button} type='primary'>Next</Button>,
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
                        <StepOne activeStep={activeStep} stepKey={1} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    <Slide>
                        <StepTwo activeStep={activeStep} stepKey={2} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    <Slide>
                        <StepThree activeStep={activeStep} stepKey={3} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    <Slide>
                        <StepFour activeStep={activeStep} stepKey={4} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                </Slider>
            </div>
        );
    }
}

export default Publish;