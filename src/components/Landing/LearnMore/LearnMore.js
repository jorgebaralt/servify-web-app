import React, { Component } from 'react';
// default image
import image from '../../../assets/images/learn-more.jpg';
// CSS
import classes from './LearnMore.module.css';
// JSX
import { Link } from 'react-router-dom'
import Button from '../../UI/Button/Button';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

class LearnMore extends Component {
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
        const earnMoney = <span key='price'>Earn money</span>;
        let offer = [earnMoney, ' by hosting your services on Servify!'];
        if (this.props.state && this.props.city) {
            offer = [earnMoney, ` by hosting your services near ${this.props.city},  ${this.props.state}`];
        }
        return (
            <div className={classes.Wrapper}>
                <Link target="_blank" 
                    rel="noopen noreferrer" 
                    to="/publish/overview">
                    <div className={classes.BackgroundWrapper}>
                        <ImageFadeIn 
                            src={this.state.src}
                            srcset={this.state.srcset} />
                    </div>
                    <div className={classes.BannerWrapper}>
                        <div className={classes.BannerContainer}>
                            <div className={classes.Offer}>
                                {offer}
                            </div>
                            <div className={classes.ButtonWrapper}>
                                <Button type='default'><span>Learn More</span></Button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Tooltip}>
                        <span>?</span>
                    </div>
                </Link>
            </div>
        );
    }
}

export default LearnMore;