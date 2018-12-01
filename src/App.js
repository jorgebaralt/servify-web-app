import React, { Component } from 'react';
// react-router-dom
import { withRouter, Switch, Route } from 'react-router-dom';
// redux-sagas
import { connect } from 'react-redux';
import { mobileCreator } from './store/actions';
// JSX
import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import PostInfo from './containers/PostInfo/PostInfo';

class App extends Component {
	componentDidMount() {
		this.props.onIsMobile();
		// TODO fetch popular categories global
		// TODO last viewed services --> landing
		// TODO fetch new services near you --> landing
		// TODO popular near services --> landing
	}

	render() {
		return (
			<Layout>
				<Switch>
					<Route exact path="/post/info" component={PostInfo} />
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
