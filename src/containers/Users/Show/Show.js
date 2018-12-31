import React, { Component } from 'react';
// CSS
import classes from './Show.module.css';
// JSX
import Input from '../../../components/UI/Input/Input';
import Panel from '../../../components/UI/Panel/Panel';
import Separator from '../../../components/UI/Separator/Separator';

class Show extends Component {
    state={
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    disabled: "true"
                },
                value: 'Email',
                valueType: 'email', // TODO Fetch data from database
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                style: {marginTop: '22px'}
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    disabled: "true"
                },
                value: 'First Name', // TODO Fetch data from database
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    disabled: "true"
                },
                value: 'Last Name', // TODO Fetch data from database
                valueType: 'text',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
        }
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
                    {formElementsArray.map( (input) => {
                        return (
                            <>
                                <Input 
                                style={input[1].style}
                                key={input[0]} 
                                elementType={input[1].elementType} 
                                elementConfig={this.state.controls[input[1].valueType] ? this.state.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                                changed={(event) => this.inputChangeHandler(event, input[0])}
                                invalid={!input[1].valid}
                                shouldValidate={input[1].validation}
                                touched={input[1].touched}
                                value={input[1].value} 
                                valueType={input[1].valueType} />
                                <Separator />
                            </>
                        );
                    })}
                </Panel>
            </>
        );
    }
}

export default Show;