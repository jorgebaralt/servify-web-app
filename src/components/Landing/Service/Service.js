import React, { Component } from 'react';
// CSS
import classes from './Service.module.css';
import StarsRating from '../../../components/UI/StarsRating/StarsRating';

class Service extends Component  {
    render () {
        // Total rating amount, defaults to 5
        const totalStarsRatingAmount = this.props.totalAmount ? this.props.totalAmount : 5;
        return (
            <div className={classes.Service}>
                <a draggable="false" href='/' className={classes.Wrapper} target="_blank">
                    <div className={classes.ThumbnailWrapper}>
                        <div className={classes.ThumbnailContainer}>
                            <div className={classes.Thumbnail} style={{backgroundImage: `url(${this.props.image})`}}>
    
                            </div>
                        </div>
                    </div>
                </a>
                <a draggable="false" href='/' className={classes.Details} target="_blank">
                    <div>
                        <div className={classes.Header}>
                            <span style={{color: '#1fa6c8'}}>{this.props.header}</span>
                        </div>
                    </div>
                    {/* Title */}
                    <div className={classes.Title}>{this.props.title}</div>
                    {/* Price */}
                    <div className={classes.Price}>{this.props.price}</div>
                    {/* Rating */}
                    <div>
                        {/* Average Rating */}
                        <span role="img">
                            {/* Rating Average times the total amount of stars for easier interpretation */}
                            <span className={classes.RatingsAvg}>{(this.props.ratingAvg*totalStarsRatingAmount).toFixed(2)}</span>
                            <StarsRating rating={this.props.ratingAvg} amount={totalStarsRatingAmount}/>
                        </span>
                        {/* Total amount of Ratings */}
                        <span className={classes.RatingsAmount}>
                            <span className={classes.Amount}>
                                {this.props.ratingAmount}
                                {/* Dynamic string depending if 1 rating or more */}
                                &nbsp;total rating{this.props.ratingAmount > 0 ? 's' : null}</span> 
                        </span>
                    </div>
                </a>
            </div>
        );
    };
};

export default Service;