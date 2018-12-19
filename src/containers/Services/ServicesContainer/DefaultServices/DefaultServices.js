import React, { Component, lazy, Suspense } from 'react';
// JSX
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
const Services = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    render () {
        let defaultServices = null;
        if (this.props.bIsDefault) {
            defaultServices = (
                <Suspense fallback={<LoadingBounce />}>
                    <Services {...this.props} />
                </Suspense>
            );
        }
        return (
            defaultServices
        );
    }
}

export default DefaultServices;