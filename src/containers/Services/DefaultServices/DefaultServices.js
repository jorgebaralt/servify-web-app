import React, { Component, lazy, Suspense } from 'react';
// CSS
import classes from './DefaultServices.module.css';
// JSX
import LoadingBounce from '../../../components/UI/LoadingBounce/LoadingBounce';
const Services = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    render () {
        
        return (
                <Suspense fallback={<LoadingBounce />}>
                    <Services {...this.props} />
                </Suspense>
        );
    }
}

export default DefaultServices;