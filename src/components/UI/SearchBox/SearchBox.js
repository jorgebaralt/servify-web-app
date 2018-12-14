import React from 'react';
// CSS
import classes from './SearchBox.module.css'
// JSX
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import SVG from '../../SVG/SVG';

const Container = (props) => (
    <>
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
                            {props.categoriesDatalist}
                        </datalist>
                    </label>
                </div>
            </div>
            <br />
            <Button className={classes.Button} style={{float: 'right'}} type={'primary'}>Search</Button>
        </div>
        <Link style={{textDecoration: 'none'}} to='/publish/overview'>
            <div className={classes.MakeMoneyContainer}>
                <span className={classes.MakeMoney}>
                    <SVG className={classes.Tools} svg="tools" />&nbsp;
                    <span>Make money publishing your services on Servify</span>
                    <SVG className={classes.RightArrow} svg="right-arrow" />
                </span>
            </div>
        </Link>
    </>
)

const searchBox = {
    widescreen: (props) => {
        const { categoriesDatalist } = props;
        return (
            <div className={classes.Widescreen}>
                <Container categoriesDatalist={categoriesDatalist} />
            </div>
        );
    },
    mobile: (props) => {
        const { categoriesDatalist } = props;
        return (
            <div className={classes.Mobile}>
                <Container categoriesDatalist={categoriesDatalist} />
            </div>
        );
    }
}

export default searchBox;