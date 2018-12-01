import React, {Component} from 'react';
import categories from '../../shared/categories';
// CSS
import classes from './Landing.module.css';
// Images
import placeholderHeader from '../../assets/images/placeholder-header.jpg'
// SVGs
import Tools from '../../components/SVG/Tools';
import RightArrow from '../../components/SVG/RightArrow';
// JSX
import HeaderImage from '../../components/UI/HeaderImage/HeaderImage';
import Button from '../../components/UI/Button/Button';

class Landing extends Component {

    render() {
        let categoryTitles = [];
        categories.forEach( category => {
            categoryTitles.push(category.title)
        });
        const categoriesTitles = categoryTitles.map( (category, index) => {
            return <option value={category} key={index} />
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
                                                {categoriesTitles}
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
                                        <Tools name="tools" />
                                        <span>Make money hosting your services on Servify</span>
                                        <RightArrow name="right-arrow" />
                                    </span>&nbsp;
                                </div>
                            </a>
                        </div>
                        <h1 style={{fontSize: '100px'}}>Servify</h1>
                    </div>
                </div>
                {/* Page Content */}
                {/* TODO: Show a new search-bar, Fixed top  */}
                <div style={{height: '100vh'}}>
                    <h1>Page Content</h1>
                </div>
            </>
        );
    }
}

export default Landing;