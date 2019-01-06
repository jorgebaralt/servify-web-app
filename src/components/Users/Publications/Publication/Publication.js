import React from 'react';
// CSS
import classes from './Publication.module.css';
// JSX
import { Link } from 'react-router-dom';
import ImageFadeIn from '../../../UI/ImageFadeIn/ImageFadeIn';

const publication = (props) => {
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <div className={classes.Wrapper}>
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={props.image} />
                    </div>
                </div>
            </div>
            <div to={props.href ? props.href : '/services/notfound'} className={classes.Details}>
                <div>
                    <div className={classes.Header}>
                        <span>{props.header}</span>
                    </div>
                </div>
                {/* Title */}
                <div className={classes.Title}>{props.title}</div>
                {/* Links */}
                <div className={classes.Links}>
                    {/* TODO setup links */}
                    <Link draggable="false" to={props.href ? props.href : '/services/show/1'} className={classes.Link} target="_blank">
                        View
                    </Link>
                    <Link draggable="false" to={props.href ? props.href : '/users/publications/edit/1'} className={classes.Link}>
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default publication;