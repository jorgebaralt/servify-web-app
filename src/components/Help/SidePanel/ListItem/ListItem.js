import React from 'react';
// CSS
import classes from './ListItem.module.css';

const listItem = (props) => {
    const ListItemClasses = [classes.ListItem];
    if (props.active) {
        ListItemClasses.push(classes.ListItemActive);
    }
    return (
        <li className={classes.ListItemWrapper}>
            <button onClick={props.onClick} className={ListItemClasses.join(' ')}>
                <div className={classes.ListItemContainer}>
                    <div className={classes.ListItemText}>
                        {props.title}
                    </div>
                </div>
            </button>
        </li>
    );
}

export default listItem;