import React, { Component } from 'react';
// CSS
import classes from './Service.module.css';
import StarsRating from '../../../components/UI/StarsRating/StarsRating';

class Service extends Component  {

    render () {
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
                            <span style={{color: 'rgb(131, 104, 69)'}}>{this.props.header}</span>
                        </div>
                    </div>
                    <div className={classes.Title}>{this.props.title}</div>
                    <div className={classes.Price}>{this.props.price}</div>
                    {/* Star Rating */}
                    <div>
                        <span role="img">
                            <span className={classes.RatingsAvg}>{this.props.RatingsAvg}</span>
                            <StarsRating rating={.7} />
                        </span>
                        <span className={classes.RatingsAmount}><span className={classes.Amount}>{this.props.ratingsAmount}</span></span>
                    </div>
                </a>
            </div>
        );
    };
};

export default Service;