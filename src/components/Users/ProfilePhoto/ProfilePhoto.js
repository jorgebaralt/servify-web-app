import React from 'react';
// CSS
import classes from './ProfilePicture.module.css';
// JSX
import ImageFadeIn from '../../UI/ImageFadeIn/ImageFadeIn';

const profilePhoto = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <ImageFadeIn 
                    style = {props.rounded ? { borderRadius: '50%' } : null }
                    noWrapper 
                    className={classes.Photo} 
                    draggable={false} 
                    src={props.src} />
            </div>
        </div>
    );
}

export default profilePhoto;