import React, { Component } from 'react';
import axios from 'axios';
import categories from '../../shared/categories';
// Redux & Saga
import { connect } from 'react-redux';
import { servicesCreator } from '../../store/actions';
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
import CardContainer from '../../components/Landing/CardContainer/CardContainer';
import Card from '../../components/Landing/Card/Card';
import Service from '../../components/Services/Service/Service';
// import Featured from '../../components/Services/Featured/Featured';
// import AnchorLink from '../../components/UI/AnchorLink/AnchorLink';
import LearnMore from '../../components/Landing/LearnMore/LearnMore';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.title,
        displayValue: category.title,
    };
});

class Landing extends Component {
    constructor(props) {
        super(props);
        props.servicesInit();
    }

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

    setCoordinates = (coordinates) => {
        this.setState({
            coordinates: coordinates
        });
    }

    componentDidMount () {
        axios.get('https://ipinfo.io/json').then(
            (response) => {
                this.savePosition(response);
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state || nextProps.children !== this.props.children;
    }

    render() {
        // Array that holds the JSX list elements containing the category titles for an unordered list
        const categoriesList = categories.map( (category) => {
            return (
                <li className={classes.Category} key={category.title}>
                    <Link to={{ 
                            pathname: '/services',
                            state: { activeCategory: category.title }
                        }}>
                        {/* Category.icon pointer protection */}
                        {category.icon ? <category.icon /> : null}{category.title}&nbsp;<SVG svg='right-arrow' />
                    </Link>
                </li>
            );
        });
        let topCategories = (
            <CardContainer>
                <Card title='' />
                <Card title='' />
                <Card title='' />
            </CardContainer>
        )
        if (this.props.topCategories) {
            topCategories = (
                <CardContainer>
                    {this.props.topCategories.map( category => {
                        return (
                            <Card 
                                key={category.title}
                                title={category.title} 
                                image='https://a0.muscache.com/im/pictures/da2d8e97-90b7-409f-94ac-5ab0327c289b.jpg?aki_policy=large'/>
                        );
                    })}
                </CardContainer>
            )
        }
        let nearServices = null;
        if (this.props.services.nearServices) {
            nearServices = (
                <>
                    <h1>New services near {this.state.city && this.state.state ? `${this.state.city},  ${this.state.state}` : 'you'}</h1>
                    <div>
                        <Carousel>
                            {this.props.services.nearServices.map( (service, index) => {
                                return (
                                    <Service
                                        key={index}
                                        header={service.category.replace("_", " ")}
                                        title={service.title}
                                        priceRating='0.05'
                                        ratingAvg={service.rating/5}
                                        ratingAmount={service.ratingCount}
                                        image={service.image}/>
                                );
                            } )}
                        </Carousel>
                    </div>
                </>
            );
        }
        let topServices = null;
        if (this.props.services.topServices) {
            topServices = (
                <>
                    <h1>Top rated services</h1>
                    <div>
                        <Carousel>
                            {this.props.services.topServices.map( (service, index) => {
                                return (
                                    <Service
                                        key={index}
                                        header={service.category.replace("_", " ")}
                                        title={service.title}
                                        priceRating='0.05'
                                        ratingAvg={service.rating/5}
                                        ratingAmount={service.ratingCount}
                                        image={service.image}/>
                                );
                            } )}
                        </Carousel>
                    </div>
                </>
            );
        }
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
                    {topCategories}
                    <br />
                    {nearServices}
                    {topServices}
                    {/* <br />
                    <div className={classes.Subheader}>
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
                        </Carousel>
                        <div>
                            <AnchorLink text='Show more Servify featured services' href='/services/featured' />
                        </div>
                    </div> */}
                    <br />
                    <div className={classes.LearnMore}>
                        <LearnMore 
                            city={this.state.city}
                            state={this.state.state} />
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

const mapStateToProps = (state) => {
	return {
        isMobile: state.mobileReducer.isMobile,
        services: state.servicesReducer.services,
        topCategories: state.servicesReducer.topCategories
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		servicesInit: () => dispatch(servicesCreator.servicesInitHandler())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);