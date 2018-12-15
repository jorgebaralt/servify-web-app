import React from 'react';
// CSS
import classes from './Footer.module.css';
// JSX
import { NavLink } from 'react-router-dom';
import SVG from '../../SVG/SVG';
// Logo
import logo from '../../../assets/images/servify-logos/roundedborders.png';

const footer = (props) => {
    const bgImage = null;
    return (
        <div className={classes.Footer}>
            <div>
                <div className={classes.BannerWrapper}>
                    <div 
                        // TODO Add background image to source assets
                        style={{backgroundImage: `url(${bgImage ? bgImage : 'http://www.bonpreufoods.com/images/image-background.jpg'})`}} 
                        className={classes.BannerBackground}
                    />
                    <div className={classes.BannerContainer}>
                        <div className={classes.SocialMedia}>
                            <div className={classes.FollowUs}>Follow Us</div>
                            <div className={classes.MediaLinks}>
                                <span className={classes.MediaLink}><a href='/' target='_blank'><SVG svg='facebook' /></a></span>
                                <span className={classes.MediaLink}><a href='/' target='_blank'><SVG svg='instagram' /></a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.FooterWrapper}>
                    <NavLink to='/'>
                        <div className={classes.LogoWrapper}><img className={classes.Logo} draggable='false' src={logo} alt='' /></div>
                    </NavLink>
                    <div className={classes.NavLinks}>
                        <NavLink exact activeClassName={classes.active} className={classes.NavLink} to='/'><span className={classes.Link}>Homepage</span></NavLink>
                        <NavLink activeClassName={classes.active} className={classes.NavLink} to='/post/overview'><span className={classes.Link}>Post</span></NavLink>
                        <NavLink activeClassName={classes.active} className={classes.NavLink} to='/services'><span className={classes.Link}>Services</span></NavLink>
                        <NavLink activeClassName={classes.active} className={classes.NavLink} to='/help'><span className={classes.Link}>Help</span></NavLink>
                        <NavLink activeClassName={classes.active} className={classes.NavLink} to='/support'><span className={classes.Link}>Support</span></NavLink>
                        <NavLink activeClassName={classes.active} className={classes.NavLink} to='/contact'><span className={classes.Link}>Contact</span></NavLink>
                    </div>
                    <div className={classes.CopyrightWrapper}>
                        <span> 
                            <ins className={classes.Legalmark}>©</ins>
                            <span>2018 Servify, Inc. All rights reserved.</span>
                        </span>
                    </div>
                    <div className={classes.TrademarkWrapper}>
                        <span>All trademarks referenced herein are the properties of their respective owners.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default footer;