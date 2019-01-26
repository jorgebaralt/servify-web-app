import React, { PureComponent } from 'react';
// Categories obj
import categories from '../../../../shared/categories'
// CSS
import classes from '../../Publish.module.css';
// Image
import logo from '../../../../assets/images/servify-logos/yellowborder-nobg.png';
// JSX
import Input from '../../../../components/UI/Input/Input';
import ImageFadeIn from '../../../../components/UI/ImageFadeIn/ImageFadeIn';

class StepOne extends PureComponent {
    state = {
        controls: {
            category: {
                elementType: 'select',
                elementConfig: {
                    label: 'Choose a category type',
                    placeholder: 'Select a category',
                    options: this.props.categoriesDatalist
                },
                value: '',
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            subcategory: null
        },
        formIsValid: false,
    }

    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = this.props.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            if (!updatedOrderForm[inputIdentifier]) { continue; } // Pointer protection
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    checkIfValid = () => {
        // If there is no subcategory, the form will be valid if there is a selected category.
        let formIsValid;
        // Otherwise, we check for the respective subcategories.
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            // If there are any subcategories, then build the new input. The loop breaks either way.
            if (category.dbReference === this.state.controls.category.value) { 
                if (category.subcategories) {
                    // If there is no subcategory then create one to make the new input appear.
                    const subCategoriesReferences = [];
                    const subcategoriesDatalist = category.subcategories.map( (category) => {
                        subCategoriesReferences.push(category.dbReference);
                        return {
                            value: category.dbReference,
                            displayValue: category.title,
                        };
                    });
                    /**
                     * Check if there is already a selected subcategory. If there is a selected 
                     * category AND the subcategory belongs to the selected category break the 
                     * loop and avoid resetting the subcategory, the form validity will be true.
                     * Otherwise, the subcategory will be set as invalid, and the user will need
                     * to select a new one.
                    */
                    if (this.state.controls.subcategory) { 
                        const bCategoryIncludesSubcategory = subCategoriesReferences.includes(this.state.controls.subcategory.value);
                        if (this.state.controls.subcategory.value && bCategoryIncludesSubcategory) {
                            formIsValid = true;
                            break;
                        } else {
                            formIsValid = false;
                            this.inputSelectChangeHandler('', 'subcategory');
                            this.setState((prevState) => {
                                return {
                                    ...prevState,
                                    controls: {
                                        ...prevState.controls,
                                        subcategory: {
                                            ...prevState.controls.subcategory,
                                            elementConfig: {
                                                ...prevState.controls.subcategory.elementConfig,
                                                options: subcategoriesDatalist
                                            },
                                            value: null,
                                            valid: false,
                                            touched: true
                                        }
                                    }
                                }
                            });
                            break;
                        }
                    }
                    // Setting the subcategory if there are none.
                    else {
                        this.setState((prevState) => {
                            return {
                                ...prevState,
                                controls: {
                                    ...prevState.controls,
                                    subcategory: {
                                        elementType: 'select',
                                        elementConfig: {
                                            label: 'Choose a subcategory',
                                            placeholder: 'Select a category',
                                            options: subcategoriesDatalist
                                        },
                                        value: '',
                                        valueType: 'option',
                                        validation: {
                                            required: true
                                        },
                                        valid: false,
                                        touched: false,
                                    },
                                }
                            }
                        });
                        // The form is false since there is no subcategory with a value.
                        formIsValid = false;
                        break;
                    }
                } else {
                    // Being inside this else block means there is no subcategory, the form is valid
                    // only if there is a category selected, otherwise false. The state is set without
                    // any subcategory as well.
                    formIsValid = this.state.controls.category.value ? true : false;
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            controls: {
                                ...prevState.controls,
                                subcategory: null,
                            }
                        }
                    });
                    break;
                }
            }
        }
        return formIsValid;
    }

    componentDidUpdate = () => {
        const data = {};
        for (let key in this.state.controls) {
            if (!this.state.controls[key]) { continue; } // Pointer protection
            if (!this.state.controls[key].value) { // Pointer protection
                continue;
            }
            data[key] = this.state.controls[key].value;
        }
        // If current data is equal to the props data, then updating is not needed.
        const bShouldNotUpdate = (JSON.stringify(data) === JSON.stringify(this.props.data));
        if (bShouldNotUpdate) { return; }
        const formIsValid = this.checkIfValid();
        this.props.updateData(this.props.stepKey, data, formIsValid);
    }

    render () {
        const containerClasses = [classes.Container];
        if (this.props.activeStep !== this.props.stepKey) {
            containerClasses.push(classes.Hidden);
        }
        const formElementsArray = Object.entries(this.state.controls);
        return (
            <div className={containerClasses.join(' ')}>
                <div className={classes.FormWrapper}>
                    <div className={classes.FormContainer}>
                        <h1>
                            Hello there! We'll need some information before we can publish your service,
                            just follow these steps and you'll be good to go.
                        </h1>
                        <div className={classes.Step}><span>S</span>tep 1: Category</div>
                        <h2>
                            What type of service do you provide?
                        </h2>
                        <form style={{userSelect: 'none'}} onSubmit={this.onSubmitHandler}>
                            {formElementsArray.map( (input) => {
                                if (!input[1] || !input[0]) { return null; } // Pointer protection
                                return (
                                    <Input 
                                        style={input[1].style}
                                        key={input[0]} 
                                        elementType={input[1].elementType} 
                                        elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                        changed={(event) => this.inputSelectChangeHandler(event, input[0])}
                                        invalid={!input[1].valid}
                                        shouldValidate={input[1].validation}
                                        touched={input[1].touched}
                                        value={input[1].value} 
                                        valueType={input[1].valueType} />
                                );
                            })}
                        </form>
                    </div>
                </div>
                <div className={classes.ImageWrapper}>
                    <div className={classes.ImageContainer}>
                        <ImageFadeIn draggable={false} src={logo} />
                    </div>
                </div>
            </div>
        )
    }
}

export default StepOne;