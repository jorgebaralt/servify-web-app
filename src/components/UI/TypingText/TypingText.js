import React from 'react'

import injectStyle from '../../../shared/injectStyle';

import classes from './TypingText.module.css';

const typingText = (props) => {
    console.log(props);

    const keyframesStyles = [
        `
            @keyframes typing-text {
                from {
                    width: 0;
                }
                to {
                    width: ` + props.children.length + `ch;
                }
            }
        `,
        `
            @keyframes blink {
                from {
                    border-color: transparent;
                }
                to {
                    border-color: #333;
                }
            }
        `
    ];

    keyframesStyles.forEach( keyframeStyle => {
        injectStyle(keyframeStyle);
    });

    const style = {
        display: 'flex',
        maxWidth: props.children.length - 1 + 'ch',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        wordBreak: 'break-word',
        borderRight: '3px solid #000',
        WebkitAnimation: 'typing-text ' + props.children.length/30 + 's steps( ' + props.children.length + ' ), blink 1s infinite'
    }


    return (
        <div className={classes.Container}>
            <div style={style}>
                {props.children}
            </div>
        </div>
    );
}

export default typingText