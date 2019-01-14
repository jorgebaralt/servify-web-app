import React from 'react';
// CSS
import classes from './ServicesArray.module.css';
// JSX
import Carousel from '../../../../../components/UI/Carousel/Carousel';
import Service from '../../../../../components/Services/Service/Service';
import Featured from '../../../../../components/Services/Featured/Featured';

const services = (props) => {
    // TODO remove placeholders
    const placeholders = [];
    for (let i = 0; i < 12; i++) {
        placeholders.push(
            <Service
                key={i}
                priceRating={1}
                ratingAvg={1}
                image={'/'} />
        );
    }
    const loadingServicesCarousel = (
        <div className={classes.Container}>
            {placeholders}
        </div>
    );
    let topServicesByCategories = loadingServicesCarousel,
        topServices = null,
        nearServices = null;
    if (props.services.byCategories) { 
        topServicesByCategories = (
            Object.entries(props.services.byCategories).map( (category, index) => {
                return (
                    <div key={index}>
                        <h1>{category[0]} 
                            {props.city && props.state ?
                            ` ${props.city}, ${props.state}` : 
                            ' near you'}
                        </h1>
                        <Carousel>
                            {Object.values(category[1]).map( (service, index) => {
                                return (
                                    <Service
                                        key={[index, service.title].join('_')}
                                        header={service.category.replace("_", " ")}
                                        title={service.title}
                                        priceRating='0.05'
                                        ratingAvg={service.rating/5}
                                        ratingAmount={service.ratingCount}
                                        image={service.image}/>
                                );
                            })}
                        </Carousel>
                    </div>
                );
            })
        );
    }
    if (props.services.topServices) {
        topServices = (
            <div>
                <h1>Top-rated services</h1>
                <Carousel>
                    {Object.values(props.services.topServices).map( (service, index) => {
                        return (
                            <Service
                                key={index}
                                header={service.category.replace("_", " ")}
                                title={service.title}
                                priceRating='0.05'
                                ratingAvg={service.rating/5}
                                ratingAmount={service.ratingCount}
                                image={service.image}/>
                        );
                    })}
                </Carousel>
            </div>
        );
    }
    if (props.services.nearServices) {
        nearServices = (
            <div>
                <h1>Near services
                    {props.city && props.state ?
                        ` in ${props.city}, ${props.state}` : 
                        ' near you'}
                </h1>
                <Carousel>
                    {Object.values(props.services.nearServices).map( (service, index) => {
                        return (
                            <Service
                                key={index}
                                header={service.category.replace("_", " ")}
                                title={service.title}
                                priceRating='0.05'
                                ratingAvg={service.rating/5}
                                ratingAmount={service.ratingCount}
                                image={service.image}/>
                        );
                    })}
                </Carousel>
            </div>
        );
    }
    return (
        props.services.byCategories ? 
        (
            <>
                {topServicesByCategories}
                {topServices}
                {nearServices}
            </>
        )
        : (
            <>
                {topServicesByCategories}
                {topServicesByCategories}
                {topServicesByCategories}
            </>
        )
    );
}

export default services;