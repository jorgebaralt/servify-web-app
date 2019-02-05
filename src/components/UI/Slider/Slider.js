import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
// CSS
import classes from './Slider.module.css';
// JSX
import SlideContainer from './SlideContainer/SlideContainer';
import SliderButtons from './SliderButtons/SliderButtons';
import SliderNav from './SliderNav/SliderNav';
import SliderProgress from './SliderProgress/SliderProgress';

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
        /**
         * The carousel needs an initial setup in case there is an active slide from the props higher than 0
         */
        if (this.props.activeSlide > 0 && this.props.activeSlide < this.props.children.length) {
            this.setupSlider();
        }
    }

    render() {
        let PrevButton;
        let NextButton;
        if (this.props.buttons) {
            PrevButton = this.props.buttons.prev;
            NextButton = this.props.buttons.next;
        }
        // Protection against crashes
        if (!this.props.children) { return <SlideContainer style={this.state.style}>{this.props.children}</SlideContainer>; }
        const children = (
            this.props.children.length ? 
                Object.keys(this.props.children).map((children, index) => {
                    return (
                        <SlideContainer key={index}
                            showOnlyActive={this.props.showOnlyActive ? 
                                this.state.activeSlide === index ? 
                                    'show'
                                    : 'hide'
                                : null
                            }  
                            renderOnlyActive={this.props.renderOnlyActive}  
                            style={this.state.style}>
                            {/* Only render the current slide if it's active. Otherwise return render null. */}
                            {this.props.renderOnlyActive ? 
                                this.state.activeSlide === index ? 
                                    this.props.children[children]
                                    : null
                                : this.props.children[children]}
                            
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
        const wrapperClasses = [classes.Wrapper];
        // If fade in is desired:
        if (this.props.fadeIn) {
            wrapperClasses.push(classes.FadeIn);
        }
        // If sticky in is desired:
        if (this.props.sticky) {
            wrapperClasses.push(classes.Sticky);
        }
        return (
            <div ref={this.mySlider} className={wrapperClasses.join(' ')} style={this.props.style}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.setupWidth} />
                {children}
                {this.props.buttons || !this.props.children.length ? 
                    null :
                    <SliderButtons 
                        totalSlides={this.props.children.length}
                        activeSlide={this.state.activeSlide} 
                        onClick={this.onTranslateHandler} />}
                {this.props.disableNav || !this.props.children.length ? 
                    null :
                    this.props.children.length > 0 ?
                        <SliderNav
                            activeSlide={this.state.activeSlide}
                            slides={Object.keys(this.props.children)} 
                            onClick={this.onTranslateHandler} />
                        : null}
                {!this.props.progressBar ? 
                    null :
                    <SliderProgress
                        totalSlides={this.props.children.length}
                        activeSlide={this.state.activeSlide} />}
            </div>
        );
    }
}

export default Slider;