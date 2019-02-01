import React from 'react';
// CSS
import classes from './ProfilePicture.module.css';
// JSX
import Image from '../../UI/Image/Image';

const profilePhoto = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Container}>
                <Image 
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