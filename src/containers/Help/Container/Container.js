import React from 'react'
// CSS
import classes from './Container.module.css'
// JSX
import Question from '../../../components/Help/Container/Question/Question';
import Separator from '../../../components/UI/Separator/Separator';

const container = (props) => {
    return (
        <div className={classes.HelpWrapper}>
            <div className={classes.HelpContainer}>
                {Object.keys(props.categories).map( category => {
                    return (
                        <div key={category}>
                            <h1>{category}</h1>
                            <ul className={classes.Questions}>
                                {Object.entries(props.categories[category]).map( question => {
                                    const questionKey = question[0];
                                    const questionObj = question[1];
                                    const id = [category,'_',questionKey].join('');
                                    return (
                                        <Question 
                                            id={id}
                                            key={questionKey}
                                            question={questionObj}
                                            bIsOpen={props.categories[category][question[0]].bIsOpen}
                                            onClick={() => props.toggleAnswer(category, questionKey)} />
                                    );
                                })}
                                <Separator />
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default container;