import React, {Component} from 'react';
import categories from '../../shared/categories';
// CSS
import classes from './Landing.module.css';
// Images
import placeholderHeader from '../../assets/images/placeholder-header.jpg'
// SVG
import SVG from '../../components/SVG/SVG';
// JSX
import HeaderImage from '../../components/UI/HeaderImage/HeaderImage';
import Button from '../../components/UI/Button/Button';

class Landing extends Component {

    render() {
        // Array that holds the JSX option elements containing the category titles for a datalist
        const categoriesDatalist = categories.map( (category, index) => {
            return <option value={category.title} key={index} />
        });
        // Array that holds the JSX list elements containing the category titles for an unordered list
        const categoriesList = categories.map( (category) => {
            return (
                <li className={classes.Category} key={category.title}>
                    <a href="/">
                        {/* Category.icon pointer protection */}
                        {category.icon ? <category.icon/> : null}{category.title}&nbsp;<SVG svg='right-arrow' />
                    </a>
                </li>
            );
        });
        return (
            <>
                {/* Header */}
                <div className={classes.Header}>
                    <ul className={classes.Background}>
                        <HeaderImage src={placeholderHeader} />
                    </ul>
                    {/* Header Content */}
                    <div className={classes.HeaderContent}>
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
                        {/* TODO Get custom logo */}
                        <h1>Servify</h1>
                    </div>
                </div>
                {/* Banner */}
                <section className={classes.Banner}>
                    <div>
                        <div className={classes.BannerPoint}><SVG height='36' svg='checkmark' />&nbsp;<strong>FREE</strong>&nbsp;Service Hosting</div>
                        <div className={classes.BannerPoint}><SVG height='36' svg='checkmark' />&nbsp;<strong>The Best</strong>&nbsp;Service Provider</div>
                        <div className={classes.BannerArrow}>&nbsp;</div>
                    </div>
                </section>
                {/* Page Content */}
                {/* TODO: Show a new search-bar, Fixed top  */}
                <div className={classes.Container}>
                    <h1>Top Categories</h1>
                    <hr/>
                    <ul className={classes.Categories}>
                        {categoriesList}
                    </ul>
                </div>
            </>
        );
    }
}

export default Landing;