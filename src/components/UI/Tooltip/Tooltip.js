import React, { Component } from 'react';
// CSS
import classes from './Tooltip.module.css';
// JSX
import SVG from '../../SVG/SVG';
import Content from './Content/Content';

class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.myTooltip = React.createRef();
        this.myContent = React.createRef();
    }

    state = {
        bIsHidden: true
    }

    // componentDidUpdate() {
    //     if (!this.state.bIsHidden) {
    //         console.log('ping');
    //         // window.addEventListener('click', this.closeTooltip);
    //     } else {
    //         // window.removeEventListener('click', this.closeTooltip);
    //     }
    // }

    componentDidUpdate() {
        console.log('ref inside componentDidUpdate', this.myContent)
        if (!this.state.bIsHidden) {
            console.log('document active el inside componentDidUpdate')
            this.myContent.current.focus();
        }
    }

    closeTooltip = () => {
        this.setState({
            bIsHidden: true
        });
    }

    toggleTooltip = () => {
        this.setState(prevState => {
            return {
                bIsHidden: !prevState.bIsHidden
            }
        }); 
    }

    render() {
        console.log('ref inside render', this.myContent)
        const tooltipClasses = [classes.Container];
        if (this.props.className) {
            tooltipClasses.push(this.props.className);
        }
        return (
            <div ref={this.myTooltip} 
                className={tooltipClasses.join(' ')}>
                <i 
                    /**
                    * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
                    * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
                    * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
                    * or any other hack.
                        */
                    onMouseDown={event => event.preventDefault()}
                    onClick={this.toggleTooltip}>
                    <SVG svg='question-mark' />
                </i>
                {this.state.bIsHidden ?
                    null
                    : (
                        <Content 
                            reference={this.myContent}
                            onBlur={this.closeTooltip} >
                            {this.props.children}
                        </Content>
                    )
                }
            </div>
        );
    }
}

export default Tooltip;