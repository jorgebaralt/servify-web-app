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
import Help from './containers/Help/Help';
import Contact from './containers/Contact/Contact';
import Publish from './containers/Publish/Publish';
import PublishOverview from './containers/Publish/PublishOverview/PublishOverview';
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
					<Route exact path="/help" component={Help} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/publish" component={Publish} />
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
