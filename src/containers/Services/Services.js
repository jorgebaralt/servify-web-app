import React, { Component } from 'react'
import axios from 'axios';
import categories from '../../shared/categories';
// CSS
import classes from './Services.module.css'
// JSX
import ServicesContainer from './ServicesContainer/ServicesContainer';
import SidePanel from './SidePanel/SidePanel';

// Categories object to be used for filtering
const categoriesObj = {};
categories.map( (category) => {
    return categoriesObj[category.title.replace(/[^a-zA-Z0-9]/g, '')] = false; // Parsing special characters from titles to allow only letters
});

class Services extends Component {
    state = {
        filter: {
            searchBar: {
                inputId: 'Filter_SearchBar_Input',
                description: 'Filter_SearchBar_Description',
                listId: 'Filter_SearchBar_List',
                value: '',
                bIsFocused: false
            },
            sortBy: 'distance' // Default
        },
        categories: {
            ...categoriesObj,
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
        }
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

    toggleCategoryFilter = (key) => {
        this.setState( (prevState) => {
            return {
                categories: {
                    ...prevState.categories,
                    [key]: !prevState.categories[key]
                }
            }
        });
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

    savePosition = (position) => {
        const city = position.data.city;
        const state = position.data.region;
        this.setState( () => {
                return {
                    location: {
                        city,
                        state
                    }
                }
            }
        );
    }

    componentDidMount () {
        if (navigator.geolocation) {
            axios.get('http://ipinfo.io').then(
                (response) => this.savePosition(response)
            );
        }
    }

    render () {
        // Toggle button state
        const toggleButtonCategoriesClasses = [classes.ToggleButtonArrow];
        if (this.state.categories.list.bIsClosed) {
            toggleButtonCategoriesClasses.push(classes.Closed);
        }
        const toggleButtonPricesClasses = [classes.ToggleButtonArrow];
        if (this.state.prices.list.bIsClosed) {
            toggleButtonPricesClasses.push(classes.Closed);
        }
        // Array that holds the JSX list elements containing the category titles for an unordered list
        const categoriesList = categories.map( (category) => {
            const categoryListItemClasses = [classes.CategoryListItem];
            const categoryListIconClasses = [classes.CategoryListItemIcon];
            if (this.state.categories[category.title]) {
                categoryListItemClasses.push(classes.CategoryListItemActive);
                categoryListIconClasses.push(classes.CategoryListIconActive);
            }
            return (
                <li className={classes.CategoryListItemWrapper} 
                    key={category.title}>
                    <button onClick={ () => this.toggleCategoryFilter(category.title) } className={categoryListItemClasses.join(' ')}>
                        <div className={classes.CategoryListItemContainer}>
                            {category.icon ? 
                                <div className={categoryListIconClasses.join(' ')}>
                                    <category.icon />
                                </div>
                            : null}
                            <div className={classes.CategoryListItemText}>
                                {category.title}
                            </div>
                        </div>
                    </button>
                </li>
            );
        });
        const ratingClasses = [classes.Rating];
        switch (true) {
            case this.state.prices.rating >= 0.75:
                ratingClasses.push(classes.RatingActiveFour);
                break;
            case this.state.prices.rating >= 0.5:
                ratingClasses.push(classes.RatingActiveThree);
                break;
            case this.state.prices.rating >= 0.25:
                ratingClasses.push(classes.RatingActiveTwo);
                break;
            default:
                // do nothing
        }
        // Search Bar
        const searchBarContainerClasses = [classes.SearchBarContainer];
        if (this.state.filter.searchBar.bIsFocused) {
            searchBarContainerClasses.push(classes.FocusWithin);
        }
        // List keys to toggle lists close status respectively
        const listKeys = Object.keys(this.state);
        // bIsDefault bool to decide which container to load
        const bIsDefault = !Object.values(this.state.categories).includes(true);
        return (
            <div className={classes.Wrapper}>
                <div className={classes.SidePanelWrapper}>
                    {/* Side Panel */}
                    <SidePanel />
                </div>
                <div className={classes.ServicesWrapper}>
                    {/* Default and Filtered */}
                    <ServicesContainer />
                </div>
            </div>
        )
    }
}

export default Services;