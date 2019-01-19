import React from 'react';
// CSS
import classes from './Publication.module.css';
// Image Data Handler
import { setImagesArray } from '../../../../shared/imagesHandler';
// JSX
import { Link } from 'react-router-dom';
import ImageFadeIn from '../../../UI/ImageFadeIn/ImageFadeIn';

const defaultImgUrl = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-12T06%3A37%3A57.360Zdefault-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=VK1PwozcAgxOAYJH6%2FBnDqnSFavcUu0%2FbbWbOgowvx629SQ860EcW4l6YQpE08cu8q1XrsQW0KsLp%2BxAAOoHOomPVmZfGapqZlb821nyjFlN5aMdgTVPbTrWAScfVs3H4%2BJZLOqAZatqPw96blxY%2FIwrbu4dj0q6elQ%2FzRRqG5wLO5fkUvOTG18xF8DfZkTViHxaNiqD%2FPQS69sPRcMnF69%2BQGjC2ZecNbMeatufctbb95%2FL7%2FSJaIgO98HyZ8WJ9ZFxJbl7bqkHV3ptAMP5c8OIfCHeLqfKVtjoW6AmrnXh3LQXCY8GUOTbB09XwzUjggA6TpUuHblEd34p452%2BaA%3D%3D';

const publication = (props) => {
    if (!props.href) { return null; }
    const image = setImagesArray(props.image);
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <div className={classes.Wrapper}>
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={image ? image[0] : defaultImgUrl} />
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
                    <Link draggable="false" to={['/services', props.href].join('/')} className={classes.Link} target="_blank">
                        View
                    </Link>
                    <Link draggable="false" to={['/users/publications/edit', props.href].join('/')} className={classes.Link}>
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default publication;