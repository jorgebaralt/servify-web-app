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
        this.mySlider.slickNext();
    }

    previous() {
        this.mySlider.slickPrev();
    }

    /**
     * Dynamic responsive slider, depending on the amount of children,
     */
    responsiveSlider = () => {
        let responsive = [];
        if (this.props.children.length >= 3) {
            responsive.push(
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            );
        };
        if (this.props.children.length >= 2) {
            responsive.push(
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                    }
                },
            );
        };
        responsive.push(
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                }
            }
        );
        return responsive;
    };

    /**
     * Setter function that determines which breakpoint the slider is set at, to set the slidesToShow
     * property in the state, so that we can manage when to render the Next and Previous slide buttons.
     */
    setSlidesToShow = () => {
        // Pointer protection
        if (!this.mySlider) { return; }
        // For every object containing the breakpoints in the responsive array set and sent to the slider
        for (let breakpoint in this.mySlider.props.responsive) {
            /**
             * We're looping to find the right breakpoint and extract the slidesToShow property to set
             * the state. If the loop breakpoint equals the current slider's state breakpoint then
             * it will set the state's slidesToShow equal to the current slider's slidesToShow, then
             * break the loop.
             */
            if (this.mySlider.props.responsive[breakpoint].breakpoint === this.mySlider.state.breakpoint) {
                const slidesToShow = this.mySlider.props.responsive[breakpoint].settings.slidesToShow;
                this.setState( () => {
                    return {slidesToShow}
                });
                break;
            }
        };
    }

    state = {
        activeSlide: 0,
        activeSlide2: 0,
        rows: this.props.dynamicRows ? this.props.children.length >= 8 ? 2 : 1 : 1,
        slidesToShow: this.props.slidesToShow ? this.props.slidesToShow : 4, // Default, if on mobile or smaller screens it will be reapplied
        responsive: this.responsiveSlider(),
    };

    componentDidMount () {
        this.setSlidesToShow();
        window.onresize = () => {
            this.setSlidesToShow();
        };
    }

    // Update only at the end or beginning of the carousel
    shouldComponentUpdate () {
        if (this.state.activeSlide === 0 || (this.state.activeSlide + this.state.slidesToShow)*this.state.rows >= this.props.children.length ) {
            return true;
        }
        return false;
    }

    render () {
        // Carousel default settings buildup.
        let settings = {
            dots: false,
            infinite: false,
            arrows: false,
            swipeToSlide: true,
            draggable: false,
            speed: 250,
            rows: this.state.rows ? this.state.rows : 1, // Carousel rows to show, defaults to one
            slidesToShow: this.props.slidesToShow ? this.props.slidesToShow : 4,
            slidesToScroll: 1,
            initialSlide: 0,
            beforeChange: (_, next) => this.setState({ activeSlide: next }),
            afterChange: current => this.setState({ activeSlide2: current }),
            responsive: this.state.responsive
        };
        // If there are settings passed by a prop use those.
        if (this.props.settings) {
            settings = this.props.settings;
        }
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Container}>
                    <Slider  ref={ref => (this.mySlider = ref)} {...settings}>
                        {this.props.children} 
                    </Slider>
                </div>
                {/* PrevButton */}
                {this.state.activeSlide === 0 ? 
                    null : 
                    <div className={classes.PrevButton}>
                        <button onClick={this.previous}>
                        </button>
                    </div>
                }
                {/* NextButton */}
                {(this.state.activeSlide + this.state.slidesToShow)*settings.rows >= this.props.children.length || this.state.slidesToShow >= this.props.children.length  ? 
                    null :  
                    <div className={classes.NextButton}>
                        <button onClick={this.next}>
                        </button>
                    </div>
                }
            </div>
        );
    };
};

export default Carousel;