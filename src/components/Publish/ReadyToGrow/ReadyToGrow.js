import React, { Component } from 'react';
// default image
import image from '../../../assets/images/learn-more.jpg';
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
        src: this.props.src ? this.props.src : image,
        srcset: this.props.srcset
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