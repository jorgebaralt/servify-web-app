import React, { Component } from 'react'
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

class Services extends Component {
    state = {
        location: {
            city: null,
            state: null
        }
    }

    savePosition = (position) => {
        const city = position.data.city;
        const state = position.data.region;
        this.setState( () => {
                return {
                    location: {
                        city,
                        state
                    }
                }
            }
        );
    }

    componentDidMount () {
        if (navigator.geolocation) {
            axios.get('http://ipinfo.io').then(
                (response) => this.savePosition(response)
            );
        }
    }

    render () {
        return (
            <div className={classes.ServicesWrapper}>
                <div className={classes.ServicesContainer}>
                { this.props.bIsLoading ? 
                    <LoadingBounce /> :   
                    this.props.bIsDefault ? 
                        <DefaultServices
                            topCategories={this.props.topCategories}
                            services={this.props.services}
                            city={this.state.location.city} 
                            state={this.state.location.state} /> :
                        <FilteredServices /> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        bIsLoading: state.servicesReducer.bIsLoading,
		bIsDefault: state.servicesReducer.bIsDefault
	};
};

export default connect(mapStateToProps)(Services);