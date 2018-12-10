import React, { PureComponent } from 'react';
// SVG global object
import * as SVG from '../../assets/svg';
// Underlines global object
import * as Underlines from '../../assets/svg/Underline';
// Social Meida
import * as SocialMedia from '../../assets/svg/SocialMedia/';

class SVGComponent extends PureComponent {

    randomUnderline = (Underlines) => {
        let keys = Object.keys(Underlines)
        return Underlines[keys[keys.length * Math.random() << 0]];
    };

    render () {
        let svg = null;
        // switch statement that picks the respective svg file depending on name
        switch (this.props.svg) {
            case 'right-arrow':
                svg = <SVG.RightArrow {...this.props} />;
                break;
            case 'tools':
                svg = <SVG.Tools {...this.props} />;
                break;
            case 'loading':
                svg = <SVG.Loading {...this.props} />;
                break;
            case 'checkmark':
                svg = <SVG.Checkmark {...this.props} />;
                break;
            case 'typing':
                svg = <SVG.Typing {...this.props} />;
                break;
            case 'star':
                svg = <SVG.Star {...this.props} />;
                break;
            case 'currency':
                svg = <SVG.Currency {...this.props} />;
                break;
            case 'black-borderless-logo':
                svg = <SVG.BlackBorderlessLogo {...this.props} />;
                break;
            case 'underline':
                svg = <div style={this.props.style}>
                        {this.randomUnderline(Underlines)(this.props)}
                    </div>
                break;
            case 'facebook':
                svg = <SocialMedia.Facebook {...this.props} />
                break;
            case 'instagram':
                svg = <SocialMedia.Instagram {...this.props} />
                break;
            default:
                svg = <div>Please specify a <strong>props.svg</strong>, 
                or make sure you're using the right file name inside the <strong>assets/svg folder</strong>.</div>;
        };
        return svg;
    }
}

export default SVGComponent;