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

    useEffect(() => {
        props.servicesInit();
        props.onResetCategoriesFilter();
    }, []);

    let activeCategory = null;

    if (props.location.state) {
        activeCategory = props.location.state.activeCategory
    }

    return (
        <div className={classes.Wrapper}>
            <SidePanel priceFiter={priceFilter} onPriceFilter={setPriceFiter} activeCategory={activeCategory} />
            {/* Default and Filtered Services */}
            <ServicesContainer priceFiter={priceFilter} />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
	return {
		servicesInit: () => dispatch(servicesCreator.servicesInitHandler()),
		onResetCategoriesFilter: () => dispatch(servicesCreator.resetCategoriesHandler())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(services));