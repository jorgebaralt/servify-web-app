import React, { useContext, useState } from 'react';
import axios from '../../../axios-services';
import { HeaderContext } from '../../../hoc/Layout/Header/Header';
// action dispatcher, react-router-dom, react-redux, & toast
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// CSS
import classes from './SocialButtons.module.css';
// JSX
import Share from './Share/Share';
import Favorite from './Favorite/Favorite';

const socialButtons = (props) => {
    const header = useContext(HeaderContext);
    const [bIsModalHidden, setModalIsHidden] = useState(true);

    const closeModal = () => {
        setModalIsHidden(true);
    }

    const toggleModal = () => {
        setModalIsHidden(!bIsModalHidden);
    }

    const favoriteServiceHandler = () => {
        /**
         * If the user is not logged in, open the auth modal.
         * Otherwise, post favorite.
         */
        if (!props.userDetails) {
            header.toggleAuthModal('sign in');
        } else {
            // Assuming the request will be successful. This is to improve user friendliness w/ an instant response.
            toast.success('This service has been added to your favorites.');
            const serviceId = props.match.params.id;
            axios.post('/favorites', { uid: props.userDetails.uid, serviceId: serviceId })
                .then(() => {
                    return;
                })
                .catch(() => {
                    toast.error('Something went wrong.')
                });
        }
        
    }

    return (
        <div className={classes.Container}>
            <Share title={props.title} 
                bIsModalHidden={bIsModalHidden} 
                onClick={toggleModal} 
                closeModal={closeModal}
                />
            <Favorite onClick={favoriteServiceHandler} />
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

export default withRouter(connect(mapStateToProps,)(socialButtons));
