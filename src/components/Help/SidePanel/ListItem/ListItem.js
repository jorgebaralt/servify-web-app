import React from 'react';
// CSS
import classes from './ListItem.module.css';

const listItem = (props) => {
    const ListItemClasses = [classes.ListItem];
    const ListIconClasses = [classes.ListItemIcon];
    if (props.active) {
        ListItemClasses.push(classes.ListItemActive);
        ListIconClasses.push(classes.ListIconActive);
    }
    return (
        <li className={classes.ListItemWrapper}>
            <button onClick={props.onClick} className={ListItemClasses.join(' ')}>
                <div className={classes.ListItemContainer}>
                    {props.icon ? 
                        <div className={ListIconClasses.join(' ')}>
                            <props.item.icon />
                        </div>
                    : null}
                    <div className={classes.ListItemText}>
                        {props.title}
                    </div>
                </div>
            </button>
        </li>
    );
}

export default listItem;