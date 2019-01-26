import React, { Component } from 'react';
// CSS
import classes from './Score.module.css';
// JSX
import Star from './Star/Star';

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.amount | 5, // Score variable for the form element
            fill: this.props.amount | 5, // Fill variable for SVG items
            amount: this.props.amount | 5, // Amount of items rendered, defaults to 5 just like the fill & score
            config: this.props.config ? this.props.config : { // Default config for the SVG items
                width: '24px',
                height: '24px'
            },
            touched: false
        }
    }

    score = (position) => {
        return this.state.fill >= position ? '100%' : '0';
    }

    onClick = (position) => {
        // Sets the score
        this.setState({
            touched: true,
            score: position
        });
        // Set the score on outer container component if it exists
        if (this.props.onChange) {
            this.props.onChange(position);
        }
    }

    onMouseEnter = (position) => {
        this.setState({
            fill: position
        });
    }

    onMouseLeave = () => {
        // If the stars have been touched, set fill back to score
        if (this.state.touched) { 
            return this.setState({
                fill: this.state.score
            });
        }
        // Otherwise set back to 5
        this.setState({
            fill: this.props.amount | 5
        });
    }

    // Set the score on outer container component if it exists
    componentDidMount() {
        if (this.props.onChange) {
            this.props.onChange(this.state.score);
        }
    }
    
    render() {
        const items = [];
        for(let i = 0; i < this.state.amount; i++) {
            items.push(
                <Star  
                    key={i}
                    config={ {...this.state.config} }
                    onClick={() => this.onClick(i + 1)}
                    onMouseEnter={() => this.onMouseEnter(i + 1)}
                    onMouseLeave={this.onMouseLeave}
                    fill={this.score(i + 1)} />)
        }
        return (
            <div className={classes.Container}>
                {items}
            </div>
        );
    }
}

export default Score;