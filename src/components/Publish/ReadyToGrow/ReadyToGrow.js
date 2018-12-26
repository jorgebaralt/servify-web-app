import React, { Component } from 'react';
// CSS
import classes from './ReadyToGrow.module.css';
// JSX
import { Link } from 'react-router-dom'
import Button from '../../UI/Button/Button';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

class ReadyToGrow extends Component {
    constructor (props) {
        super(props);
        // Image reference
        this.bannerBackground = React.createRef();
    }

    state = {
        // TODO PLACEHOLDER IMAGES, CHANGE LATER ON
        src: this.props.src ? this.props.src : 'https://a0.muscache.com/4ea/air/v2/pictures/c3cf0b96-9029-4408-af5a-ce90aca5c3fe.jpg?t=r:w800-h242-sfit,e:fjpg-c75',
        srcset: this.props.srcset ? this.props.srcset : (`https://a0.muscache.com/4ea/air/v2/pictures/c3cf0b96-9029-4408-af5a-ce90aca5c3fe.jpg?t=r:w800-h242-sfit,e:fjpg-c75 
            800w,https://a0.muscache.com/4ea/air/v2/pictures/c3cf0b96-9029-4408-af5a-ce90aca5c3fe.jpg?t=r:w1600-h484-sfit,e:fjpg-c75 
            1600w,https://a0.muscache.com/4ea/air/v2/pictures/c3cf0b96-9029-4408-af5a-ce90aca5c3fe.jpg?t=r:w2400-h726-sfit,e:fjpg-c75 
            2400w`)
    }

    shouldComponentUpdate () {
        return this.state.src && this.state.srcset;
    }

    render () {
        return (
            <div className={classes.Wrapper}>
                <Link
                    rel="noopen noreferrer" 
                    to="/publish">
                    <div className={classes.BackgroundWrapper}>
                    <ImageFadeIn 
                        src={this.state.src}
                        srcset={this.state.srcset} />
                    </div>
                    <div className={classes.BannerWrapper}>
                        <div className={classes.BannerContainer}>
                            <div className={classes.Offer}>
                                <span>Ready to grow?</span>
                            </div>
                            <div className={classes.ButtonWrapper}>
                                <Button type='default'><span>Get Started</span></Button>
                            </div>
                        </div>
                    </div>
                    {/* <div className={classes.Tooltip}>
                        <span>?</span>
                    </div> */}
                </Link>
            </div>
        );
    }
}

export default ReadyToGrow;