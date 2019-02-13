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

    componentDidUpdate() {
        if (!this.state.bIsHidden) {
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
        return (
            <div ref={this.myTooltip} 
                className={this.props.className ? this.props.className : classes.Container}>
                <i 
                    /**
                    * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
                    * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
                    * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
                    * or any other hack.
                        */
                    onMouseDown={event => event.preventDefault()}
                    onClick={this.toggleTooltip} >
                    {this.props.tooltip ? this.props.tooltip : <SVG fill={this.props.tooltipFill} background={this.props.tooltipBg} svg='question-mark' />}
                </i>
                {this.state.bIsHidden ?
                    null
                    : (
                        <Content 
                            className={this.props.containerClassname}
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