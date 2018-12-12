import React, { Component } from 'react';
// CSS
import classes from './SearchBar.module.css'
// JSX
import { NavLink } from 'react-router-dom';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.mySearchBar = React.createRef();
        this.myList = React.createRef();
    }

    state = {
        bIsFocused: false,
        myList: {
            width: null,
            top: null,
            right: null
        },
        searchBar: {
            inputId: 'SearchBar_Input',
            description: 'SearchBar_Description',
            listId: 'SearchBar_List',
            value: ''
        }
    }

    applyFocusWithin () {
        this.setState(() => {
            return { bIsFocused: true }
        });
    }

    removeFocusWithin () {
        this.setState(() => {
            return { bIsFocused: false }
        });
    }

    setListDimensions () {
        this.setState( () => {
            return { 
                myList: {
                    width: this.mySearchBar.current.offsetWidth,
                    top: this.mySearchBar.current.offsetHeight + this.mySearchBar.current.offsetTop,
                    right: document.body.getBoundingClientRect().right - this.mySearchBar.current.getBoundingClientRect().right,
                } 
            }
        });
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const updatedSearchBar = {
            ...this.state.searchBar,
            value: event.target.value
        };
        this.setState({
            searchBar: updatedSearchBar
        });
    }

    componentDidMount () {
        this.setListDimensions();
        // adding event listener
        window.onresize = () => {
            this.setListDimensions()
        };
        
    }

    componentWillUnmount () {
        // removing event listener
        window.onresize = () => {
            return;
        };
    }

    render () {
        const searchBarContainerClasses = [classes.SearchBarContainer];
        const ListClasses = [classes.List];
        const RecentSearchesWrapperClasses = [classes.RecentSearchesWrapper];
        if (this.state.bIsFocused) {
            searchBarContainerClasses.push(classes.FocusWithin);
            ListClasses.push(classes.Show);
            RecentSearchesWrapperClasses.push(classes.Show);
        }
        return (
            <>
                <div className={classes.SearchBarAnchor}>
                    <div ref={this.mySearchBar}
                        className={classes.SearchBarWrapper}>
                        <div className={searchBarContainerClasses.join(' ')}>
                            <div className={classes.Bar}>
                                <form action="/services/all" method="GET">
                                    <div 
                                        // dir means direction of text for languages (ltr = left to right)
                                        dir="ltr">
                                        <div className={classes.WidescreenContainer}>
                                            <label htmlFor={this.state.searchBar.inputId} className={classes.LabelWrapper}>
                                                <span className={classes.SearchBarSpan}>Search</span>
                                                <div className={classes.QuestionMark}>
                                                    <svg
                                                        viewBox="0 0 16 16" 
                                                        role="presentation" 
                                                        aria-hidden="true" 
                                                        focusable="false" 
                                                        style={{height: '18px',width: '18px',display: 'block',fill: 'currentColor'}}>
                                                        <path d="m2.5 7c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5m13.1 6.9-2.8-2.9c.7-1.1 1.2-2.5 1.2-4 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.5 0 2.9-.5 4-1.2l2.9 2.8c.2.3.5.4.9.4.3 0 .6-.1.8-.4.5-.5.5-1.2 0-1.7"></path>
                                                    </svg>
                                                </div>
                                                <div className={classes.InputWrapper}>
                                                    <div className={classes.InputContainer}>
                                                        <input
                                                            onFocus={() => this.applyFocusWithin()}
                                                            onBlur={() => this.removeFocusWithin()}
                                                            onChange={(event) => this.inputChangeHandler(event)}
                                                            type="text" 
                                                            className={classes.Input}
                                                            role="combobox"
                                                            aria-autocomplete="list" 
                                                            aria-describedby={this.state.searchBar.description}
                                                            aria-controls={this.state.searchBar.listId}
                                                            aria-expanded="false" 
                                                            autoComplete="off" 
                                                            autoCorrect="off" 
                                                            spellCheck="false" 
                                                            id={this.state.searchBar.inputId} 
                                                            name="services_query" 
                                                            placeholder="Search" 
                                                            value={this.state.searchBar.value}  />
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={classes.Cancel}>
                                <button className={classes.CancelButton} type="button" aria-busy="false">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul ref={this.myList}
                    id={this.state.searchBar.listId}
                    role="listbox" 
                    style={{
                        width: this.state.myList.width,
                        top: this.state.myList.top, 
                        right: this.state.myList.right
                    }}
                    className={ListClasses.join(' ')}>
                    <div className={RecentSearchesWrapperClasses.join(' ')}>
                        <li className={classes.RecentSearchesContainer}>
                            <div className={classes.RecentSearches}>
                                <small>
                                    <span>Search Results</span>
                                </small>
                            </div>
                            <ul className={classes.SearchResultsWrapper}>
                                {/* PLACEHOLDERS */}
                                <NavLink 
                                to='/'
                                /**
                                * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
                                * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
                                * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
                                * or any other hack.
                                 */
                                onMouseDown={event => event.preventDefault()}>
                                    <li aria-selected="false" 
                                        id="Result__option__option-0" 
                                        role="option" 
                                        className={classes.ResultWrapper}>
                                            <div className={classes.PinWrapper}>
                                                <span className={classes.Pin} role='img' aria-label='service' aria-hidden="true">&#x2699;</span>
                                            </div>
                                            <div className={classes.ResultContainer}>
                                                <div className={classes.ResultService}>Service</div>
                                                <div className={classes.ResultLocation}>Location</div>
                                            </div>
                                    </li>
                                </NavLink>
                                <NavLink to='/'>
                                <li aria-selected="false" 
                                    id="Result__option__option-1" 
                                    role="option" 
                                    tabIndex="-1" 
                                    className={classes.ResultWrapper}>
                                    <div className={classes.PinWrapper}>
                                        <span className={classes.Pin} role='img' aria-label='service' aria-hidden="true">&#x2699;</span>
                                    </div>
                                    <div className={classes.ResultContainer}>
                                        <div className={classes.ResultService}>Service</div>
                                        <div className={classes.ResultLocation}>Location</div>
                                    </div>
                                </li>
                                </NavLink>
                                <NavLink to='/'>
                                <li aria-selected="false" 
                                    id="Result__option-2" 
                                    role="option" 
                                    tabIndex="-1" 
                                    className={classes.ResultWrapper}>
                                    <div className={classes.PinWrapper}>
                                        <span className={classes.Pin} role='img' aria-label='service' aria-hidden="true">&#x2699;</span>
                                    </div>
                                    <div className={classes.ResultContainer}>
                                        <div className={classes.ResultService}>Service</div>
                                        <div className={classes.ResultLocation}>Location</div>
                                    </div>
                                </li>
                                </NavLink>
                            </ul>
                        </li>
                    </div>
                </ul>
            </>
        );
    };
}

export default SearchBar;