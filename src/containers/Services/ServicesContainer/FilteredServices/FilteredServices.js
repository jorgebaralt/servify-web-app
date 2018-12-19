import React, { Component, lazy, Suspense } from 'react';
// CSS
import classes from './FilteredServices.module.css';
// JSX
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
const Services = lazy(() => import('./ServicesArray/ServicesArray'));

class DefaultServices extends Component {
    render () {
        
        return (
            <div className={classes.Container}>
                <Suspense fallback={<LoadingBounce />}>
                    <Services />
                </Suspense>
            </div>
        );
    }
}

export default DefaultServices;