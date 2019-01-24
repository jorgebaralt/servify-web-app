import React from 'react';
// CSS
import classes from './Publication.module.css';
// Image Data Handler
import { setImagesArray } from '../../../../shared/imagesHandler';
// JSX
import { Link } from 'react-router-dom';
import ImageFadeIn from '../../../UI/ImageFadeIn/ImageFadeIn';

const defaultImgUrl = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-20T22%3A51%3A58.066Z_default-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=st0sONUJVHe54MOE0yY902A0gAcBCzSjxch4QbdCXJ0w2LiQgG%2FwZiv9lW6t4lV5zFhpONuNEFPOWIqC%2F1fQgI0qKX4Y1vI6nI14lx%2BYqaR%2Fg0LjIfUPeU5RSm8RJBnWIKSWVhThZT7ewez8XEg2RjIRIVllzdJht%2FRTgwzf4A%2FbsF1SsfaMFkIYH4Ee7vnNmdqOTRTwGqInjLPER9WgalWew7MXxHExGo9%2Fi%2BmIXjAxcC2%2BmTu9Pov%2BBkvfpu37miQTViUTUmE0c3jc17R%2FC816Sdmhg%2F2e8a%2FSUx9k714D5PujzvKldabGnPvwwPTO%2BtCe0yjAsbE5eehLQYEjgw%3D%3D';

const publication = (props) => {
    if (!props.href) { return null; }
    const image = props.image ? setImagesArray(props.image) : [];
    return (
        // Total rating amount, defaults to 5
        <div className={classes.Service}>
            <div className={classes.Wrapper}>
                <div className={classes.ThumbnailWrapper}>
                    <div className={classes.ThumbnailContainer}>
                        <ImageFadeIn draggable="false" className={classes.Thumbnail} src={image.length ? image[0] : defaultImgUrl} />
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