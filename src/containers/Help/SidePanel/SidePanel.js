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
        this.setState( (prevState) => {
                return {
                    // categories: filteredCategories,
                    filter: {
                        ...prevState.filter,
                        searchBar: updatedSearchBar
                    }
                }
        });
        this.props.filterCategories(e.target.value);
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
            Object.entries(this.props.categories).map( (category) => {
                const categoryKey = category[0];
                const categoryObj = category[1];
                return (
                    <List key={categoryKey}
                        title={categoryKey}
                        onClick={() => this.toggleListHandler(categoryKey)}
                        bIsClosed={this.state.lists[categoryKey].bIsClosed}
                        closedChildren={<span>{categoryKey}</span>}>
                            {Object.entries(categoryObj).map( (question) => { // Mapping through questions array
                                const questionKey = question[0];
                                const questionTitle = question[1][0];
                                return (
                                    <ListItem
                                        key={questionKey}
                                        title={questionTitle}
                                        onClick={() => this.props.toggleAnswer(categoryKey, questionKey)}
                                        active={this.props.categories[categoryKey][questionKey] ? 
                                            this.props.categories[categoryKey][questionKey].bIsOpen : null} />
                                );
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