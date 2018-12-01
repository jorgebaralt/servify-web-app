import React from 'react';

import classes from './LabelName.module.css';

const labelName = (props) => {
    let label;
    switch(props.labelType) {
        case ('master'):
            label = <span 
                className={[classes.Label, classes.LabelMaster].join(' ')}>
                    <strong>Master</strong> <span>I'm pretty good.</span></span>
            break;
        case ('high'):
            label = <span 
                className={[classes.Label, classes.LabelHigh].join(' ')}>
                    <strong>High</strong> <span>Just the tip of the surface.</span></span>
            break;
        case ('medium'):
            label = <span 
                className={[classes.Label, classes.LabelMedium].join(' ')}>
                    <strong>Medium</strong> <span>Trying to improve!</span></span>
            break;
        case ('basic'):
            label = <span 
                className={[classes.Label, classes.LabelBasic].join(' ')}>
                    <strong>Basic</strong> <span>Just started learning.</span></span>
            break;
        default:
            label = <span 
                className={[classes.Label, classes.LabelDefault].join(' ')}>
                    <strong>Uhh...</strong> <span>Next question please...</span></span>
    }
    let labelWrapperClasses = [classes.LabelWrapper];
    if (!props.isHorizontal) {
        labelWrapperClasses = [classes.VerticalLabelWrapper];
    }
    return (
        <li className={labelWrapperClasses.join(' ')}>
            {label}
        </li>
    );
}

export default labelName;