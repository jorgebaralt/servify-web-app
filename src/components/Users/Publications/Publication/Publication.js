import React from 'react';
// CSS
import classes from './Publication.module.css';
// Image Data Handler
import { setImagesArray } from '../../../../shared/imagesHandler';
import defaultImgUrl from '../../../../shared/defaultServiceImage';
// JSX
import { Link } from 'react-router-dom';
import ImageFadeIn from '../../../UI/ImageFadeIn/ImageFadeIn';

const publication = (props) => {
    if (!props.href) { return null; }

    const image = props.image ? setImagesArray(props.image) : [];

    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <div className={classes.Wrapper}>
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={image.length ? image[0] : defaultImgUrl(props.category)} />
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
                    <Link draggable="false" to={['/services', props.href].join('/')} className={classes.Link} target="_blank">
                        View
                    </Link>
                    <Link draggable="false" to={['/users/publications/edit', props.href].join('/')} className={classes.Link}>
                        Edit
                    </Link>
                    <button onClick={props.onDelete} draggable="false" className={classes.Delete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default publication;