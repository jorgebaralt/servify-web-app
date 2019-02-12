import React from 'react'
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
                        city={props.locationData.city} 
                        state={props.locationData.region} /> :
                    <FilteredServices priceFiter={props.priceFiter} /> }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
        locationData: state.usersReducer.locationData,
        bIsLoading: state.servicesReducer.bIsLoading,
        bIsDefault: state.servicesReducer.bIsDefault,
        services: state.servicesReducer.services,
        topCategories: state.servicesReducer.topCategories
	};
};

export default connect(mapStateToProps)(services);