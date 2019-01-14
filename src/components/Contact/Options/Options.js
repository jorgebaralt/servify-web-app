import React from 'react';
// CSS
import classes from './Options.module.css';
// JSX
import Option from './Option/Option';
import Button from '../../UI/Button/Button';

const option = (props) => {
    const options = props.activeReason.options.map( (option, index) => {
        return (
            <Option key={index} 
                option={option} 
                toggleIsFormSelected={() => props.toggleIsFormSelected(index)} />
        );
    });
    return (
        <div className={classes.Container}>
            <h1>Contact us</h1>
            <div className={classes.Intro}>
                <h2>{props.activeReason.text}</h2>
                <p>Choose one of the following options</p>
            </div>
                {options}
            <br/>
            <Button blockButton type='primary' clicked={() => props.toggleIsReasonSelected(null)}>Go back</Button>
        </div>
    );
}

export default option;