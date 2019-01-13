import React from 'react';
// CSS
import classes from './SearchBar.module.css'

const searchBar = (props) => {
    // Search Bar
    const searchBarContainerClasses = [classes.SearchBarContainer];
    if (props.bIsFocused) {
        searchBarContainerClasses.push(classes.FocusWithin);
    }
    return (
        <div className={[classes.SearchBarAnchor, classes.SearchBarWrapper].join(' ')}>
            <div className={searchBarContainerClasses.join(' ')}>
                <div className={classes.BarWrapper}>
                    <form action="/services/all" method="GET">
                        <div // dir means direction of text for languages (ltr = left to right)
                            dir="ltr">
                            <div className={classes.BarContainer}>
                                <label htmlFor={props.inputId} className={classes.LabelWrapper}>
                                    <span className={classes.SearchBarSpan}>Search</span>
                                    <div className={classes.InputWrapper}>
                                        <div className={classes.InputContainer}>
                                            <input
                                                onFocus={props.applyFocusWithin}
                                                onBlur={props.removeFocusWithin}
                                                onChange={(event) => props.inputChangeHandler(event)}
                                                type="text"
                                                className={classes.Input}
                                                role="combobox"
                                                aria-autocomplete="list" 
                                                aria-describedby={props.description}
                                                aria-controls={props.listId}
                                                aria-expanded="false" 
                                                autoComplete="off" 
                                                autoCorrect="off" 
                                                spellCheck="false" 
                                                id={props.inputId}
                                                name={props.name}
                                                placeholder={props.placeholder}
                                                value={props.value}  />
                                        </div>
                                    </div>
                                    <button className={classes.QuestionMark}>
                                        {/* REPLACE TO AVOID COPYRIGHT */}
                                        <svg
                                            viewBox="0 0 16 16" 
                                            role="presentation" 
                                            aria-hidden="true" 
                                            focusable="false" 
                                            style={{height: '18px',width: '18px',display: 'block',fill: 'currentColor'}}>
                                            <path d="m2.5 7c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5m13.1 6.9-2.8-2.9c.7-1.1 1.2-2.5 1.2-4 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.5 0 2.9-.5 4-1.2l2.9 2.8c.2.3.5.4.9.4.3 0 .6-.1.8-.4.5-.5.5-1.2 0-1.7"></path>
                                        </svg>
                                    </button>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default searchBar;