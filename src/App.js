import React, { Component } from 'react';
// react-router-dom
import { withRouter, Switch, Route } from 'react-router-dom';
// redux-sagas
import { connect } from 'react-redux';
import { mobileCreator } from './store/actions';
// JSX
import Layout from './hoc/Layout/Layout';
import RouterScrollToTop from './hoc/RouterScrollToTop/RouterScrollToTop';
import Landing from './containers/Landing/Landing';
import PublishOverview from './containers/PublishOverview/PublishOverview';
import Services from './containers/Services/Services';
import ServiceId from './containers/Services/ServiceId/ServiceId';

class App extends Component {
	
	componentWillMount() {
		this.props.onIsMobile();
		// TODO fetch popular categories global
		// TODO last viewed services --> landing
		// TODO fetch new services near you --> landing
		// TODO popular near services --> landing
	}

	render() {
		return (
			<Layout>
				<RouterScrollToTop />
				<Switch>
					<Route exact path="/publish/overview" component={PublishOverview} />
					<Route exact path="/services/:id" component={ServiceId} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/" component={Landing} />
				</Switch>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isMobile: state.mobileReducer.isMobile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIsMobile: () => dispatch(mobileCreator.isMobileInit()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
