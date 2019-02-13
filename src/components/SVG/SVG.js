import React, { PureComponent } from 'react';
// SVG global object
import * as SVG from '../../assets/svg';
// Underlines
import * as Underlines from '../../assets/svg/Underline';
// Social Media 
import * as SocialMedia from '../../assets/svg/SocialMedia';
// Contact us
import * as Contact from '../../assets/svg/Contact';


class SVGComponent extends PureComponent {

    randomUnderline = (Underlines) => {
        let keys = Object.keys(Underlines)
        return Underlines[keys[keys.length * Math.random() << 0]];
    };

    render () {
        let svg = null;
        // switch statement that picks the respective svg file depending on name
        switch (this.props.svg) {
            case 'underline':
                svg = <div style={this.props.style}>
                        {this.randomUnderline(Underlines)(this.props)}
                    </div>
                break;
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
            case 'checkmark-nobg':
                svg = <SVG.CheckmarkNoBg {...this.props} />;
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
            case 'share':
                svg = <SVG.Share {...this.props} />;
                break;
            case 'favorite':
                svg = <SVG.Favorite {...this.props} />;
                break;
            case 'location-pin':
                svg = <SVG.LocationPin {...this.props} />;
                break;
            case 'chat':
                svg = <SVG.Chat {...this.props} />;
                break;
            case 'cancel':
                svg = <SVG.Cancel {...this.props} />;
                break;
            case 'menu':
                svg = <SVG.Menu {...this.props} />;
                break;
            case 'user':
                svg = <SVG.User {...this.props} />;
                break;
            case 'private':
                svg = <SVG.Private {...this.props} />;
                break;
            case 'single-image':
                svg = <SVG.SingleImage {...this.props} />;
                break;
            case 'multi-image':
                svg = <SVG.MultiImage {...this.props} />;
                break;
            case 'delete':
                svg = <SVG.Delete {...this.props} />;
                break;
            case 'delivery-truck':
                svg = <SVG.DeliveryTruck {...this.props} />;
                break;
            case 'website':
                svg = <SVG.Website {...this.props} />;
                break;
            case 'question-mark':
                svg = <SVG.QuestionMark {...this.props} />;
                break;
            case 'phone':
                svg = <SVG.Phone {...this.props} />;
                break;
            case 'envelope':
                svg = <SVG.Envelope {...this.props} />;
                break;
            case 'sent-envelope':
                svg = <SVG.SentEnvelope {...this.props} />;
                break;
            case 'flag':
                svg = <SVG.Flag {...this.props} />;
                break;
            case 'applestore':
                svg = <SVG.Applestore {...this.props} />;
                break;
            case 'playstore':
                svg = <SVG.Playstore {...this.props} />;
                break;
            // Social Media Icons
            case 'facebook-nobg':
                svg = <SocialMedia.FacebookNoBg {...this.props} />
                break;
            case 'facebook':
                svg = <SocialMedia.Facebook {...this.props} />
                break;
            case 'google-nobg':
                svg = <SocialMedia.GoogleNoBg {...this.props} />
                break;
            case 'instagram':
                svg = <SocialMedia.Instagram {...this.props} />
                break;
            // Contact us
            case 'my-account':
                svg = <Contact.MyAccount />
                break;
            case 'other':
                svg = <Contact.Other />
                break;
            case 'security':
                svg = <Contact.Security />
                break;
            case 'service-post':
                svg = <Contact.ServicePost />
                break;
            default:
                svg = <div><strong>?</strong></div>;
        };
        return svg;
    }
}

export default SVGComponent;