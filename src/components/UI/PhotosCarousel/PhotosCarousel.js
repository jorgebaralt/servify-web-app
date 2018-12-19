import React, { Component } from 'react';
// JSX
import Slider from 'react-slick';
// CSS
import classes from './PhotosCarousel.module.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ImageFadeIn from '../ImageFadeIn/ImageFadeIn'

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
        nav1: null,
        nav2: null,
        activeSlide: 0,
        activeSlide2: 0,
        rows: 1,
        slidesToShow: this.props.slidesToShow ? this.props.slidesToShow : 1, // Default, if on mobile or smaller screens it will be reapplied
    };

    componentDidMount () {
        this.setState({
            nav1: this.mySlider,
            nav2: this.myBottomSlider
        });
        this.setSlidesToShow();
        window.onresize = () => {
            this.setSlidesToShow();
        };
    }

    componentWillMount () {
        window.onresize = () => {
            return;
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }
    
    render () {
        // Carousel default settings buildup.
        let settings = {
            dots: false,
            fade: true,
            lazyLoad: true,
            infinite: true,
            adaptiveHeight: true,
            speed: 500,
            arrows: false,
            swipeToSlide: true,
            draggable: false,
            rows: this.state.rows ? this.state.rows : 1, // Carousel rows to show, defaults to one
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            beforeChange: (current, next) => this.setState({ activeSlide: next }),
            afterChange: current => this.setState({ activeSlide2: current }),
        };
        // If there are settings passed by a prop use those.
        if (this.props.settings) {
            settings = this.props.settings;
        }
        return (
            <div className={classes.Carousel}>
                <Slider 
                    asNavFor={this.state.nav2}
                    ref={ref => (this.mySlider = ref)} 
                    {...settings}>
                    {this.props.images.map( (image, index) => {
                        return (
                            <div 
                                key={['Photo__', index].join(' ')}
                                className={classes.PhotoContainer}>
                                <ImageFadeIn
                                    loading={true}
                                    bShouldUpdate={false}
                                    style={{
                                            width: this.props.dimensions ? this.props.dimensions.width : null,
                                            height: this.props.dimensions ? this.props.dimensions.height : null,
                                        }}
                                    className={classes.Photo}
                                    src={image}/>
                            </div> 
                        );
                    } )}
                </Slider>
                {/* PrevButton */}
                <div className={classes.PrevButton}>
                    <button onClick={this.previous}>
                    </button>
                </div>
                {/* NextButton */}
                <div className={classes.NextButton}>
                    <button onClick={this.next}>
                    </button>
                </div>
                <Slider
                    asNavFor={this.state.nav1}
                    ref={slider => (this.myBottomSlider = slider)}
                    slidesToShow={this.props.images.length}
                    swipeToSlide={true}
                    focusOnSelect={false} >
                    {this.props.images.map((image, index) => {
                        return (
                            <div 
                                className={
                                    this.state.activeSlide === index ? 
                                    [classes.Thumbnail, classes.active].join(' ') :
                                    classes.Thumbnail
                                } 
                                key={index}>
                                <div 
                                    className={classes.ThumbnailContainer}>
                                    <ImageFadeIn
                                        bShouldUpdate={false}
                                        style={{
                                            width: this.props.dimensions ? this.props.dimensions.width/this.props.images.length*0.9 : null,
                                            height: this.props.dimensions ? this.props.dimensions.height/this.props.images.length*0.9 : null,
                                        }}
                                        className={classes.Photo}
                                        src={image} />
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    };
};

export default Carousel;