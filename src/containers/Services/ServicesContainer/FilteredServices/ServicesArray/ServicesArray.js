
import React from 'react';
// Image
import image from '../../../../../assets/images/notfound-image.png';
// CSS
import classes from '../FilteredServices.module.css';
// JSX
import Service from '../../../../../components/Services/Service/Service';
import ImageFadeIn from '../../../../../components/UI/ImageFadeIn/ImageFadeIn';

const services = (props) => {
    let services;
    if (props.services.filteredServices) {
        if (props.services.filteredServices.length) {
            services = props.services.filteredServices.map((service, index) => {
                return (
                    <div key={index} className={classes.Service}>
                        <Service
                            header={service.category.replace("_", " ")}
                            title={service.title}
                            href={service.id}
                            priceRating={service.price/4}
                            ratingAvg={service.rating/5}
                            ratingAmount={service.ratingCount}
                            image={service.imagesInfo}/>
                    </div>
                );
            });
        } else {
            services = (
                <div className={classes.NotFound}>
                    <h1>Sorry! We couldn't find any services that match your query. You may try a different category.</h1>
                    <div className={classes.Image}>
                        <ImageFadeIn draggable="false" src={image} />
                    </div>
                </div>
            );
        }
    } else {
        services = (
            <div className={classes.NotFound}>
                <h1>Sorry! We couldn't find any services that match your query. You may try a different category.</h1>
                <div className={classes.Image}>
                    <ImageFadeIn draggable="false" src={image} />
                </div>
            </div>
        );
    }
    return (
        services ? services : null
    )
}

export default services;