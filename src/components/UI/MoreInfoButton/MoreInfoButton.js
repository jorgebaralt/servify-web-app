import React from 'react';

import moreInfoSVG from '../../../assets/svg/more-info.svg';

import classes from './MoreInfoButton.module.css';

const moreInfoButton = (props) => {
    let moreInfoClasses = [classes.MoreInfo];
    if (props.noHover) {moreInfoClasses.push(classes.noHover)}
    return (
        <div style={{width: props.width, height: props.height}} className={moreInfoClasses.join(' ')}>
            <a href={props.to} onClick={props.click}>
                <span className={classes.CircleTop}></span>
                <span className={classes.CircleBottom}></span>
                <img src={moreInfoSVG} alt=''/>
            </a>
        </div>
    )
}

export default moreInfoButton;