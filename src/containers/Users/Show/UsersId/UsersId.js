import React, { Component, Suspense } from 'react';
// axios
import axios from '../../../../axios-services'
// Anon User Image
import anonUser from '../../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './UsersId.module.css';
// JSX
import LoadingPage from '../../../../components/UI/LoadingPage/LoadingPage';
import ProfilePhoto from '../../../../components/Users/ProfilePhoto/ProfilePhoto'
import FavoriteServices from '../../../../components/Users/Show/FavoriteServices/FavoriteServices';
import Reviews from '../../../../components/Users/Show/Reviews/Reviews';
import Separator from '../../../../components/UI/Separator/Separator';

// NotFound lazy import in case a service is not found
const NotFound = React.lazy(() => import('../../../NotFound/NotFound'));

class UsersId extends Component {
    state = { // Initial state before fetching
        bIsLoading: true,
        bIsReviewsLoading: true,
        bIsFavoritesLoading: true,
        error: false,
        reviews: null,
        favoriteServices: null
    }

    getUserReviews = () => {
        axios.get('/reviews', { params: { uid: this.state.uid } })
            .then( response => {
                const reviews = response.data.reviews;
                console.log('data', reviews);
                // Error handling in case there's an empty response
                this.setState( () => {
                    return {
                        reviews: reviews,
                        bIsReviewsLoading: false
                    }
                });
            })
            .catch( () => {
                this.setState({
                    reviews: [],
                    bIsReviewsLoading: false
                });
            });
    }

    getFavoriteServices= () => {
        axios.get('/favorites', { params: { uid: this.state.uid } })
            .then(response => {
                const favoriteServices = response.data;
                console.log(response);
                this.setState({
                    favoriteServices: favoriteServices,
                    bIsFavoritesLoading: false
                });
            })
            .catch( () => {
                this.setState({
                    favoriteServices: [],
                    bIsFavoritesLoading: false
                });
            });
    }

    componentDidMount() {
        const uid = this.props.match.params.id;
        console.log('uid', uid);
        axios.get('/user', { params: { uid: uid } })
            .then( response => {
                const data = response.data;
                console.log('data', data);
                // Error handling in case there's an empty response
                if (!data) { 
                    return this.setState({
                        bIsLoading: false,
                        error: true
                    });
                }
                this.setState( () => {
                    return {
                        bIsLoading: false,
                        ...data
                    }
                });
                this.getFavoriteServices();
                this.getUserReviews();
            })
            .catch( () => {
                this.setState({
                    bIsLoading: false,
                    error: true
                });
            });
    }

    render () {
        let creationDate;
        if (this.state.creationDate) {
            creationDate = (new Date(this.state.creationDate)).toLocaleDateString();
        }
        const user = (
            <>
                <div className={classes.Wrapper}>
                    <div className={classes.Header}>
                        {/* Profile */}
                        <div className={classes.Photo}>
                            <ProfilePhoto rounded src={this.state.photoURL ? this.state.photoURL : anonUser} />
                        </div>
                        <div className={classes.Content}>
                            {/* Header Title */}
                            <div className={classes.Title}>
                                {!this.state.displayName ? 
                                    <span>Hi!</span>
                                    : <span>{['Hi, I\'m ', this.state.displayName, '!'].join('')}</span>
                                }
                            </div>
                            {/* Join Date */}
                            <div className={classes.JoinDate}>
                                Member since: <span>{creationDate}</span>
                            </div>
                            <Separator />
                            {/* Reviews */}
                            <Reviews 
                                loading={this.state.bIsReviewsLoading}
                                // Reviews props
                                reviews={this.state.reviews ? this.state.reviews : []} />
                        </div>
                    </div>
                    <div className={classes.Container}>
                        <FavoriteServices 
                            loading={this.state.bIsFavoritesLoading} 
                            favoriteServices={this.state.favoriteServices ? this.state.favoriteServices : []} />
                    </div>
                </div>
            </>
        );
        return (
            this.state.bIsLoading ?
                <LoadingPage />
                : this.state.error ? 
                    <Suspense fallback={<LoadingPage />}><NotFound /></Suspense>
                    : user
        );
    }
}

export default UsersId;