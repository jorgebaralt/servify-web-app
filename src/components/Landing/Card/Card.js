import React from 'react';
// CSS
import classes from './Card.module.css';

const card = (props) => {
    return (
        <a href='/'>
            <div className={classes.CardWrapper}>
                <div className={classes.Card}>
                    <div className={classes.CardTable}>
                        <div className={classes.ThumbnailCell}>
                            <div className={classes.CardThumbnail}>
                                <div className={classes.CardThumbnailImage} style={{backgroundImage: `url(${props.image})`}}></div>
                            </div>
                        </div>
                        <div className={classes.TextCell}>
                            <div className={classes.TextCellText}>
                                <div><span>{props.title}s</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default card;