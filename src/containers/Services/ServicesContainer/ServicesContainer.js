import React, { useState, useEffect } from 'react'
import axios from 'axios';
import categories from '../../../shared/categories';
// redux-sagas
import { connect } from 'react-redux';
// CSS
import classes from './ServicesContainer.module.css'
// JSX
import DefaultServices from './DefaultServices/DefaultServices';
import FilteredServices from './FilteredServices/FilteredServices';
import LoadingBounce from '../../../components/UI/LoadingBounce/LoadingBounce';

// Categories object to be used for filtering
const categoriesObj = {};
categories.map( (category) => {
    return categoriesObj[category.title.replace(/[^a-zA-Z0-9]/g, '')] = false; // Parsing special characters from titles to allow only letters
});

const services = (props) => {
    const [location, setLocation] = useState({
        location: {
            city: null,
            state: null
        }
    });

    const savePosition = (position) => {
        const city = position.data.city;
        const state = position.data.region;
        setLocation({ city: city, state: state });
    }

    useEffect(() => {
        axios.get('http://ipinfo.io').then(
            (response) => savePosition(response)
        );
    }, []);

    return (
        <div className={classes.ServicesWrapper}>
            <div className={classes.ServicesContainer}>
            { props.bIsLoading ? 
                <LoadingBounce /> :   
                props.bIsDefault ? 
                    <DefaultServices
                        priceFiter={props.priceFiter}
                        topCategories={props.topCategories}
                        services={props.services}
                        city={location.city} 
                        state={location.state} /> :
                    <FilteredServices priceFiter={props.priceFiter} /> }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        bIsLoading: state.servicesReducer.bIsLoading,
        bIsDefault: state.servicesReducer.bIsDefault,
        services: state.servicesReducer.services,
        topCategories: state.servicesReducer.topCategories
	};
};

export default connect(mapStateToProps)(services);