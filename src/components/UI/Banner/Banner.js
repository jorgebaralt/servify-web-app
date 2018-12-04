import React from 'react';
// CSS
import classes from './Banner.module.css';
// JSX
import SVG from '../../SVG/SVG';

const banner = () => {
    return (
        <section className={classes.Banner}>
            <div>
                <div className={classes.BannerPoint}><SVG height='36' svg='checkmark' />&nbsp;<strong>FREE</strong>&nbsp;Service Hosting</div>
                <div className={classes.BannerPoint}><SVG height='36' svg='checkmark' />&nbsp;<strong>The Best</strong>&nbsp;Service Provider</div>
                <div className={classes.BannerArrow}>&nbsp;</div>
            </div>
        </section>
    );
}

export default banner;