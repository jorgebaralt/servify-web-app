import React from 'react';
// JSX
import LoadingBounce from '../../../../../components/UI/LoadingBounce/LoadingBounce';
import Carousel from '../../../../../components/UI/Carousel/Carousel';
import Service from '../../../../../components/Services/Service/Service';

const services = (props) => {
    let topServicesByCategories = null,
        topServices = null,
        nearServices = null;
    if (props.services.byCategories) { 
        topServicesByCategories = (
            Object.entries(props.services.byCategories).map( (category, index) => {
                if (!category[1].length) { return null; }
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
                                        href={service.id}
                                        priceRating={service.price/4}
                                        ratingAvg={service.rating/5}
                                        ratingAmount={service.ratingCount}
                                        image={service.imagesInfo}/>
                                );
                            })}
                        </Carousel>
                    </div>
                );
            })
        );
    }
    if (props.services.topServices) {
        if (!props.services.topServices.length) { return topServices = null; }
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
                                href={service.id}
                                priceRating={service.price/4}
                                ratingAvg={service.rating/5}
                                ratingAmount={service.ratingCount}
                                image={service.imagesInfo}/>
                        );
                    })}
                </Carousel>
            </div>
        );
    }
    if (props.services.nearServices) {
        if (!props.services.topServices.length) { return nearServices = null; }
        nearServices = (
            <div>
                <h1>Services
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
                                href={service.id}
                                priceRating={service.price/4}
                                ratingAvg={service.rating/5}
                                ratingAmount={service.ratingCount}
                                image={service.imagesInfo}/>
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
                {nearServices}
                {topServicesByCategories}
                {topServices}
            </>
        )
        : (
            <LoadingBounce />
        )
    );
}

export default services;