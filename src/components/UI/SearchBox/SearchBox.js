import React from 'react';
// CSS
import classes from './SearchBox.module.css'
// JSX
import Button from '../Button/Button';
import SVG from '../../SVG/SVG';

const searchBox = (props) => {
    const { categoriesDatalist } = props;
    return (
        <div>
            <div className={classes.SearchBox}>
                <h1>What service are you looking for?</h1>
                <br />
                {/* SERVICES */}
                <small>Services</small>
                <div className={classes.InputWrapper}>
                    <div className={classes.InputContainer}>
                        <label htmlFor="services-search-bar__input" className={classes.Label}>
                            <input 
                                className={classes.Input}
                                id="services-search-bar__input"
                                role="combobox" 
                                type="text" 
                                aria-autocomplete="list" 
                                aria-expanded="false" 
                                aria-controls=""
                                autoComplete="off" 
                                autoCorrect="off" 
                                spellCheck="false" 
                                name="services-query"
                                placeholder="Anything" />
                        </label>
                    </div>
                </div>
                <br />
                {/* CATEGORIES */}
                <small>Categories</small>
                <div className={classes.InputWrapper}>
                    <div className={classes.InputContainer}>
                        <label htmlFor="services-search-bar__input" className={classes.Label}>
                            <input 
                                style={{height: '48px'}}
                                className={classes.Input}
                                id="categories-list__input"
                                list="categories-list"
                                autoComplete="off"
                                name="categories-query"
                                placeholder="Category" />
                            <datalist id="categories-list">
                                {categoriesDatalist}
                            </datalist>
                        </label>
                    </div>
                </div>
                <br />
                <Button style={{float: 'right'}} type={'primary'}>Search</Button>
            </div>
            <a style={{textDecoration: 'none'}} href='/'>
                <div className={classes.MakeMoneyContainer}>
                    <span className={classes.MakeMoney}>
                        <SVG svg="tools" />
                        <span>Make money hosting your services on Servify</span>
                        <SVG svg="right-arrow" />
                    </span>&nbsp;
                </div>
            </a>
        </div>
    );
};

export default searchBox;