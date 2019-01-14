import React, { Component } from 'react';
// Image
import image from '../../assets/images/notfound-image.png';
// CSS
import classes from './NotFound.module.css';
// JSX
import { Link } from 'react-router-dom';
import ImageFadeIn from '../../components/UI/ImageFadeIn/ImageFadeIn';

class NotFound extends Component {
    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Image}>
                    <ImageFadeIn draggable="false" src={image} />
                </div>
                <div className={classes.Text}>
                    <h1 className={classes.Header}>Page not found</h1>
                    <h2 className={classes.Subheader}>We couldn't find the page you were looking for.</h2>
                    <h6 className={classes.ErrorCode}><span style={{letterSpacing: '1px'}}>HTTP</span> 404, Not Found. </h6>
                    <ul className={classes.SiteMap}>
                        <li className={classes.Links}>Perhaps you were looking for one of these?</li>
                        <li><Link to='/'>Homepage</Link></li>
                        <li><Link to='/publish/overview'>Publish</Link></li>
                        <li><Link to='/services'>Services</Link></li>
                        <li><Link to='/help'>Help</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/authenticate'>Sign up or log in</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default NotFound;