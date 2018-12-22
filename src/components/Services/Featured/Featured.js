import React from 'react';
// CSS
import classes from './Featured.module.css';
// JSX
import SVG from '../../SVG/SVG';
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn'

const featured = (props) => {
    return (
        <div className={classes.Wrapper}>
            <a href={props.href ? props.href : '/'} target="_blank" rel="noopener noreferrer" className={classes.Anchor}>
                <div className={classes.Container}>
                    <div className={classes.BackgroundWrapper}>
                        <div className={classes.BackgroundContainer}>
                        <div className={classes.Background} style={{width: '100%', height: '100%'}}/>
                        <ImageFadeIn src={props.image} />
                        </div>
                    </div>
                    <div className={classes.TextWrapper}>
                        <div className={classes.TextTable}>
                            <div className={classes.TextCell}>
                                <div className={classes.TextContainer}>
                                    <div className={classes.ServifyLogo}>
                                        {/* PLACEHOLDER */}
                                        <SVG svg='black-borderless-logo' /><span>Featured</span>
                                    </div>
                                    <span className={classes.Text}>
                                        <span style={{color: 'rgb(255, 112, 67)'}}>
                                            {props.text ? props.text : 'Text'}
                                        </span>
                                        <span className={classes.Underline}><SVG svg='underline' /></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.Feature}>
                    <small><span>{props.feature ? props.feature : 'Feature goes here.'}</span></small>
                </div>
                <div className={classes.Description}>
                    <div>
                        <span>{props.description ? props.description : 'Description text goes here, this is just placeholder.'}</span>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default featured;