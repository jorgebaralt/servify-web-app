import React, { Component } from 'react'
// CSS
import classes from './SidePanel.module.css'
// JSX
import Filter from '../../../components/Help/SidePanel/Filter/Filter';
import SearchBar from '../../../components/Help/SidePanel/SearchBar/SearchBar';
import List from '../../../components/Help/SidePanel/List/List';
import ListItem from '../../../components/Help/SidePanel/ListItem/ListItem';
import { Toggle, MenuToggle } from '../../../components/Help/SidePanel/Toggle/Toggle';

class SidePanel extends Component {
    constructor (props) {
        super(props);
        // Construction of lists object for the logic of the lists open/close status
        this.myLists = {}
        Object.keys(this.props.categories).forEach(key => {
            this.myLists[key] = {
                bIsOpen: false
            };
        });
        this.state = {
            filter: {
                searchBar: {
                    inputId: 'Filter_SearchBar_Input',
                    description: 'Filter_SearchBar_Description',
                    listId: 'Filter_SearchBar_List',
                    name: 'help_filter_query',
                    placeholder: 'Search',
                    value: '',
                    bIsFocused: false
                }
            },
            categories: this.props.categories,
            lists: this.myLists,
            bIsOpen: false
        }
    }

    toggleSidePanel = () => {
        this.setState( (prevState) => {
            return {
                bIsOpen: !prevState.bIsOpen
            }
        });
    }

    applyFocusWithin () {
        this.setState( (prevState) => {
            return {
                filter: {
                    ...prevState.filter,
                    searchBar: {
                        ...prevState.filter.searchBar,
                        bIsFocused: true
                    }
                }
            }
        });
    }

    removeFocusWithin () {
        this.setState( (prevState) => {
            return {
                filter: {
                    ...prevState.filter,
                    searchBar: {
                        ...prevState.filter.searchBar,
                        bIsFocused: false
                    }
                }
            }
        });
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        // Updates value input
        const updatedSearchBar = {
            ...this.state.filter.searchBar,
            value: e.target.value
        };
        const categories = Object.assign(this.props.categories);
        const filteredCategories = {}; // Declaring filtered categories object
        // Looping through each key of the categories object
        Object.keys(categories).forEach( key => {
            // Filtered category array
            const filteredArr =  (
                Object.values(categories[key]).filter( question => {
                    // Filter bool result
                    let bIsMatch = false;
                    // Declaring the question's title and question answer to be used for filtering
                    const questionTitle = question[0].toLowerCase();
                    const questionAnswer = question[1].toLowerCase();
                    // Search word array declaration. Splits each word into an array element. We will 
                    // be looping through each word and see if the questions have these words
                    const searchWords = e.target.value.toLowerCase().split(/\s+/g)
                        .map(string => {
                            return string.trim();
                        });
                    // For loop for every word in the searchWords array
                    for (let i = 0; i < searchWords.length; i++) {
                        /**
                         * If the title of the answer of the question include the searched [i] word,
                         * bIsMatch is true, otherwise if it's not included then bIsMatch is false and
                         * the loop is broken.
                         */
                        if (questionTitle.includes(searchWords[i]) || questionAnswer.includes(searchWords[i])) {
                            bIsMatch = true;
                            continue;
                        } else {
                            bIsMatch = false;
                            break;
                        }
                    }
                    return bIsMatch;
                })
            );
            // If the array is not empty, then it will be returned into the filtered categories object. If it's empty, 
            // then it will simply not exist in the filtered object, therefore it won't be displayed in the sidepanel.
            if (filteredArr.length > 0) { filteredCategories[key] = filteredArr; }
        });
        this.setState( (prevState) => {
                return {
                    categories: filteredCategories,
                    filter: {
                        ...prevState.filter,
                        searchBar: updatedSearchBar
                    }
                }
        });
    }

    toggleListHandler = (key) => {
        this.setState( (prevState) => {
            return {
                lists: {
                    ...prevState.lists,
                    [key]: {
                        bIsClosed: !prevState.lists[key].bIsClosed
                    }
                }
            }
        });
    }

    toggleCategoryFilter = (prevState, key) => {
        window.scrollTo(0,0); // Scroll to the top of the window on click
        this.props.onToggleCategoryFilter(prevState, key);
        if (this.props.isMobile) { // Only toggle side panel upon clicking categories if on mobile
            this.toggleSidePanel();
        }
    }

    setRatingFilter = (rating) => {
        this.setState( (prevState) => {
            return {
                prices: {
                    ...prevState.prices,
                    rating: rating
                }
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render () {
        const WrapperClasses = [classes.Wrapper];
        if (this.state.bIsOpen) {
            WrapperClasses.push(classes.Open);
        }
        const categories = (
            Object.entries(this.state.categories).map( (category) => {
                return (
                    <List key={category[0]}
                        title={category[0]}
                        onClick={() => this.toggleListHandler(category[0])}
                        bIsClosed={this.state.lists[category[0]].bIsClosed}
                        closedChildren={<span>{category[0]}</span>}>
                            {Object.values(category[1]).map( (question) => { // Mapping through questions array
                                return (
                                    <ListItem
                                        key={question[0]}
                                        title={question[0]}
                                        active={this.state.categories[category.title]} />
                                )
                            })}
                    </List>
                );
            })
        );

        return (
            <>
                <div className={WrapperClasses.join(' ')}>
                    <div className={classes.Container}>
                        <MenuToggle onClick={this.toggleSidePanel} />
                        <Filter title='What do you need help with?'>
                            <SearchBar
                                applyFocusWithin={() => this.applyFocusWithin}
                                removeFocusWithin={() => this.removeFocusWithin}
                                inputChangeHandler={this.inputChangeHandler}
                                {...this.state.filter.searchBar}/>
                        </Filter>
                        {categories}
                    </div>
                </div>
                <Toggle show={!this.state.bIsOpen} onClick={this.toggleSidePanel} />
            </>
        );
    }
}

export default SidePanel;