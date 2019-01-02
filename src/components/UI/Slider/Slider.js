import React, { Component } from 'react';
// CSS
import classes from './Slider.module.css';
// JSX
import SlideContainer from './SlideContainer/SlideContainer';
import SliderButtons from './SliderButtons/SliderButtons';
import SliderNav from './SliderNav/SliderNav';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.mySlider = React.createRef();
        this.state = {
            activeSlide: props.activeSlide > 0 ? props.activeSlide : 0,
            style: {
                transform: 'translateX(0px)'
            },
            bOrientationChanged: false
        }
    }

    setupSlider = () => {
        const sliderWidth = this.mySlider.current.clientWidth; // Pointer to the slider's reference width
        const style = {
            transition: 'transform ease 0ms', // To avoid animations on setup
            transform: `translateX(-${(this.props.activeSlide)*sliderWidth}px)`
        };
        this.setState( () => {
            return {
                style: style
            }
        });
    }

    setOrientationChanged = () => {
        this.setState( () => {
            return {
                bOrientationChanged: true
            }
        });
    }
    
    setupWidth = (e) => {
        this.setState( (prevState) => {
            // Pointer to the slider's reference width 
            const sliderWidth = this.mySlider.current.clientWidth; 
            const style = {
                transition: 'transform ease 0ms', // To avoid animations on setup
                transform: `translateX(-${(prevState.activeSlide)*sliderWidth}px)`
            };
            return {
                style: style,
                bOrientationChanged: false
            }
        });
    }

    onTranslateHandler = (type, toSlide) => {
        this.setState( prevState => {
            let operator;
            // Defining the operator depending on which button was pressed
            switch (type) {
                case 'prev': 
                    operator = -1;
                    break;
                case 'next': 
                    operator = + 1;
                    break;
                default:
                    // do nothing
            }
            const sliderWidth = this.mySlider.current.clientWidth;
            /**
             * The next active slide will be the specific slide toSlide if it exists. Otherwise,
             * it will be the result of the previous active slide and the operator.
             */
            const nextActiveSlide = toSlide ? (Number(toSlide)) : (prevState.activeSlide + operator);
            /**
             * Error prevention. f the next slide is not a number, or if the next slide + 1 exceeds 
             * the amount of children, then it will return and not translate. 
             */
            if (nextActiveSlide + 1 > this.props.children.length || isNaN(nextActiveSlide)) { return; }
            const style = {transform: `translateX(-${(nextActiveSlide)*sliderWidth}px)`};
            return {
                activeSlide: nextActiveSlide,
                style: style
            }
        })
    }

    componentDidMount () {
        window.addEventListener("orientationchange", this.setOrientationChanged);
        /**
         * The carousel needs an initial setup in case there is an active slide from the props higher than 0
         */
        if (this.props.activeSlide > 0 && this.props.activeSlide < this.props.children.length) {
            this.setupSlider();
        }
    }

    componentDidUpdate () {
        if (this.state.bOrientationChanged) {
            setTimeout(() => { // To force asynchronous callback in order to let the slider container resize
                this.setupWidth()
            }, 0);
        }
    }

    componentWillUnmount () {
        window.removeEventListener("orientationchange", this.setOrientationChanged);
    }

    render() {
        console.log(!this.props.children.length)
        let PrevButton;
        let NextButton;
        if (this.props.buttons) {
            PrevButton = this.props.buttons.prev;
            NextButton = this.props.buttons.next;
        }
        const children = (
            this.props.children.length ? 
                Object.keys(this.props.children).map( children => {
                    return (
                        <SlideContainer key={children} style={this.state.style}>
                            {this.props.children[children]}
                            {this.props.buttons ?
                                <div className={this.props.buttons.className}>
                                    {React.cloneElement( // Cloning buttons to pass onTranslateHandler
                                        PrevButton, 
                                        {
                                            clicked: () => {
                                                this.props.buttons.onClick.prev();
                                                this.onTranslateHandler('prev')
                                            },
                                            totalSlides: this.props.children.length,
                                            activeSlide: this.state.activeSlide
                                        }
                                    )}
                                    {React.cloneElement( // Cloning buttons to pass onTranslateHandler
                                        NextButton, 
                                        {
                                            clicked: () => {
                                                this.props.buttons.onClick.next();
                                                this.onTranslateHandler('next')
                                            },
                                            totalSlides: this.props.children.length,
                                            activeSlide: this.state.activeSlide
                                        }
                                    )}
                                </div>
                            : null}
                        </SlideContainer>
                    );
                })
                : 
                <SlideContainer style={this.state.style}>
                    {this.props.children}
                </SlideContainer>
        );
        return (
            <div ref={this.mySlider} className={classes.Wrapper}>
                {children}
                {this.props.buttons || !this.props.children.length ? 
                    null :
                    <SliderButtons 
                        totalSlides={this.props.children.length}
                        activeSlide={this.state.activeSlide} 
                        onClick={this.onTranslateHandler} />}
                {this.props.disableNav || !this.props.children.length ? 
                    null :
                    <SliderNav
                        activeSlide={this.state.activeSlide}
                        slides={Object.keys(this.props.children)} 
                        onClick={this.onTranslateHandler} />}
            </div>
        );
    }
}

export default Slider;