import React from 'react';
// CSS
import classes from './List.module.css';

const list = (props) => {
    // Toggle button state
    const toggleButtonCategoriesClasses = [classes.ToggleButtonArrow];
    if (props.bIsClosed) {
        toggleButtonCategoriesClasses.push(classes.Closed);
    }
    return (
        <div className={classes.ListWrapper}>
            <button className={classes.ListToggleButton} onClick={props.onClick}>
                <div className={classes.ToggleButtonHeader}>
                    <div className={classes.ToggleButtonTextContainer}>
                        <span className={classes.ToggleButtonText}>{props.title}</span>
                    </div>
                    <div className={classes.ToggleButtonArrowWrapper}>
                        <div className={classes.ToggleButtonArrowContainer}>
                            <span className={toggleButtonCategoriesClasses.join(' ')} />
                        </div>
                    </div>
                </div>
                {props.bIsClosed ? 
                    <span className={classes.ClosedText}>
                        {props.closedChildren}
                    </span> :
                    null}
            </button>
            {props.bIsClosed ?
                null :
                <div className={classes.ChildrenListWrapper}>
                    <ul className={classes.ChildrenListContainer}>
                        {props.children}
                    </ul>
                </div>
            }
        </div>
    );
}

export default list;