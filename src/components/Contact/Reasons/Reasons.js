import React from 'react';
// CSS
import classes from './Reasons.module.css';
// JSX
import Reason from './Reason/Reason';

const reason = (props) => {
    const reasons = Object.entries(props.reasons).map( (reason, index) => {
        return (
            <Reason toggleIsReasonSelected={() => props.toggleIsReasonSelected(props.reasons[reason[0]])}
                key={index} 
                svg={reason[1].svg}
                text={reason[1].text} />
        );
    });
    return (
        <div className={classes.Container}>
            <h1>Contact us</h1>
            <div className={classes.Intro}>
                <h2>We need to know why are you contacting us</h2>
                <p>
                    We categorize possible topics on why you might be trying to reach us to make things more efficient, 
                    select the most suitable option for you. If you think none are suitable, please select 'Other'.
                </p>
            </div>
            <div className={classes.ReasonsContainer}>
                {reasons}
            </div>
        </div>
    );
}

export default reason;