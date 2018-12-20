import React, { Component } from 'react'
import categories from '../../../shared/categories';
// redux-sagas
import { connect } from 'react-redux';
import { servicesCreator } from '../../../store/actions';
// CSS
import classes from './SidePanel.module.css'
// JSX
import Filter from '../../../components/Services/SidePanel/Filter/Filter';
import SearchBar from '../../../components/Services/SidePanel/SearchBar/SearchBar';
import InputSelect from '../../../components/Services/SidePanel/InputSelect/InputSelect';
import List from '../../../components/Services/SidePanel/List/List';
import ListItem from '../../../components/Services/SidePanel/ListItem/ListItem';
import { ClosedRatingContainer, RatingContainer } from '../../../components/Services/SidePanel/RatingContainer/RatingContainer';
import { Toggle, MenuToggle } from '../../../components/Services/SidePanel/Toggle/Toggle';

class SidePanel extends Component {
    state = {
        filter: {
            searchBar: {
                inputId: 'Filter_SearchBar_Input',
                description: 'Filter_SearchBar_Description',
                listId: 'Filter_SearchBar_List',
                name: 'services_filter_query',
                placeholder: 'Name',
                value: '',
                bIsFocused: false
            },
            sortBy: 'distance' // Default
        },
        categories: {
            list: {
                bIsClosed: false
            }
        },
        prices: {
            rating: 1, // Default value, 1 means show all
            list: {
                bIsClosed: false
            }
        },
        location: {
            city: null,
            state: null
        },
        bIsOpen: false
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
        const updatedSearchBar = {
            ...this.state.filter.searchBar,
            value: e.target.value
        };
        this.setState( (prevState) => {
                return {
                    filter: {
                        ...prevState.filter,
                        searchBar: updatedSearchBar
                    }
                }
        });
    }

    selectInputHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        this.setState((prevState) => {
            return {
                filter: {
                    ...prevState.filter,
                    sortBy: value
                }
            }
        });
    }

    toggleListHandler = (key) => {
        this.setState( (prevState) => {
            return {
                [key]: {
                    ...prevState[key],
                    list: {
                        bIsClosed: !prevState[key].list.bIsClosed
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
        // Array that holds the JSX list elements containing the category titles for an unordered list
        const categoriesList = categories.map( (category) => {
            return (
                <ListItem
                    key={category.title}
                    active={this.props.categories[category.title]}
                    item={category}
                    onClick={ () => this.toggleCategoryFilter(this.props.categories, category.title) } />
            );
        });
        // List keys to toggle lists close status respectively
        const listKeys = Object.keys(this.state);
        const WrapperClasses = [classes.Wrapper];
        if (this.state.bIsOpen) {
            WrapperClasses.push(classes.Open);
        }
        return (
            <>
                <div className={WrapperClasses.join(' ')}>
                    <div className={classes.Container}>
                        <MenuToggle onClick={this.toggleSidePanel} />
                        <Filter title='Service'>
                            <SearchBar
                                applyFocusWithin={() => this.applyFocusWithin}
                                removeFocusWithin={() => this.removeFocusWithin}
                                inputChangeHandler={this.inputChangeHandler}
                                {...this.state.filter.searchBar}/>
                        </Filter>
                        <Filter title='Sort by'>
                            <InputSelect action='/services/all'
                                onChange={this.selectInputHandler}
                                value={this.state.filter.sortBy} />
                        </Filter>
                        <List title='Categories'
                            onClick={() => this.toggleListHandler(listKeys[1])}
                            bIsClosed={this.state.categories.list.bIsClosed}
                            closedChildren={`Home Services, Health, +${categories.length - 2} more`}>
                            {categoriesList}
                        </List>
                        <List title='Price rating'
                            onClick={() => this.toggleListHandler(listKeys[2])}
                            bIsClosed={this.state.prices.list.bIsClosed}
                            closedChildren={<ClosedRatingContainer rating={this.state.prices.rating} />}>
                            <RatingContainer rating={this.state.prices.rating} onClick={this.setRatingFilter} />
                        </List>
                    </div>
                </div>
                <Toggle show={!this.state.bIsOpen} onClick={this.toggleSidePanel} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        categories: state.servicesReducer.categories,
        isMobile: state.mobileReducer.isMobile
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleCategoryFilter: (prevState, key) => dispatch(servicesCreator.filteredCategoriesHandler(prevState, key))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);