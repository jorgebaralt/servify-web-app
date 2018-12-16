import React from 'react';
// CSS
import classes from './Separator.module.css';

const separator = () => {
    return (
        <div style={{margin: '10px auto'}} className={classes.SeparatorWrapper}><div className={classes.SeparatorContainer}><div className={classes.Line} /></div></div>
    )
}

export default separator;