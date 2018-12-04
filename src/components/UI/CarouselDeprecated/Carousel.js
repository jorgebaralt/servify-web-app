import React, { Component, PropTypes } from 'react';
// JSX
import CarouselContainer from './CarouselContainer/CarouselContainer';
import CarouselWrapper from './CarouselWrapper/CarouselWrapper';
import CarouselSlot from './CarouselSlot/CarouselSlot';

class Carousel extends Component {
    state = {
        sliding: false,
        position: 0  
    };

    /**
     * To control the position of the items in our carousel, we’ll be using the flexbox order property. A 
     * flexbox container will present its children in the order specified by the order property, from low 
     * to high. In our carousel, we therefore want the left-most item to have order: 0, and the right-most 
     * to have order: {length — 1}. When it comes to going to the next or previous slide, we therefore will 
     * only need to change the order property on each child, rather than shuffle the DOM elements around.
     * 
     * To do this, we’re going to implement a getOrder() function which takes the DOM index of an item 
     * (its initial position on the page), and then returns the place it should appear in. We’ll need 
     * to keep track of the current position of the carousel to create this function, so we'll store 
     * that in our Carousel class state.
     * 
     * The carousel will loop from last-to-first item (or first-to-last), and our getOrder function 
     * handles this requirement.
     */
    getOrder(itemIndex) {
        // Declaring variables from state / props
        const { position } = this.state
        const { children } = this.props
        // Declaring total number of children
        const numItems = children.length || 1
        /**
         * If the item index minus the position is negative, we return the difference between
         * the total number of items minus the difference between the item index minus the
         * position, if the index is less than the position then it's behind and we return
         * a Math.abs difference.
         */
        if (itemIndex - position < 0) {
            return numItems - Math.abs(itemIndex - position);
        }
        // Else we return the item index minus the position
        return itemIndex - position;
    };

    /**
     * When we click the ‘Next’ button, we’ll set it to true to trigger 
     * the sliding animation, before ending the sliding state again. 
     * This will all happen in a doSliding() function which is called 
     * by nextSlide() & prevSlide().
     */
    doSliding = (position) => {
        this.setState({
            sliding: true,
            position: position
        });
        setTimeout(() => {
            this.setState({
                sliding: false
            });
        }, 1050);
    }

    nextSlide = () => {
        // Declaring variables from state / props
        const { position } = this.state
        const { children } = this.props
        // Declaring total number of children
        const numItems = children.length || 1
        /**
         * Sets the position to the next slide, 
         * checks if there is,only one child
         */
        // this.setState({
        //     position: position === numItems - 1 ? 0 : position + 1
        // });
        const pos = position === numItems - 1 ? 0 : position + 1;
        this.doSliding(pos);
    };

    prevSlide = () => {
        const { position } = this.state
        const { children } = this.props
        const numItems = children.length
        this.doSliding('prev', position === 0 ? numItems - 1 : position - 1)
    };

    render() {
        console.log('this.state.position', this.state.position)
        // let children = null;
        let children = this.props.children.map( (child, index) => {
            return (
                <CarouselSlot 
                    key={index} 
                    // Passing order to the CarouselSlot
                    order={this.getOrder(index)}>
                    {child}
                </CarouselSlot>
            );
        });

        return (
        <div>
            {/* Carousel title */}
            <h2>{this.props.title}</h2>
            <CarouselWrapper>
                <CarouselContainer sliding={this.state.sliding}>
                    {/* Maps each children in an array  to be rendered as carousel slots */}
                    {children}
                </CarouselContainer>
            </CarouselWrapper>
            <button onClick={ () => this.nextSlide() }>Next</button>
        </div>
        );
    };
}

// Carousel.propTypes = {
//     title: PropTypes.string,
//     children: PropTypes.node
// };

export default Carousel;