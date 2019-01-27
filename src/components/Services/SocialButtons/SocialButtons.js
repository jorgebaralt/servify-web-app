import React, { Component } from 'react';
import axios from '../../../axios-services';
// action dispatcher, react-router-dom, react-redux, & toast
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../../store/actions';
// CSS
import classes from './SocialButtons.module.css';
// JSX
import Share from './Share/Share';
import Favorite from './Favorite/Favorite';

class SocialButtons extends Component {
    state = {
        bIsModalHidden: true
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                bIsModalHidden: !prevState.bIsModalHidden
            }
        });
    }
    
    setRedirectPath = () => {
        const path = this.state.pathname;
		this.props.authSetRedirectPath(path);
	}

    favoriteServiceHandler = () => {
        console.log('ping')
        /**
         * If the user is not logged in, store the current pathname and redirect to authenticate.
         * The user will be redirected back to this page after a successful authentication.
         */
        if (!this.props.userDetails) {
            this.setRedirectPath();
            this.props.history.push('/authenticate');
        }
        console.log('pananng')
        const serviceId = this.props.match.params.id;
        axios.post('/favorites', { uid: this.props.userDetails.uid, serviceId: serviceId })
            .then((response) => {
                console.log(response);
                toast.success('This service has been added to your favorites.');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong.')
            });
    }

    render() {
        return (
            <div className={classes.Container}>
                <Share title={this.props.title} 
                    bIsModalHidden={this.state.bIsModalHidden} 
                    onClick={this.toggleModal} />
                <Favorite onClick={this.favoriteServiceHandler} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authSetRedirectPath: (path) => dispatch(authActions.authSetRedirectPath(path))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialButtons));