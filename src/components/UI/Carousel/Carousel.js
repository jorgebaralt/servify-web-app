import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
// CSS
import classes from './Carousel.module.css';

class Carousel extends Component {

    render () {
        let reactSwipeEl;
        return (
            <div>
                <ReactSwipe
                    className="carousel"
                    swipeOptions={{ continuous: false }}
                    ref={el => (reactSwipeEl = el)} >
                        {/* {this.props.children} */}
                        <div style={{width: '200px'}}>PANE 1</div>
                        <div style={{width: '200px'}}>PANE 2</div>
                        <div style={{width: '200px'}}>PANE 3</div>
                        <div style={{width: '200px'}}>PANE 4</div>
                        <div style={{width: '200px'}}>PANE 5</div>
                        <div style={{width: '200px'}}>PANE 6</div>
                        <div style={{width: '200px'}}>PANE 7</div>
                        <div style={{width: '200px'}}>PANE 8</div>
                </ReactSwipe>
                <button onClick={() => reactSwipeEl.prev()}>Previous</button>
                <button onClick={() => reactSwipeEl.next()}>Next</button>
            </div>
        );
    };
};

export default Carousel;