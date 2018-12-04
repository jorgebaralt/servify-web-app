import React, { Component } from 'react';
// JSX
import Slider from 'react-slick';
// CSS
import classes from './Carousel.module.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
        next() {
        this.slider.slickNext();
    }
        previous() {
        this.slider.slickPrev();
    }

    state = {
        activeSlide: 0,
        activeSlide2: 0
    };

    render () {
        // let reactSwipeEl;
        let settings = {
            dots: false,
            infinite: false,
            // TODO connect to global reducer to set true if on mobile
            swipeToSlide: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            beforeChange: (current, next) => this.setState({ activeSlide: next }),
            afterChange: current => this.setState({ activeSlide2: current }),
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
            <div className={classes.Carousel}>
                <Slider  ref={ref => (this.slider = ref)} {...settings}>
                    {this.props.children} 
                </Slider>
                {this.state.activeSlide === 0 ? 
                    null : 
                    <div className={classes.PrevButton}>
                        <button className="button" onClick={this.previous}>
                        </button>
                    </div>
                }
                {this.state.activeSlide === this.props.children.length - 1 ? 
                    null : 
                    <div className={classes.NextButton}>
                        <button className="button" onClick={this.next}>
                        </button>
                    </div>
                }
            </div>
        );
    };
};

export default Carousel;