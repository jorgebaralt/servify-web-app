
import React from 'react';
// CSS
import classes from '../FilteredServices.module.css';
// JSX
import Service from '../../../../../components/Services/Service/Service';

const services = (props) => {
    let services;
    // TODO DEAL WITH LACEHOLDER
    if (props.services.filteredServices) {
        services = props.services.filteredServices.map( (service, index) => {
            return (
                <div key={index} className={classes.Service}>
                    <Service
                        header={service.category}
                        title={service.title}
                        priceRating={service.priceRating}
                        ratingAvg={service.rating/5}
                        ratingAmount={service.ratingCount}
                        image={service.image}
                        href={service.link} />
                </div>
            );
        });
    } else if (props.services.topServices) {
        services = props.services.topServices.map( (service, index) => {
            return (
                <div key={index} className={classes.Service}>
                    <Service
                        header={service.category}
                        title={service.title}
                        priceRating={service.priceRating}
                        ratingAvg={service.rating/5}
                        ratingAmount={service.ratingCount}
                        image={service.image}
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