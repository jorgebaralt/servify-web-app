import React, { useRef, useState } from 'react';
// CSS
import classes from './CopyText.module.css';

const copyText = (props) => {
    const myTooltip = useRef(null);
    const [text, setText] = useState('Copy to clipboard');
    const [buttonText] = useState(props.text ? props.text : 'Copy text');

    const copyText = () => {
        if (!props.copyReference) { return; }
        const copyText = props.copyReference.current;
        if (!copyText.select) { return; }
        copyText.select();
        // Copying selected text
        document.execCommand('copy');
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else {
            document.selection.empty();
        }
        setText(['Copied:',copyText.value].join(' '));
    }

    const onMouseLeaveHandler = () => {
        myTooltip.current.innerHTML = "Copy to clipboard";
        setText('Copy to clipboard');
    }

    // Logical shortcut for only displaying the 
    // button if the copy command exists.
    if (!document.queryCommandSupported('copy')) { return null; }
    return (
        <div className={classes.Container}>
            <button tabIndex="-1" 
                type='button'
                className={classes.Button}
                onClick={copyText} 
                onMouseLeave={onMouseLeaveHandler}>
                {/* Tooltip, appears on hover. */}
                <span ref={myTooltip} className={classes.Tooltip}>{text}</span>
                {/* Button content */}
                <span className={classes.Text}>{buttonText}</span>
            </button>
        </div>
    );
}

export default copyText;