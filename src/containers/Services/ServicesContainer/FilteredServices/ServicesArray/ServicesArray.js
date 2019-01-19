
import React from 'react';
// CSS
import classes from '../FilteredServices.module.css';
// JSX
import Service from '../../../../../components/Services/Service/Service';

const services = (props) => {
    let services;
    // TODO DEAL WITH LACEHOLDER
    if (props.services.filteredServices) {
        if (props.services.filteredServices.length) {
            services = props.services.filteredServices.map( (service, index) => {
                return (
                    <div key={index} className={classes.Service}>
                        <Service
                            header={service.category.replace("_", " ")}
                            title={service.title}
                            priceRating={service.priceRating}
                            ratingAvg={service.rating/5}
                            ratingAmount={service.ratingCount}
                            image={service.imagesInfo}
                            href={service.id} />
                    </div>
                );
            });
        } else {
            services = (
                <h1>Sorry! We couldn't find any services that matches what you were looking for. You may try a different category.</h1>
            );
        }
    } else if (props.services.topServices) {
        services = props.services.topServices.map( (service, index) => {
            return (
                <div key={index} className={classes.Service}>
                    <Service
                        header={service.category.replace("_", " ")}
                        title={service.title}
                        priceRating={service.priceRating}
                        ratingAvg={service.rating/5}
                        ratingAmount={service.ratingCount}
                        image={service.imagesInfo}
                        href={service.link} />
                </div>
            );
        });
    }
    return (
        services
    )
}

export default services;