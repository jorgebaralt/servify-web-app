import React, { useContext, useState, useEffect } from 'react';
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
    // If the userId is included in the favUsers array from the service data then bIsFavorite will be true
    const [bIsFavorite, setIsFavorite] = useState(props.favUsers.includes(props.userId));

    const closeModal = () => {
        setModalIsHidden(true);
    }

    const toggleModal = () => {
        setModalIsHidden(!bIsModalHidden);
    }

    const unfavoriteService = () => {
        /**
         * If the user is not logged in, open the auth modal.
         * Otherwise, delete favorite.
         */
        const serviceId = props.match.params.id;
        // Assuming the request will be successful. This is to improve user friendliness w/ an instant response.
        toast.success('This service has been removed from your favorites.');
        setIsFavorite(false);
        if (!props.userId) {
            header.toggleAuthModal('sign in');
        } else {
            axios.delete('/favorites', { data: { uid: props.userId, serviceId: serviceId } })
                .then(() => {
                    return;
                })
                .catch(() => {
                    toast.error('Something went wrong.');
                    setIsFavorite(true);
                });
        }
    }

    const favoriteService = () => {
        /**
         * If the user is not logged in, open the auth modal.
         * Otherwise, post favorite.
         */
        if (!props.userId) {
            header.toggleAuthModal('sign in');
        } else {
            // Assuming the request will be successful. This is to improve user friendliness w/ an instant response.
            toast.success('This service has been added to your favorites.');
            const serviceId = props.match.params.id;
            setIsFavorite(true);
            axios.post('/favorites', { uid: props.userId, serviceId: serviceId })
                .then(() => {
                    return;
                })
                .catch(() => {
                    toast.error('Something went wrong.');
                    setIsFavorite(false);
                });
        }
    }

    const favoriteServiceHandler = () => {
        switch (bIsFavorite) {
            case true:
                unfavoriteService();
                break;
            case false: 
                favoriteService();
                break;
            default:
                // do nothing
        }
    }

    // Every time the userId changes, reset the bIsFavorite boolean
    useEffect(() => {
        setIsFavorite(props.favUsers.includes(props.userId));
    }, [props.userId])

    return (
        <div className={classes.Container}>
            <Share title={props.title} 
                bIsModalHidden={bIsModalHidden} 
                onClick={toggleModal} 
                closeModal={closeModal}
                />
            <Favorite fill={bIsFavorite} onClick={favoriteServiceHandler} />
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
        userId: state.authReducer.userId
	};
};

export default withRouter(connect(mapStateToProps,)(socialButtons));
