import React, { Component, lazy, Suspense } from 'react';
// redux-sagas
import { connect } from 'react-redux';
// CSS
import classes from './FilteredServices.module.css';
// JSX
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
const ServicesArray = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    render () {
        return (
            <div className={classes.Container}>
                <Suspense fallback={<LoadingBounce />}>
                    <ServicesArray services={this.props.services} />
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        services: state.servicesReducer.services,
        topCategories: state.servicesReducer.topCategories,
        categories: state.servicesReducer.categories
	};
};

export default connect(mapStateToProps)(DefaultServices);