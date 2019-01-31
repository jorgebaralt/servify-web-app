import React, { Component, lazy, Suspense } from 'react';
// redux-sagas & worker functions
import { connect } from 'react-redux';
import isArray from '../../../../shared/isArray';
// CSS
import classes from './FilteredServices.module.css';
// JSX
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
const ServicesArray = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    state = { // Init state
        services: {
            filteredServices: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        state = { // Init state
            services: {
                filteredServices: null
            }
        }
        if (props.services.filteredServices) {
            const services = props.services.filteredServices;
            if (!services.length) { return state; } // Pointer protection
            if (!isArray(services)) { return state; } // Checking if it's an array, to avoid errors.
            // A service will be considered filtered if the props.priceFilter number is less than the services' price rating.
            const filteredServices = services.filter(service => {
                return props.priceFiter*4 >= service.price;
            });
            state = {
                services: {
                    filteredServices: filteredServices
                }
            };
        }
        return state;
    }

    render () {
        return (
            <div className={classes.Container}>
                <Suspense fallback={<LoadingBounce />}>
                    <ServicesArray services={this.state.services} />
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        services: state.servicesReducer.services,
	};
};

export default connect(mapStateToProps)(DefaultServices);