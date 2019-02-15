import React, { useState } from 'react';
// default image
import image from '../../../assets/images/mobile-app-banner-bg.jpg';
// CSS
import classes from './MobileBanner.module.css';
// JSX
import Tooltip from 'react-png-tooltip';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const mobileBanner = () => {
    const [src] = useState(image);

    return (
        <div className={classes.Wrapper}>
            <div>
                <div className={classes.BackgroundWrapper}>
                    <ImageFadeIn 
                        noWrapper
                        src={src} />
                </div>
                <div className={classes.BannerWrapper}>
                    <div className={classes.BannerContainer}>
                        <div className={classes.Offer}>
                            <span style={{color: '#a9cbc1'}}>Get <span style={{color: '#FFF'}}>Servify</span> on your phone!</span>
                        </div>
                        <div className={classes.Offer}>
                            <span style={{color: '#FFF'}}>Available On</span>
                        </div>
                        {/* <div className={classes.ButtonWrapper}>
                            <Button type='default'><span>Learn More</span></Button>
                        </div> */}
                        <div className={classes.ButtonWrapper}>
                            <a
                                target="_blank" 
                                rel="noopener noreferrer"
                                href="https://itunes.apple.com/us/app/servify-find-local-services/id1439203889#?platform=ipad">
                                <span className={classes.SeoTool}>Download on the App Store</span>
                                <Button type='applestore'/>
                            </a>
                        </div>
                        <div className={classes.ButtonWrapper}>
                            <a
                                target="_blank" 
                                rel="noopener noreferrer"
                                href="https://play.google.com/store/apps/details?id=com.jorgebaralt.servify&hl=en">
                                <span className={classes.SeoTool}>Get it on Google Play</span>
                                <Button type='playstore'/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={classes.TooltipContainer}>
                    <Tooltip >
                        Your life becomes easier with <span style={{color: 'rgb(0, 119, 145)', fontWeight: '600'}}>Servify</span>. 
                        <div><strong>A great app for your every day needs!</strong></div>
                        Find anything you might need or gain new customers by listing your business on Servify.
                        <div style={{ fontWeight: '600', margin: '12px 0 0' }}>
                            <Link  
                                target="_blank" 
                                rel="noopener noreferrer"
                                to="/publish/overview">
                                <span style={{ color: 'rgb(0, 119, 145)' }}>
                                    Click here if you're ready to grow your business even further.
                                </span>
                            </Link>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default mobileBanner;