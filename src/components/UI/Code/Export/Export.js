import React from 'react';
import Typist from 'react-typist';

import classes from './Export.module.css'

const exportComponent = (props) => {
    if (props.singleExport) {
        return (
            <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
                <code className={classes.Export}>
                    <h2>export {props.singleExport.name} as {props.singleExport.export} <span>Information</span><span>;</span></h2>
                </code>
            </Typist>
        );
    }
    return (
        <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
            <code className={classes.Export}>
                <h2>export default <span>{props.export}</span><span>;</span></h2>
            </code>
        </Typist>
    );
}

export default exportComponent;