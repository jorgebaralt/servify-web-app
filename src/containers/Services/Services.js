import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// redux-saga
import { connect } from 'react-redux';
import { servicesCreator } from '../../store/actions';
// CSS
import classes from './Services.module.css';
// JSX
import ServicesContainer from './ServicesContainer/ServicesContainer';
import SidePanel from './SidePanel/SidePanel';

const services = (props) => {
    const [priceFilter, setPriceFiter] = useState(1);
    const [activeCategory] = useState(
        // The default category will be the active one if it exists, otherwise null.
        props.location.state ? props.location.state.activeCategory : null
    );

    // ComponentDidMount
    useEffect(() => {
        props.servicesInit();
        if (activeCategory) {
            props.onToggleCategoryFilter({ ...props.initialCategories }, activeCategory);
        } else {
            props.onResetCategoriesFilter();
        }
    }, []);

    return (
        <div className={classes.Wrapper}>
            <SidePanel priceFiter={priceFilter} onPriceFilter={setPriceFiter} />
            {/* Default and Filtered Services */}
            <ServicesContainer priceFiter={priceFilter} />
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
        initialCategories: state.servicesReducer.initialCategories,
        bIsLoading: state.servicesReducer.bIsLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		servicesInit: () => dispatch(servicesCreator.servicesInitHandler()),
		onToggleCategoryFilter: (prevState, key) => dispatch(servicesCreator.filteredCategoriesHandler(prevState, key)),
		onResetCategoriesFilter: () => dispatch(servicesCreator.resetCategoriesHandler())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(services));