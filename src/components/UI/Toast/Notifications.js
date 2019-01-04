import React from 'react';
// JSX
import Toast, { defaultDelay } from './Toast';
import classes from './Notifications.module.css';

let parent = null;

export const setToast = (context) => {
    parent = context;
}

export const creator = (message, style, timer) => {
    console.log('creator', message, style, timer)
    if (!message || !parent) { return null; }
    if (message.constructor === Array) {
        message.forEach( (msg, i) => {
            const delay = (timer | defaultDelay)*i*1.5;
            console.log('inside message.forEach', msg, i, timer | defaultDelay, delay);
            setTimeout( () => {
                parent.setState({
                    toast: {
                        message: msg,
                        style: style,
                        timer: timer,
                    }
                });
            }, (timer*i));
        })
    } else {
        parent.setState({
            toast: {
                message: message,
                style: style,
                timer: timer,
            }
        });
    }
    
};

const Notifications = () => {
    const Notification = () => Toast.toastCreator(parent.state.toast);
    return (
        <div className={classes.Wrapper}>
            <Notification />
        </div>
    )
}

export default Notifications;