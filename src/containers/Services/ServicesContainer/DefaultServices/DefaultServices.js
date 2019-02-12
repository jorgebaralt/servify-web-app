import React, { Component, lazy, Suspense } from 'react';
// redux-sagas & worker functions
import { connect } from 'react-redux';
import isArray from '../../../../shared/isArray';
// JSX
import LoadingPage from '../../../../components/UI/LoadingPage/LoadingPage';
const Services = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    state = {
        services: null,
        topCategories: null,
        categories: null
    };

    static getDerivedStateFromProps(props, state) {
        const data = {};
        for(let type in props.services) {
            const services = props.services[type];
            // Since services by categories are nested inside the byCategories key, we need to add extra loops.
            if (type === 'byCategories') {
                data[type] = {};
                if (!services) { continue; } // Pointer protection
                // For each category
                for(let category in services) {
                    if (!services[category]) { continue; } // Pointer protection
                    if (!isArray(services[category])) { continue; } // Checking if it's an array, to avoid errors.
                    // A service will be considered filtered if the props.priceFilter number is less than the services' price rating.
                    const filteredServices = services[category].filter(service => {
                        return props.priceFiter*4 >= service.price;
                    });
                    data[type][category] = filteredServices;
                }
            // If not byCategories, then filter normally.
            } else if (services) { // Pointer protection
                if (!isArray(services)) { continue; } // Checking if it's an array, to avoid errors.
                if (!services.length) { continue; } // Pointer protection
                // A service will be considered filtered if the props.priceFilter number is less than the services' price rating.
                const filteredServices = services.filter(service => {
                    return props.priceFiter*4 >= service.price;
                });
                data[type] = filteredServices;
            }
        }
        state = {
            ...props.services,
            services: data
        };
        return state;
    }

    render () {
        const defaultServices = (
                <Suspense fallback={<LoadingPage />}>
                    {/* Wait until some services are loaded to remove the LoadingPage component */}
                    {Object.values(this.state.services).every(element => element === null) ? 
                        <LoadingPage />
                        : <Services city={this.props.city} state={this.props.state} services={this.state.services} topCategories={this.state.topCategories} />}
                </Suspense>
            );
        return (
            defaultServices
        );
    }
}

const mapStateToProps = (state) => {
	return {
        services: state.servicesReducer.services,
        topCategories: state.servicesReducer.topCategories,
	};
};

export default connect(mapStateToProps)(DefaultServices);