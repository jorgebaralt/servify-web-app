import React from 'react';
// CSS
import classes from './Form.module.css';
// JSX
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Separator from '../../../components/UI/Separator/Separator';

const form = (props) => {
    const formElementsArray = Object.entries(props.controls);
    return (
        <div className={classes.Container}>
            <h1>Contact us</h1>
            <div className={classes.Intro}>
                <h2>{props.activeReason.text}</h2>
                <p>{props.activeOption}</p>
                <Separator />
                <h2 style={{marginBottom: '-30px'}}>Ticket information</h2>
            </div>
            <form style={{userSelect: 'none'}} onSubmit={props.onSubmitHandler}>
                {formElementsArray.map( (input) => {
                    return <Input 
                        style={input[1].style}
                        key={input[0]} 
                        elementType={input[1].elementType} 
                        elementConfig={props.controls[input[1].valueType] ? props.controls[input[1].valueType].elementConfig : input[1].elementConfig} // Referenced to state to mutate
                        changed={(event) => props.inputChangeHandler(event, input[0])}
                        invalid={!input[1].valid}
                        shouldValidate={input[1].validation}
                        touched={input[1].touched}
                        value={input[0] === 'name' ? props.value : input[1].value} 
                        valueType={input[1].valueType} />;
                })}
                <Button style={{marginTop: '20px'}} disabled={!props.formIsValid} type='success' blockButton={true}>Submit</Button>
            </form>
            <Separator />
            <Button blockButton type='primary' clicked={props.toggleIsFormSelected}>Go back</Button>
        </div>
    );
}

export default form;