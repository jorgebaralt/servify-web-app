import React, { Component } from 'react'
import axios from 'axios';
import categories from '../../../shared/categories';
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
        categories: {
            ...categoriesObj,
            list: {
                bIsClosed: false
            }
        },
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
        const bIsDefault = !Object.values(this.state.categories).includes(true);
        return (
            <div className={classes.ServicesContainer}>
                {/* { !Object.values(this.state.categories).includes(true) ?  */}
                { true ? 
                <DefaultServices 
                    bIsDefault={bIsDefault}
                    city={this.state.location.city} 
                    state={this.state.location.state} /> :
                <FilteredServices 
                    bIsDefault={bIsDefault} />}
            </div>
        )
    }
}

export default Services;