import React, { useState } from 'react';
// default image
import image from '../../../assets/images/learn-more.jpg';
// CSS
import classes from './LearnMore.module.css';
// JSX
import { Link } from 'react-router-dom'
import Button from '../../UI/Button/Button';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const learnMore = (props) => {
    const [src] = useState(props.src ? props.src : image);
    const [srcset] = useState(props.srcset);

    const earnMoney = <span key='price'>Gain customers</span>;
    let offer = [earnMoney, ' by listing your services on Servify!'];
    if (props.state && props.city) {
        offer = [earnMoney, ` by listing your services near ${props.city},  ${props.state}`];
    }
    return (
        <div className={classes.Wrapper}>
            <Link target="_blank" 
                rel="noopener noreferrer"
                to="/publish/overview">
                <div className={classes.BackgroundWrapper}>
                    <ImageFadeIn 
                        src={src}
                        srcset={srcset} />
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
            </Link>
        </div>
    );
}

export default learnMore;