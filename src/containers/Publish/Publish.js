import React, { Component } from 'react';
import categories from '../../shared/categories';
// Input Validity
import { checkValidity } from '../../shared/checkValidity';
// CSS
import classes from './Publish.module.css';
// JSX
import { Slider, Slide } from '../../components/UI/Slider';
import StepOne from './Steps/StepOne/StepOne';
import StepTwo from './Steps/StepTwo/StepTwo';
import StepThree from './Steps/StepThree/StepThree';
import StepFour from './Steps/StepFour/StepFour';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.title,
        displayValue: category.title
    };
});

class Publish extends Component {
    render() {
        return (
            <div className={classes.Wrapper}>
                <Slider>
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