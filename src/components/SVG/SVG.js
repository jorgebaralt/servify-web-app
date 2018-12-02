import React from 'react';
// SVG global object
import * as SVG from '../../assets/svg';

const SVGComponent = (props) => {
    let svg = null;
    // switch statement that picks the respective svg file depending on name
    switch (props.svg) {
        case 'right-arrow':
            svg = <SVG.RightArrow {...props} />;
            break;
        case 'tools':
            svg = <SVG.Tools {...props} />;
            break;
        case 'loading':
            svg = <SVG.Loading {...props} />;
            break;
        case 'checkmark':
            svg = <SVG.Checkmark {...props} />;
            break;
        case 'typing':
            svg = <SVG.Typing {...props} />;
            break;
        default:
            svg = <div>Please specify a <strong>props.svg</strong>, 
            or make sure you're using the right file name inside the <strong>assets/svg folder</strong>.</div>;
    };
    return svg;
}

export default SVGComponent;