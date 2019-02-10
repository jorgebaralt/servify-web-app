import React, { Component, Suspense } from 'react';
// react-router-dom
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
// redux-sagas
import { connect } from 'react-redux';
import { mobileCreator, authCreator, authActions } from './store/actions';
// JSX
import { ToastContainer } from 'react-toastify';
import Loading from './components/UI/LoadingPage/LoadingPage';
import Layout from './hoc/Layout/Layout';
import RouterScrollToTop from './hoc/RouterScrollToTop/RouterScrollToTop';
import Landing from './containers/Landing/Landing';
import Auth from './containers/Auth/Auth';
import Help from './containers/Help/Help';
import Contact from './containers/Contact/Contact';
import Services from './containers/Services/Services';
import ServicesId from './containers/Services/ServicesId/ServicesId';
import UsersId from './containers/Users/Show/UsersId/UsersId';
import PublishOverview from './containers/Publish/PublishOverview/PublishOverview';
import NotFound from './containers/NotFound/NotFound';

const Publish = React.lazy(() => import('./containers/Publish/Publish'));
const Edit = React.lazy(() => import('./containers/Users/Edit/Edit'));
const Feedback = React.lazy(() => import('./containers/Users/Feedback/Feedback'));
const Publications = React.lazy(() => import('./containers/Users/Publications/Publications'));
const PublicationsId = React.lazy(() => import('./containers/Users/Publications/Edit/PublicationsId'));
const Show = React.lazy(() => import('./containers/Users/Show/Show'));

const AuthRedirect = (props) => {
	props.setRedirectPath();
	return (
		<Redirect to='/authenticate' />
	);
}

class App extends Component {
	constructor(props) {
		super(props);
		props.onInit(); // Firebase init, MUST BE FIRST.
		props.onAuthCheckState(); // Checks if there is an user logged in.
		props.onIsMobile();
	}

	setRedirectPath = (path) => {
		// TODO use withRouter to get previous path.
		this.props.authSetRedirectPath(path);
	}

	render() {
	let routes;
	switch (true) {
		case this.props.isAuthLoading: 
			routes = (
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/authenticate" component={Auth} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/publish/overview" component={PublishOverview} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/services/:id" component={ServicesId} />
					<Route exact path="/users/show/:id" component={UsersId} />
					{/* Auth protected routes */}
					<Route exact path="/publish" component={Loading} />
					<Route exact path="/users/feedback" component={Loading} />
					<Route exact path="/users/publications" component={Loading} />
					<Route exact path="/users/publications/edit/:id" component={Loading} />
					<Route exact path="/users/edit" component={Loading} />
					<Route exact path="/users/show" component={Loading} />
					{/* 404 Page */}
					<Route path="*" component={NotFound} />
				</Switch>
			);
			break;
		case this.props.isAuthenticated:
			routes = (
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/authenticate" component={Auth} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/publish/overview" component={PublishOverview} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/services/:id" component={ServicesId} />
					<Route exact path="/users/show/:id" component={UsersId} />
					{/* Auth protected routes */}
					<Route exact path="/publish" render={() => <Suspense fallback={<Loading />}><Publish /></Suspense>} />
					<Route exact path="/users/feedback" render={() => <Suspense fallback={<Loading />}><Feedback /></Suspense>} />
					<Route exact path="/users/publications" render={() => <Suspense fallback={<Loading />}><Publications /></Suspense>} />
					<Route exact path="/users/publications/edit/:id" render={() => <Suspense fallback={<Loading />}><PublicationsId /></Suspense>} />
					<Route exact path="/users/edit" render={() => <Suspense fallback={<Loading />}><Edit /></Suspense>} />
					<Route eaxct path="/users/show" render={() => <Suspense fallback={<Loading />}><Show /></Suspense>} />
					{/* 404 Page */}
					<Route path="*" component={NotFound} />
				</Switch>
			);
			break;
		default:
			routes = (
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/authenticate" component={Auth} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/publish/overview" component={PublishOverview} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/services/:id" component={ServicesId} />
					<Route exact path="/users/show/:id" component={UsersId} />
					{/* Auth protected routes */}
					<Route exact path="/publish" 
						render={() => <AuthRedirect setRedirectPath={() => this.setRedirectPath("/publish")} />} />
					<Route exact path="/users/feedback" 
						render={() => <AuthRedirect setRedirectPath={() => this.setRedirectPath("/users/feedback")} />} />
					<Route exact path="/users/publications" 
						render={() => <AuthRedirect setRedirectPath={() => this.setRedirectPath("/users/publications")} />} />
					<Route exact path="/users/publications/edit/:id" 
						render={() => <AuthRedirect setRedirectPath={() => this.setRedirectPath("/users/publications/edit/:id")} />} />
					<Route exact path="/users/edit" 
						render={() => <AuthRedirect setRedirectPath={() => this.setRedirectPath("/users/edit")} />} />
					<Route exact path="/users/show" 
						render={() => <AuthRedirect setRedirectPath={() => this.setRedirectPath("/users/show")} />} />
					{/* 404 Page */}
					<Route path="*" component={NotFound} />
				</Switch>
			);
	}
	return (
			<Layout>
				<RouterScrollToTop /> {/* After every route change, scroll to top */}
				<ToastContainer
					position="top-right"
					autoClose={6000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					pauseOnVisibilityChange
					draggable
					pauseOnHover />
				{routes}
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isMobile: state.mobileReducer.isMobile,
		isAuthenticated: state.authReducer.userId !== null,
		isAuthLoading: state.authReducer.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIsMobile: () => dispatch(mobileCreator.isMobileInit()),
		onAuthCheckState: () => dispatch(authCreator.authCheckStateInit()),
		authSetRedirectPath: (path) => dispatch(authActions.authSetRedirectPath(path))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
