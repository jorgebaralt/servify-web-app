import React, { Component } from 'react'
// CSS
import classes from './Container.module.css'
// JSX
// import LoadingBounce from '../../../components/UI/LoadingBounce/LoadingBounce';
import Separator from '../../../components/UI/Separator/Separator';

class Container extends Component {
    state = {
        categories: this.props.categories
    }

    render () {
        return (
            <div className={classes.HelpWrapper}>
                <div className={classes.HelpContainer}>
                    {Object.keys(this.state.categories).map( (category, index) => {
                        const questions = (
                            <ul key={index} className={classes.Questions}>
                                { Object.values(this.state.categories[category]).map( question => {
                                    return (
                                        <li className={classes.QuestionContainer} key={question[0]}>
                                            <a className={classes.Question} href="#0">{question[0]}</a>
                                            <div class={classes.Answer}>
                                                <p>{question[1]}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                                <Separator/ >
                            </ul>
                        );
                        return (
                            <>
                                <h1 key={category}>{category}</h1>
                                {questions}
                            </>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Container;