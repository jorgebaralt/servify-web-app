import React, { Component } from 'react';
// JSX
import Slider from 'react-slick';
// CSS
// import classes from './Carousel.module.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Carousel extends Component {

    render () {
        // let reactSwipeEl;
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
            ]
        };
        if (this.props.settings) {
            settings = this.props.settings;
        }
        return (
            <Slider {...settings}>
                {this.props.children} 
            </Slider>
        );
    };
};

export default Carousel;