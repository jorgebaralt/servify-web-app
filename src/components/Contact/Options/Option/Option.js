import React from 'react';
// CSS
import classes from './Option.module.css';
// JSX
import Separator from '../../../UI/Separator/Separator';
import Button from '../../../UI/Button/Button';

const option = (props) => {
    return (
        <div>
            <div className={classes.Option}>
                <span>{props.option}</span>
                <Button clicked={props.toggleIsFormSelected} type='primary'>Next</Button>
            </div>
            <Separator />
        </div>
    );
}

export default option;