import React, { Component } from 'react'
import axios from 'axios';
import categories from '../../../shared/categories';
// CSS
import classes from './SidePanel.module.css'
// JSX
import Rating from '../../../components/UI/Rating/Rating';

// Categories object to be used for filtering
const categoriesObj = {};
categories.map( (category) => {
    return categoriesObj[category.title.replace(/[^a-zA-Z0-9]/g, '')] = false; // Parsing special characters from titles to allow only letters
});

class SidePanel extends Component {
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
                {/* Side Panel Wrapper Start */}
                <div className={classes.SidePanelWrapper}>
                    <div className={classes.SidePanelContainer}>
                        {/* Service Name Filter Start */}
                        <div className={classes.FilterWrapper}>
                            <div className={classes.FilterTitle}>
                                <span>Service</span>
                            </div>
                            <div className={classes.FilterContainer}>
                                <div className={classes.FilterInputWrapper}>
                                    {/* Search Bar Start */}
                                    <div className={[classes.SearchBarAnchor, classes.SearchBarWrapper].join(' ')}>
                                        <div className={searchBarContainerClasses.join(' ')}>
                                            <div className={classes.BarWrapper}>
                                                <form action="/services/all" method="GET">
                                                    <div 
                                                        // dir means direction of text for languages (ltr = left to right)
                                                        dir="ltr">
                                                        <div className={classes.BarContainer}>
                                                            <label htmlFor={this.state.filter.searchBar.inputId} className={classes.LabelWrapper}>
                                                                <span className={classes.SearchBarSpan}>Search</span>
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
                                                                            aria-describedby={this.state.filter.searchBar.description}
                                                                            aria-controls={this.state.filter.searchBar.listId}
                                                                            aria-expanded="false" 
                                                                            autoComplete="off" 
                                                                            autoCorrect="off" 
                                                                            spellCheck="false" 
                                                                            id={this.state.filter.searchBar.inputId}
                                                                            name="services_filter_query" 
                                                                            placeholder="Name" 
                                                                            value={this.state.filter.searchBar.value}  />
                                                                    </div>
                                                                </div>
                                                                <button className={classes.QuestionMark}>
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
                                    {/* Search Bar End */}
                                </div>
                            </div>
                        </div>
                        {/* Service Name Filter End */}
                        {/* Sort By Start */}
                        <div className={classes.FilterWrapper}>
                            <div className={classes.FilterTitle}>
                                <span>Sort by</span>
                            </div>
                            <div className={classes.SortBy}>
                                <form action="/services/all" method="GET">
                                    <select className={classes.InputSelect} 
                                        onChange={(e) => this.selectInputHandler(e)} 
                                        value={this.state.filter.sortBy}  
                                        required>
                                        <option value='distance'>Distance</option>
                                        <option value='popularity'>Popularity</option>
                                        <option value='priceRating'>Price Rating</option>
                                        <option value='newest'>Newest</option>
                                        <option value='oldest'>Oldest</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        {/* Sort By End */}
                        {/* Categories Start */}
                        <div className={classes.ListWrapper}>
                            <button className={classes.ListToggleButton} onClick={() => this.toggleListHandler(listKeys[1])}>
                                <div className={classes.ToggleButtonHeader}>
                                    <div className={classes.ToggleButtonTextContainer}>
                                        <span className={classes.ToggleButtonText}>Categories</span>
                                    </div>
                                    <div className={classes.ToggleButtonArrowWrapper}>
                                        <div className={classes.ToggleButtonArrowContainer}>
                                            <span className={toggleButtonCategoriesClasses.join(' ')} />
                                        </div>
                                    </div>
                                </div>
                                {this.state.categories.list.bIsClosed ? 
                                    <span className={classes.ClosedText}>
                                        Home Services, Health, +{categories.length - 2} more
                                    </span> :
                                    null}
                            </button>
                            {this.state.categories.list.bIsClosed ?
                                null :
                                <div className={classes.CategoriesListWrapper}>
                                    <ul className={classes.CategoriesListContainer}>
                                        {categoriesList}
                                    </ul>
                                </div>
                            }
                        </div>
                        {/* Categories End */}
                        {/* Service Price Filter Start */}
                        <div className={classes.ListWrapper}>
                            <button className={classes.ListToggleButton} onClick={() => this.toggleListHandler(listKeys[2])}>
                                <div className={classes.ToggleButtonHeader}>
                                    <div className={classes.ToggleButtonTextContainer}>
                                        <span className={classes.ToggleButtonText}>Price rating</span>
                                    </div>
                                    <div className={classes.ToggleButtonArrowWrapper}>
                                        <div className={classes.ToggleButtonArrowContainer}>
                                            <span className={toggleButtonPricesClasses.join(' ')} />
                                        </div>
                                    </div>
                                </div>
                                {this.state.prices.list.bIsClosed ? 
                                    <span className={classes.ClosedText}>
                                        <div className={classes.RatingContainer}>
                                            <div className={classes.FilterOverview}>
                                                <Rating
                                                    rating={0} 
                                                    type='price' /> 
                                                <span style={
                                                    {    
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        height: '13px',
                                                        margin: '0 5px 0 10px'
                                                    }}>-</span> {/** Separator */}
                                                <Rating 
                                                    rating={this.state.prices.rating} 
                                                    type='price' />
                                            </div>
                                        </div>
                                    </span> :
                                    null}
                            </button>
                            {this.state.prices.list.bIsClosed ?
                                null :
                                <>
                                    <div className={classes.RatingContainer}>
                                        <Rating 
                                            rating={this.state.prices.rating} 
                                            onClick={this.setRatingFilter}
                                            priceContainerClassname={ratingClasses.join(' ')} 
                                            viewBox={'0 0 500 500'} 
                                            type='price'/>
                                    </div>
                                    <div className={classes.RatingFilter}>
                                        <span>Price rating filter</span>
                                    </div>
                                </>
                            }
                        </div>
                        {/* Service Price Filter End */}
                    </div>
                </div>
                {/* Side Panel Wrapper End */}
            </div>
        )
    }
}

export default SidePanel;