import React from 'react';

import classes from './IntroHeader.module.css';

const introHeader = (props) => {
    return (
        <div className={classes.IntroHeader}>{props.children}</div>        
    );
}

export default introHeader;