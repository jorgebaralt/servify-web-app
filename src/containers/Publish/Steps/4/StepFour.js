import React, { PureComponent } from 'react';
// CSS
import classes from '../../Publish.module.css';
// JSX
import Separator from '../../../../components/UI/Separator/Separator';
import InputImage from '../../../../components/UI/Input/InputImage/InputImage';

class StepFour extends PureComponent {
    constructor(props) {
        super(props);
        this.myTimer = null;
    }
    state = {
        controls: {
            imageFiles: {
                value: null,
            },
        },
        formIsValid: true
    }

    componentDidUpdate = () => {
        const data = {};
        for (let key in this.state.controls) {
            data[key] = this.state.controls[key].value;
        }
        const formIsValid = this.state.formIsValid;
        this.props.updateData(this.props.stepKey, data, formIsValid);
    }

    inputImageChangeHandler = (files) => {
        this.setState( (prevState) => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    imageFiles: {
                        value: files
                    },
                }
            } 
        });
    }

    render () {
        const containerClasses = [classes.Container];
        if (this.props.activeStep !== this.props.stepKey) {
            containerClasses.push(classes.Hidden);
        }
        return (
            <div className={containerClasses.join(' ')}>
                <div className={classes.FormWrapper}>
                    <div className={classes.Step}><span>S</span>tep 4: Images (Optional)</div>
                    <h2>
                        Provide us some images about your services! You can always update them later,
                        this is also optional and not a necessary step. Click <strong>next</strong> if 
                        you want to skip this step.
                    </h2>
                    <Separator />
                    <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                        <InputImage onChange={this.inputImageChangeHandler} />
                    </form>
                </div>
            </div>
        )
    }
}

export default StepFour;