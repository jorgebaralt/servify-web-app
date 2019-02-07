import React, { Component } from 'react';
// CSS
import classes from './CopyText.module.css';

class CopyText extends Component {
    constructor(props) {
        super(props);
        this.myTooltip = React.createRef();
    }

    state = {
        text: 'Copy to clipboard',
        buttonText: this.props.text ? this.props.text : 'Copy text'
    }

    copyText = (event) => {
        if (!this.props.copyReference) { return; }
        const copyText = this.props.copyReference.current;
        if (!copyText.select) { return; }
        copyText.select();
        // Copying selected text
        document.execCommand('copy');
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else {
            document.selection.empty();
        }
        // event.target.focus();
        this.setState({
            text: ['Copied:',copyText.value].join(' ')
        })
    }

    onMouseLeave = () => {
        this.myTooltip.current.innerHTML = "Copy to clipboard";
        this.setState({
            text: 'Copy to clipboard'
        })
    }

    onCopyHandler = (event) => {
        console.log('ping')
        this.copyText(event)
    }

    render() {
        // Logical shortcut for only displaying the 
        // button if the copy command exists.
        if (!document.queryCommandSupported('copy')) { return null; }
        return (
            <div className={classes.Container}>
                <button tabIndex="-1" 
                    type='button'
                    className={classes.Button}
                    onClick={this.onCopyHandler} 
                    onMouseLeave={this.onMouseLeave}>
                    {/* Tooltip, appears on hover. */}
                    <span ref={this.myTooltip} className={classes.Tooltip}>{this.state.text}</span>
                    {/* Button content */}
                    <span className={classes.Text}>{this.state.buttonText}</span>
                </button>
            </div>
        );
    }
}


export default CopyText;