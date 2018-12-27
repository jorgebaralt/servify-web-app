import React, { Component } from 'react';
// CSS
import classes from './Publish.module.css';
// JSX
import { Slider, Slide } from '../../components/UI/Slider';

class Publish extends Component {
    render() {
        return (
            <div className={classes.Wrapper}>
                <Slider>
                    <Slide>
                        <div style={{backgroundColor: 'lightblue'}} className={classes.Container}>
                            <div className={classes.Form}>
                                <h1>
                                    Hello there! We'll need some information before we can publish your service,
                                    just follow the steps.
                                </h1>
                                <div className={classes.Step}><span>S</span>tep 1</div>
                                <h2>
                                    What type of service do you provide?
                                </h2>
                            </div>
                        </div>
                    </Slide>
                    <Slide>
                        <div style={{backgroundColor: 'lightgreen'}} className={classes.Container}>
                            <h1>There</h1>
                        </div>
                    </Slide>
                    <Slide>
                        <div style={{backgroundColor: 'lightyellow'}} className={classes.Container}>
                            <h1>General Kenobi!</h1>
                        </div>
                    </Slide>
                </Slider>
            </div>
        );
    }
}

export default Publish;