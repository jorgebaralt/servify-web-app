import React, { Component } from 'react'
// Categories
import categories from '../../../shared/categories';
import camelize from '../../../shared/camelize';
// redux-sagas
import { connect } from 'react-redux';
import { servicesCreator } from '../../../store/actions';
// CSS
import classes from './SidePanel.module.css'
// JSX
// import Filter from '../../../components/Services/SidePanel/Filter/Filter';
// import Input from '../../../components/UI/Input/Input';
import List from '../../../components/Services/SidePanel/List/List';
import ListItem from '../../../components/Services/SidePanel/ListItem/ListItem';
import { ClosedRatingContainer, RatingContainer } from '../../../components/Services/SidePanel/RatingContainer/RatingContainer';
import { Toggle, MenuToggle } from '../../../components/Services/SidePanel/Toggle/Toggle';

const sortDatalist = [
    {
        value: 'Rating',
        displayValue: 'Rating'
    },
    {
        value: 'Price Rating',
        displayValue: 'Price Rating'
    },
    {
        value: 'Distance',
        displayValue: 'Distance'
    },
];

class SidePanel extends Component {
    state = {
        sortBy: {
            controls: {
                category: {
                    elementType: 'select',
                    elementConfig: {
                        options: sortDatalist,
                        displayValue: sortDatalist[0].value
                    },
                    value: sortDatalist[0].value,
                    valueType: 'text',
                    style: {margin: 0}
                },
            }
        },
        categories: {
            list: {
                bIsClosed: false
            }
        },
        prices: {
            rating: this.props.priceFilter || 1, // Default value (1). 1 means show all services.
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

    inputSelectChangeHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.sortBy.controls,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState( (prevState) => {
            return {
                ...prevState,
                sortBy: {
                    controls: updatedOrderForm
                }
            }
        });
        // const key = updatedFormElement.value;
        const key = camelize(value);
        this.props.onSortServicesHandler(this.props.services, key);
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

    setPriceFilter = (rating) => {
        this.setState( (prevState) => {
            return {
                prices: {
                    ...prevState.prices,
                    rating: rating + 0.25 // To add 25% as default, meaning the minimum will be 25%, max. will be 100%.
                }
            }
        });
        if (this.props.onPriceFilter) {
            this.props.onPriceFilter(rating + 0.25);
        }
    }

    componentWillUnmount() {
        this.props.onSortServicesHandler(this.props.services, 'rating');
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
                        {/* TODO Sorting disabled until I figure out an easier way of sorting */}
                        {/* <Filter title='Sort by'>
                            <div style={{marginTop: '-18px'}}>
                                {Object.entries(this.state.sortBy.controls).map( (input) => {
                                        return (
                                            <Input 
                                                style={input[1].style}
                                                key={input[0]} 
                                                elementType={input[1].elementType} 
                                                elementConfig={input[1].elementConfig} // Referenced to state to mutate
                                                changed={(event) => this.inputSelectChangeHandler(event, input[0])}
                                                invalid={!input[1].valid}
                                                shouldValidate={input[1].validation}
                                                touched={input[1].touched}
                                                value={input[1].value} 
                                                valueType={input[1].valueType} />
                                        );
                                    })
                                }
                            </div>
                        </Filter> */}
                        <List title='Categories'
                            onClick={() => this.toggleListHandler(listKeys[1])}
                            bIsClosed={this.state.categories.list.bIsClosed}
                            closedChildren={`Home Services, Health, +${categories.length - 2} more`}>
                            {categoriesList}
                        </List>
                        <List title='Filter by price rating'
                            onClick={() => this.toggleListHandler(listKeys[2])}
                            bIsClosed={this.state.prices.list.bIsClosed}
                            closedChildren={<ClosedRatingContainer rating={this.state.prices.rating} />}>
                            <RatingContainer rating={this.state.prices.rating} onClick={this.setPriceFilter} />
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
        isMobile: state.mobileReducer.isMobile,
        services: state.servicesReducer.services
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleCategoryFilter: (prevState, key) => dispatch(servicesCreator.filteredCategoriesHandler(prevState, key)),
		onSortServicesHandler: (services, key) => dispatch(servicesCreator.sortServicesHandler(services, key))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);