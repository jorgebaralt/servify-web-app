import React, { Component, lazy, Suspense } from 'react';
// redux-sagas
import { connect } from 'react-redux';
// JSX
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
const Services = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    render () {
        const defaultServices = (
                <Suspense fallback={<LoadingBounce />}>
                    <Services services={this.props.services} 
                        topCategories={this.props.topCategories} />
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
        topCategories: state.servicesReducer.topCategories
	};
};

export default connect(mapStateToProps)(DefaultServices);