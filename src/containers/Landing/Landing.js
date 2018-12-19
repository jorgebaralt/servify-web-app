import React, { Component } from 'react';
import axios from 'axios';
import categories from '../../shared/categories';
// Redux
import { connect } from 'react-redux';
// CSS
import classes from './Landing.module.css';
// Images
import placeholderHeader from '../../assets/images/placeholder-header.jpg'
// SVG
import SVG from '../../components/SVG/SVG';
// JSX
import { Link } from 'react-router-dom';
import HeaderImage from '../../components/UI/HeaderImage/HeaderImage';
import Carousel from '../../components/UI/Carousel/Carousel';
import SearchBox from '../../components/UI/SearchBox/SearchBox';
import Banner from '../../components/UI/Banner/Banner';
import CardContainer from '../../components/Landing/CardContainer/CardContainer';
import Card from '../../components/Landing/Card/Card';
import Service from '../../components/Services/Service/Service';
import Featured from '../../components/Services/Featured/Featured';
import AnchorLink from '../../components/UI/AnchorLink/AnchorLink';
import LearnMore from '../../components/Landing/LearnMore/LearnMore';

class Landing extends Component {

    state = {
        city: null,
        state: null,
    }

    savePosition = (position) => {
        const city = position.data.city;
        const state = position.data.region;
        this.setState( () => {
                return {
                    city,
                    state
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

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        // Array that holds the JSX option elements containing the category titles for a datalist
        const categoriesDatalist = categories.map( (category, index) => {
            return <option value={category.title} key={index} />
        });
        // Array that holds the JSX list elements containing the category titles for an unordered list
        const categoriesList = categories.map( (category) => {
            return (
                <li className={classes.Category} key={category.title}>
                    <Link to="/services">
                        {/* Category.icon pointer protection */}
                        {category.icon ? <category.icon /> : null}{category.title}&nbsp;<SVG svg='right-arrow' />
                    </Link>
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
                    <div className={classes.HeaderContent}>
                        { !this.props.mobile ? <SearchBox.widescreen categoriesDatalist={categoriesDatalist} /> : null }
                        {/* TODO Get custom logo */}
                        <h1>Servify</h1>
                    </div>
                </div>
                {/* TODO improve banner */}
                {/* <Banner /> */}
                {/* Page Content */}
                <div className={classes.Container}>
                    { this.props.isMobile ? 
                        <>
                            <SearchBox.mobile categoriesDatalist={categoriesDatalist} />
                            <br />
                        </> : null }
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
                                priceRating='0.05'
                                ratingAvg={0.97}
                                ratingAmount='1293'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.66'
                                ratingAvg={0.52}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.23'
                                ratingAvg={0.31}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.88'
                                ratingAvg={0.65}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.35'
                                ratingAvg={0.17}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.57'
                                ratingAvg={0.17}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.75'
                                ratingAvg={0.17}
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
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                            <Featured image='https://a0.muscache.com/4ea/air/v2/pictures/a728b050-9512-48a7-ab9c-858e9b291cc0.jpg?t=r:w654-h400-sfit,e:fjpg-c90'/>
                        </Carousel>
                        <div>
                            <AnchorLink text='Show more Servify featured services' href='/services/featured' />
                        </div>
                    </div>
                    <br />
                    <h1>New services near {this.state.city && this.state.state ? `${this.state.city},  ${this.state.state}` : 'you'}</h1>
                    <div>
                        <Carousel>
                            {/* PLACEHOLDERS */}
                            <Service
                                header='Home Services'
                                title='A Random Service'
                                priceRating='0.05'
                                ratingAvg={0.97}
                                ratingAmount='1293'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.66'
                                ratingAvg={0.52}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.23'
                                ratingAvg={0.31}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                            <Service
                                header='Plumbing'
                                title='A Toilet'
                                priceRating='0.23'
                                ratingAvg={0.31}
                                ratingAmount='1537'
                                image='https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'/>
                        </Carousel>
                    </div>
                    <LearnMore 
                        city={this.state.city}
                        state={this.state.state} />
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

const mapStateToProps = (state) => {
	return {
		isMobile: state.mobileReducer.isMobile,
	};
};

export default connect(mapStateToProps)(Landing);