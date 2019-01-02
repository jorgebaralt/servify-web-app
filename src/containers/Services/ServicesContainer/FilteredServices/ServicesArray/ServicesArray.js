import React from 'react';
// CSS
import classes from '../FilteredServices.module.css';
// JSX
import Service from '../../../../../components/Services/Service/Service';

const services = () => {
    const services = [];
    // TODO DEAL WITH LACEHOLDER
    for (let i = 0; i < 20; i++) {
        services.push(i);
    }
    return (
        services.map( (service) => {
            return (
                <div key={service} 
                    className={classes.Service}>
                    <Service
                        header='Home Services'
                        title='A Random Service'
                        priceRating='0.05'
                        ratingAvg={0.97}
                        ratingAmount='1293'
                        image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                        href='/services/1' />
                </div>
            );
        })
    )
}

export default services;