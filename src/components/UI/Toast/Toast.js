import React, { Component } from 'react';
import classes from './Toast.module.css';

export const defaultDelay = 3500;

export const broadcastMessage = () => {
    return;
}

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            style: props.style,
            timer: props.timer | defaultDelay,
            bIsHidden: false,
            bShouldUnmount: false,
        }
        // this.hideToast = () => {
        //     // For the animation
        //     setTimeout(() => {
        //         this.setState({
        //             bIsHidden: true
        //         })
        //     }, this.state.timer);
        // }
        this.myHideToastTimeout = null;
        this.myUnmountTimeout = null;
    }

    endMessage = () => {
        this.myHideToastTimeout = setTimeout(() => {
            this.setState({
                bIsHidden: true,
            });
        }, this.state.timer);

        this.myUnmountTimeout = setTimeout(() => {
            this.setState({
                bShouldUnmount: true,
                message: false
            });
        }, this.state.timer*1.25);
    }

    static toastCreator(props) {
        if(props) {
            return new Toast(props);
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.endMessage();
    }

    componentDidUpdate() {
        clearTimeout(this.myHideToastTimeout);
        clearTimeout(this.myUnmountTimeout);
    }

    componentWillUnmount() { // To avoid memory leaks
        clearTimeout(this.myTimeout);
        clearTimeout(this.hideToast);
    }

    shouldComponentUpdate() { // Only update if there is a message
        return this.state.message
    }
    
    render () {
        console.log('this.state.message', this.state.message);
        let animation = classes.SlideDown;
        if (this.state.bIsHidden) {
            animation = classes.SlideUp;
        } 
        const containerClasses = [classes.Container, animation];
        return (
            !this.state.bShouldUnmount ? 
                <div className={classes.Wrapper}>
                    <div style={this.state.style} className={containerClasses.join(' ')}>
                        {this.state.message}
                    </div> 
                </div> 
                : null
        );
    }
}

export default Toast;