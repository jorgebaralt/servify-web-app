import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// redux-sagas
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
    render () {
        let activeCategory = null;
        if (this.props.location.state) {
            activeCategory = this.props.location.state.activeCategory
        }
        return (
            <div className={classes.Wrapper}>
                <SidePanel activeCategory={activeCategory} />
                {/* Default and Filtered Services */}
                <ServicesContainer topCategories={this.props.topCategories} services={this.props.services} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        isMobile: state.mobileReducer.isMobile,
        services: state.servicesReducer.services,
        topCategories: state.servicesReducer.topCategories
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		servicesInit: () => dispatch(servicesCreator.servicesInitHandler()),
		onResetCategoriesFilter: () => dispatch(servicesCreator.resetCategoriesHandler())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Services));