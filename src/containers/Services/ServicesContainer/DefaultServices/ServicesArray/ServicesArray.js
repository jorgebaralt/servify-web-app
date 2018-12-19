import React from 'react';
// JSX
import Carousel from '../../../../../components/UI/Carousel/Carousel';
import Service from '../../../../../components/Landing/Service/Service';
import Featured from '../../../../../components/Landing/Featured/Featured';

const services = (props) => {
    // TODO remove placeholders
    const placeholderServicesCarousel = (
        <Carousel>
            <Service
                header='Home Services'
                title='A Random Service'
                priceRating='0.05'
                ratingAvg={0.97}
                ratingAmount='1293'
                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                href='/services/1' />
            <Service
                header='Home Services'
                title='A Random Service'
                priceRating='0.05'
                ratingAvg={0.97}
                ratingAmount='1293'
                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                href='/services/1' />
            <Service
                header='Home Services'
                title='A Random Service'
                priceRating='0.05'
                ratingAvg={0.97}
                ratingAmount='1293'
                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                href='/services/1' />
            <Service
                header='Home Services'
                title='A Random Service'
                priceRating='0.05'
                ratingAvg={0.97}
                ratingAmount='1293'
                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                href='/services/1' />
            <Service
                header='Home Services'
                title='A Random Service'
                priceRating='0.05'
                ratingAvg={0.97}
                ratingAmount='1293'
                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                href='/services/1' />
            <Service
                header='Home Services'
                title='A Random Service'
                priceRating='0.05'
                ratingAvg={0.97}
                ratingAmount='1293'
                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                href='/services/1' />
        </Carousel>
    );
    const placeholderFeaturedCarousel = (
        <Carousel>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
        </Carousel>
    );
    return (
        <>
            <h1>Top-rated services 
            {props.city && props.state ?
                ` ${props.city}, ${props.state}` : 
                ' you'}
            </h1>
            {placeholderServicesCarousel}
            <h1>Featured Servify services</h1>
            {placeholderFeaturedCarousel}
            <h1>New services 
                {props.city && props.state ?
                ` ${props.city}, ${props.state}` : 
                ' you'}
            </h1>
            {placeholderServicesCarousel}
            <h1>Home Services 
                {props.city && props.state ?
                ` ${props.city}, ${props.state}` : 
                ' you'}
            </h1>
            {placeholderServicesCarousel}
            <h1>Auto Services 
                {props.city && props.state ?
                ` ${props.city}, ${props.state}` : 
                ' you'}
            </h1>
            {placeholderServicesCarousel}
            <h1>Electrical Services 
                {props.city && props.state ?
                ` ${props.city}, ${props.state}` : 
                ' you'}
            </h1>
            {placeholderServicesCarousel}
        </>
    );
}

export default services;