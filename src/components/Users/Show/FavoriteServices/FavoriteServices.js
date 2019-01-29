import React from 'react';
// CSS
import classes from './FavoriteServices.module.css';
// JSX
import Separator from '../../../UI/Separator/Separator';
import Service from '../../../Services/Service/Service';
import LoadingBounce from '../../../UI/LoadingBounce/LoadingBounce';

const favoriteServices = (props) => {
    if (props.loading && !props.favoriteServices.length) {
        return (
            <>
                <Separator />
                <h1 className={classes.Title}>Favorite Services</h1>
                <LoadingBounce />
            </>
        );
    }
    return (
        <>
            <Separator />
            <h1 className={classes.Title}>Favorite Services<sub>({props.favoriteServices.length})</sub></h1>
            {props.favoriteServices.length ? 
                <div className={classes.Wrapper}>
                    <div className={classes.Container}>
                        {props.favoriteServices.map( (service, index) => {
                            return (
                                <div key={index} className={classes.Service}>
                                    <Service
                                        header={service.category.replace("_", " ")}
                                        title={service.title}
                                        priceRating={service.price/4}
                                        href={service.id}
                                        ratingAvg={service.rating/5}
                                        ratingAmount={service.ratingCount}
                                        image={service.imagesInfo}/>
                                </div>
                            );
                        } )}
                    </div>
                </div>
                : <span>No favorite services yet.</span>
            }
        </>
    );
}

export default React.memo(favoriteServices);