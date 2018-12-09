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
import Carousel from '../../components/UI/Carousel/Carousel';
import SearchBox from '../../components/UI/SearchBox/SearchBox';
import Banner from '../../components/UI/Banner/Banner';
import CardContainer from '../../components/Landing/CardContainer/CardContainer';
import Card from '../../components/Landing/Card/Card';
import Service from '../../components/Landing/Service/Service';
import Featured from '../../components/Landing/Featured/Featured';
import AnchorLink from '../../components/UI/AnchorLink/AnchorLink';

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
                        {category.icon ? <category.icon /> : null}{category.title}&nbsp;<SVG svg='right-arrow' />
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
                        <SearchBox categoriesDatalist={categoriesDatalist} />
                        {/* TODO Get custom logo */}
                        <h1>Servify</h1>
                    </div>
                </div>
                {/* TODO improve banner */}
                {/* <Banner /> */}
                {/* Page Content */}
                {/* TODO: Show a new search-bar, Fixed top  */}
                <div className={classes.Container}>
                    <h1 style={{marginBottom: 20}}>Top Categories</h1>
                    {/* TODO category images */}
                    <CardContainer>
                        {/* PLACEHOLDER Categories */}
                        <Card title='Home Services' image='https://a0.muscache.com/im/pictures/da2d8e97-90b7-409f-94ac-5ab0327c289b.jpg?aki_policy=large'/>
                        <Card title='Plumbing' image='https://a0.muscache.com/im/pictures/da2d8e97-90b7-409f-94ac-5ab0327c289b.jpg?aki_policy=large'/>
                        <Card title='Beauty' image='https://a0.muscache.com/im/pictures/da2d8e97-90b7-409f-94ac-5ab0327c289b.jpg?aki_policy=large'/>
                    </CardContainer>
                    <br />
                    <h1>Top-rated services near you</h1>
                    <div>
                        <Carousel>
                            {/* PLACEHOLDERS */}
                            <Service
                                header='Home Services'
                                title='A Random Service'
                                price='$100.0'
                                ratingAvg='.72'
                                ratingAmount='1293'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                price='$100.0'
                                ratingAvg={0.33}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                price='$100.0'
                                ratingAvg={0.33}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                price='$100.0'
                                ratingAvg={0.33}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                        </Carousel>
                    </div>
                    <br />
                    <div className={classes.HeaderSubheader}>
                        <h1>Featured Servify services</h1>
                        <h4>Browse from our featured services that stand out for their excellence</h4>
                        <Carousel slidesToShow={3}>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                        </Carousel>
                        <div class="_ttoj70">
                            <AnchorLink text='Show more Servify featured services' href='/' />
                        </div>
                    </div>
                    <br />
                    <h1>All Categories</h1>
                    <ul className={classes.Categories}>
                        {categoriesList}
                    </ul>
                </div>
                
            </>
        );
    }
}

export default Landing;