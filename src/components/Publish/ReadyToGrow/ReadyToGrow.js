import React, { useState } from 'react';
// default image
import image from '../../../assets/images/learn-more.jpg';
// CSS
import classes from './ReadyToGrow.module.css';
// JSX
import { Link } from 'react-router-dom'
import Button from '../../UI/Button/Button';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const readyToGrow = (props) => {
    const [src] = useState(props.src ? props.src : image);
    const [srcset] = useState(props.srcset);

    return (
        <div className={classes.Wrapper}>
            <Link
                rel="noopen noreferrer" 
                to="/publish">
                <div className={classes.BackgroundWrapper}>
                <ImageFadeIn 
                    src={src}
                    srcset={srcset} />
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
            </Link>
        </div>
    )
}

export default readyToGrow;