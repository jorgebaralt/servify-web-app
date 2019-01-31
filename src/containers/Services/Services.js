import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// redux-saga
import { connect } from 'react-redux';
import { servicesCreator } from '../../store/actions';
// CSS
import classes from './Services.module.css';
// JSX
import ServicesContainer from './ServicesContainer/ServicesContainer';
import SidePanel from './SidePanel/SidePanel';

class Services extends Component {
    constructor(props) {
        super(props);
        props.servicesInit();
        props.onResetCategoriesFilter();
    }

    state = {
        priceFiter: 1 // Defaults to 100%, showing all services.
    }

    setPriceFiter = (priceFiter) => {
        this.setState({
            priceFiter: priceFiter   
        });
    }

    render () {
        let activeCategory = null;
        if (this.props.location.state) {
            activeCategory = this.props.location.state.activeCategory
        }
        return (
            <div className={classes.Wrapper}>
                <SidePanel priceFiter={this.state.priceFiter} onPriceFilter={this.setPriceFiter} activeCategory={activeCategory} />
                {/* Default and Filtered Services */}
                <ServicesContainer priceFiter={this.state.priceFiter} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		servicesInit: () => dispatch(servicesCreator.servicesInitHandler()),
		onResetCategoriesFilter: () => dispatch(servicesCreator.resetCategoriesHandler())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(Services));