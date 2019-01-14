import React from 'react';
// CSS
import classes from './Question.module.css';

const question = (props) => {
    const AnswerClasses = [classes.Answer];
    const QuestionContainerClasses = [classes.QuestionContainer];
    if (props.bIsOpen) {
        AnswerClasses.push(classes.Open);
        QuestionContainerClasses.push(classes.Open);
    }
    return (
        <li id={props.id} className={QuestionContainerClasses.join(' ')}>
            <div onClick={props.onClick} className={classes.Question}>{props.question[0]}</div>
            <div className={AnswerClasses.join(' ')}>
                <p>{props.question[1]}</p>
            </div>
        </li>
    );
}

export default question;