import React from 'react';
// JSX
import Carousel from '../../../../../components/UI/Carousel/Carousel';
import Service from '../../../../../components/Services/Service/Service';
import Featured from '../../../../../components/Services/Featured/Featured';

const services = (props) => {
    // TODO remove placeholders
    const loadingServicesCarousel = (
        <Carousel>
            <Service
                priceRating={1}
                ratingAvg={1}/>
            <Service
                priceRating={1}
                ratingAvg={1}/>
            <Service
                priceRating={1}
                ratingAvg={1}/>
            <Service
                priceRating={1}
                ratingAvg={1}/>
            <Service
                priceRating={1}
                ratingAvg={1}/>
        </Carousel>
    );
    const placeholderFeaturedCarousel = (
        <Carousel>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
        </Carousel>
    );
    let topServicesByCategories = loadingServicesCarousel
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
                                        image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                                );
                            })}
                        </Carousel>
                    </div>
                );
            })
        );
    }
    return (
        props.services.byCategories ? 
        (
            <>
                {topServicesByCategories}
                <h1>Top-rated services 
                {props.city && props.state ?
                    ` ${props.city}, ${props.state}` : 
                    ' you'}
                </h1>
                <h1>Featured Servify services</h1>
                <h1>New services 
                    {props.city && props.state ?
                    ` ${props.city}, ${props.state}` : 
                    ' you'}
                </h1>
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