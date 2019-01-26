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
import StepOne from './Steps/1/StepOne';
import StepTwo from './Steps/2/StepTwo';
import StepThree from './Steps/3/StepThree';
import StepFour from './Steps/4/StepFour';
import StepFive from './Steps/5/StepFive';
import StepSix from './Steps/6/StepSix';
import StepSeven from './Steps/7/StepSeven';
import StepEight from './Steps/8/StepEight';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.dbReference,
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
                    // May have subcategory.
                },
                formIsValid: false
            },
            2: {
                data: {
                    serviceTitle: null,
                    companyName: null,
                    companyWebsite: null,
                    contactPhone: null,
                    contactEmail: null
                },
                formIsValid: false
            },
            3: {
                data: {
                    serviceDescription: null,
                    providerDescription: null
                },
                formIsValid: false
            },
            4: {
                data: {
                    imageFiles: null,
                },
                formIsValid: false
            },
            5: {
                data: {
                    option: {
                        bool: null,
                        display: null
                    }
                },
                formIsValid: false
            },
            6: {
                data: {
                    street: null,
                    name: null,
                    city: null,
                    region: null,
                    postal: null
                },
                formIsValid: false
            },
            7: {
                data: {
                    address: null,
                    coordinates: null
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
        window.scrollTo(0,0); // Scrolls to the top before sliding
        setTimeout( () => { // Delay to wait for slider transition
            this.setState( (prevState) => {
                const step = Clamp(prevState.step -1, 1, 9);
                return {
                    step: step,
                    steps: {
                        ...prevState.steps,
                    }
                }
            });
        }, 250);
    }

    onNextHandler = () => {
        window.scrollTo(0,0); // Scrolls to the top before sliding
        setTimeout( () => { // Delay to wait for slider transition
            this.setState( (prevState) => {
                const step = Clamp(prevState.step + 1, 1, Object.keys(this.state.steps).length + 1);
                return {
                    step: step
                }
            });
        }, 50);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        const activeStep = this.state.step;
        const buttons = {
            prev: this.state.step > 1 ? <Button tabIndex='-1' style={{marginLeft: 0}} className={classes.Button} type='primary'>Go back</Button> : <></>,
            next: this.state.step !== 8 ? <Button tabIndex='-1' disabled={!this.state.steps[activeStep].formIsValid} style={this.state.step > 1 ? null : {marginLeft: 0}} className={classes.Button} type='primary'>Next</Button> : <></>,
            onClick: {
                prev: this.onPrevHandler,
                next: this.onNextHandler
            },
            className: classes.ButtonsWrapper
        }
        return (
            <div className={classes.Wrapper}>
                <Slider progressBar fadeIn disableNav buttons={buttons}>
                    {/* Category */}
                    <Slide>
                        <StepOne data={this.state.steps['1'].data} 
                            activeStep={activeStep} stepKey={1} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* Basic Information */}
                    <Slide>
                        <StepTwo activeStep={activeStep} stepKey={2} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* Details */}
                    <Slide>
                        <StepThree activeStep={activeStep} stepKey={3} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* Images (Optional) */}
                    <Slide>
                        <StepFour activeStep={activeStep} stepKey={4} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* Logistic */}
                    <Slide>
                        <StepFive activeStep={activeStep} stepKey={5} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* Service Address */}
                    <Slide>
                        <StepSix 
                            bIsDelivery={this.state.steps['5'].data.option} 
                            activeStep={activeStep} stepKey={6} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* The Map */}
                    <Slide>
                        <StepSeven 
                            bIsDelivery={this.state.steps['5'].data.option} 
                            data={this.state.steps['6'].data} 
                            activeStep={activeStep} stepKey={7} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                    {/* Posting service data happens on step 8 */}
                    <Slide>
                        <StepEight 
                            data={this.state.steps} 
                            dataIsValid={this.state.dataIsValid} 
                            activeStep={activeStep} stepKey={8} updateData={this.updateData} checkValidity={checkValidity} categoriesDatalist={categoriesDatalist} />
                    </Slide>
                </Slider>
            </div>
        );
    }
}

export default Publish;