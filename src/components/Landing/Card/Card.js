import React from 'react';
// CSS
import classes from './Card.module.css';
// JSX
import { Link } from 'react-router-dom';

const card = (props) => {
    return (
        <Link to={{ 
            pathname: '/services',
            state: { activeCategory: props.title } }}>
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
                                <div><span>{props.title}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default card;