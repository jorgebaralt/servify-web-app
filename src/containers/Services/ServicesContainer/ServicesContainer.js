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
        
        // bIsDefault bool to decide which container to load
        // const bIsDefault = !Object.values(this.state.categories).includes(true);
        return (
            <div className={classes.ServicesContainer}>
                { !Object.values(this.props.categories).includes(true) ? 
                <DefaultServices 
                    city={this.state.location.city} 
                    state={this.state.location.state} /> :
                <FilteredServices />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		categories: state.servicesReducer.categories,
	};
};

export default connect(mapStateToProps)(Services);