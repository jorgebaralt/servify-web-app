import React from 'react';
import Typist from 'react-typist';

import classes from './Import.module.css'

const importComponent = (props) => {
    if (!props.import) {
        return (
            <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
                <code className={classes.Import}>
                    <h2>import <span>{props.defaultImport ? props.defaultImport : 'No prop.defaultImport found.'}</span> from <span>'{props.package ? props.package : 'No props.package found.'}'</span><span>;</span></h2>
                </code>
            </Typist>
        );
    }
    return (
        <Typist avgTypingDelay={25} stdTypingDelay={5} cursor={{show: false}}>
            <code className={classes.Import}>
                <h2>import <span>{props.defaultImport ? props.defaultImport : 'No prop.defaultImport found.'}</span>, <span className={classes.Brackets}>{'{'}</span><span> {props.import} </span><span className={classes.Brackets}>{'}'}</span> from <span>'{props.package ? props.package : 'No props.package found.'}'</span><span>;</span></h2>
            </code>
        </Typist>
    );
}

export default importComponent;