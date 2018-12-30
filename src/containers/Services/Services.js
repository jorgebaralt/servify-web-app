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
        console.log(props);
        props.onResetCategoriesFilter();
    }

    render () {
        let activeCategory = null;
        if (this.props.location.state) {
            activeCategory = this.props.location.state.activeCategory
        }
        console.log(activeCategory);

        return (
            <div className={classes.Wrapper}>
                <SidePanel activeCategory={activeCategory} />
                {/* Default and Filtered Services */}
                <ServicesContainer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onResetCategoriesFilter: () => dispatch(servicesCreator.resetCategoriesHandler())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(Services));