import React, { Component } from 'react';
// redux-saga, react-router-dom and axios
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios-services'
import  { connect } from 'react-redux';
// Anon User Image
import anonUser from '../../../../assets/svg/source/user-nobg.svg';
// CSS
import classes from './User.module.css';
// JSX
import ProfilePhoto from '../../../../components/Users/ProfilePhoto/ProfilePhoto'
import FavoriteServices from '../../../../components/Users/Show/FavoriteServices/FavoriteServices'
import Reviews from '../../../../components/Users/Show/Reviews/Reviews'
import Separator from '../../../../components/UI/Separator/Separator';

class User extends Component {
    state = {
        loading: true,
        reviews: [],
        favoriteServices: [],
    }

    fetchData = async () => {
        let response = null,
            favoriteServices = [],
            reviews = [];
        // Fetching favorite services
        try {
            response = await axios.get('/favorites', { params: { uid: this.props.userDetails.uid } });
            favoriteServices = await response.data;
            await this.setState({
                favoriteServices: favoriteServices
            });
        } catch {
            this.setState({
                favoriteServices: []
            });
        }
        // Fetching user reviews
        try {
            response = await axios.get('/reviews', { params: { uid: this.props.userDetails.uid } });
            reviews = await response.data.reviews;
            await this.setState({
                reviews: reviews,
                loading: false
            });
        } catch {
            this.setState({
                reviews: []
            });
        }
        await this.setState({
            loading: false
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render () {
        const creationDate = (new Date(Number(this.props.userDetails.metadata.a))).toLocaleDateString();
        return (
            <>
                <div className={classes.Wrapper}>
                    <div className={classes.Header}>
                        {/* Profile */}
                        <div className={classes.Photo}>
                            <ProfilePhoto rounded src={this.props.userDetails.photoURL ? this.props.userDetails.photoURL : anonUser} />
                        </div>
                        <div className={classes.Content}>
                            {/* Header Title */}
                            <div className={classes.Title}>
                                {!this.props.userDetails.displayName ? 
                                    <span>Hi!</span>
                                    : <span>{['Hi, I\'m ', this.props.userDetails.displayName, '!'].join('')}</span>
                                }
                            </div>
                            {/* Join Date */}
                            <div className={classes.JoinDate}>
                                Member since: <span>{creationDate}</span>
                            </div>
                            <Separator />
                            {/* Reviews */}
                            <Reviews loading={this.state.loading} reviews={this.state.reviews} />
                        </div>
                    </div>
                    <div className={classes.Container}>
                        <FavoriteServices loading={this.state.loading} favoriteServices={this.state.favoriteServices} />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails,
	};
};

export default withRouter(connect(mapStateToProps)(User));