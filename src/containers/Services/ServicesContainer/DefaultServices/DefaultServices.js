import React, { Component, lazy, Suspense } from 'react';
// redux-sagas
import { connect } from 'react-redux';
// JSX
import LoadingPage from '../../../../components/UI/LoadingPage/LoadingPage';
const Services = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    render () {
        const defaultServices = (
                <Suspense fallback={<LoadingPage />}>
                    {/* Wait until some services are loaded to remove the LoadingPage component */}
                    {Object.values(this.props.services).every(element => element === null) ? 
                        <LoadingPage />
                        : <Services services={this.props.services} topCategories={this.props.topCategories} />}
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
        categories: state.servicesReducer.categories
	};
};

export default connect(mapStateToProps)(DefaultServices);