import React, { useEffect } from 'react';
import categories from '../../shared/categories';
// Redux & Saga
import { connect } from 'react-redux';
import { servicesCreator } from '../../store/actions';
// CSS
import classes from './Landing.module.css';
// Images
import headerImage from '../../assets/images/header-image-2.jpg'
// SVG
import SVG from '../../components/SVG/SVG';
// JSX
import { Link } from 'react-router-dom';
import LoadingBounce from '../../components/UI/LoadingBounce/LoadingBounce';
import HeaderImage from '../../components/UI/HeaderImage/HeaderImage';
import Carousel from '../../components/UI/Carousel/Carousel';
import SearchBox from '../../components/UI/SearchBox/SearchBox';
import CardContainer from '../../components/Landing/CardContainer/CardContainer';
import Card from '../../components/Landing/Card/Card';
import Service from '../../components/Services/Service/Service';
import LearnMore from '../../components/Landing/LearnMore/LearnMore';
import MobileBanner from '../../components/Landing/MobileBanner/MobileBanner';

const categoriesDatalist = categories.map( (category) => {
    return {
        value: category.title,
        displayValue: category.title,
    };
});

const landing = (props) => {
    // Execute props.servicesInit on mount
    useEffect(() => {
        props.servicesInit();
    }, []);

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
    // Placeholder Loader
    let topCategories = (
        <CardContainer>
            <Card title='' />
            <Card title='' />
            <Card title='' />
        </CardContainer>
    )
    if (props.topCategories) {
        topCategories = (
            <CardContainer>
                {props.topCategories.map( category => {
                    return (
                        <Card 
                            key={category.title}
                            title={category.title} 
                            image={category.uri}/>
                    );
                })}
            </CardContainer>
        )
    }
    let nearServices = null;
    if (props.services.nearServices) {
        if (!props.services.nearServices.length) { nearServices = null; }
        nearServices = (
            <>
                <h1>Services near {props.locationData.city && props.locationData.region ? `${props.locationData.city},  ${props.locationData.region}` : 'you'}</h1>
                <div>
                    <Carousel>
                        {props.services.nearServices.map( (service, index) => {
                            return (
                                <Service
                                    key={index}
                                    header={service.category.replace("_", " ")}
                                    title={service.title}
                                    href={service.id}
                                    priceRating={service.price/4}
                                    ratingAvg={service.rating/5}
                                    ratingAmount={service.ratingCount}
                                    image={service.imagesInfo}/>
                            );
                        } )}
                    </Carousel>
                </div>
            </>
        );
    }
    let topServices = <LoadingBounce />;
    if (props.services.topServices) {
        if (!props.services.topServices.length) { topServices = null; }
        topServices = (
            <>
                <h1>Top rated services</h1>
                <div>
                    <Carousel>
                        {props.services.topServices.map( (service, index) => {
                            return (
                                <Service
                                    key={index}
                                    header={service.category.replace("_", " ")}
                                    title={service.title}
                                    priceRating={service.price/4}
                                    href={service.id}
                                    ratingAvg={service.rating/5}
                                    ratingAmount={service.ratingCount}
                                    image={service.imagesInfo}/>
                            );
                        } )}
                    </Carousel>
                </div>
            </>
        );
    }
    let topServicesByCategories = null;
    if (props.services.byCategories) { 
        topServicesByCategories = (
            Object.entries(props.services.byCategories).map( (category, index) => {
                if (!category[1].length) { return null; }
                return (
                    <div key={index}>
                        <h1>
                            Top services from: {category[0]}
                        </h1>
                        <Carousel>
                            {Object.values(category[1]).map( (service, index) => {
                                return (
                                    <Service
                                        key={[index, service.title].join('_')}
                                        header={service.category.replace("_", " ")}
                                        title={service.title}
                                        href={service.id}
                                        priceRating={service.price/4}
                                        ratingAvg={service.rating/5}
                                        ratingAmount={service.ratingCount}
                                        image={service.imagesInfo}/>
                                );
                            })}
                        </Carousel>
                    </div>
                );
            })
        );
    }
    return (
        <>
            {/* Header */}
            <div className={classes.Header}>
                <ul className={classes.Background}>
                    <HeaderImage src={headerImage} />
                </ul>
                <div className={classes.HeaderContent}>
                    <SearchBox.widescreen categoriesDatalist={categoriesDatalist} />
                    {/* TODO Get custom logo */}
                    <h1>Servify</h1>
                </div>
            </div>
            {/* Page Content */}
            <div draggable="false" className={classes.Container}>
                <SearchBox.mobile categoriesDatalist={categoriesDatalist} />
                <h1 style={{marginBottom: 20}}>Top Categories</h1>
                {topCategories}
                <br />
                {nearServices}
                {topServices}
                <br />
                <div className={classes.LearnMore}>
                    <MobileBanner />
                </div>
                {topServicesByCategories}
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
                        city={props.locationData.city}
                        state={props.locationData.region} />
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

const mapStateToProps = (state) => {
	return {
        locationData: state.usersReducer.locationData,
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

export default connect(mapStateToProps, mapDispatchToProps)(landing);