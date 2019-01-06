import React, { Component } from 'react';
// CSS
import classes from './Publications.module.css';
// JSX
import Layout from '../../../hoc/Users/Layout/Layout';
import Panel from '../../../components/UI/Panel/Panel';
import ReadyToGrow from '../../../components/Publish/ReadyToGrow/ReadyToGrow';
import Carousel from '../../../components/UI/Carousel/Carousel';
import Publication from '../../../components/Users/Publications/Publication/Publication';
import Separator from '../../../components/UI/Separator/Separator';

class Publications extends Component {
    constructor(props) {
        super(props);
        this.state={
            bHasPublications: true,
            services: {
                1: {
                    header: 'Plumbing',
                    title: 'A Toilet',
                    priceRating: '0.66',
                    ratingAvg: 0.52,
                    ratingAmount: '1537',
                    image: 'https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                },
                2: {
                    header: 'Plumbing',
                    title: 'A Toilet',
                    priceRating: '0.66',
                    ratingAvg: 0.52,
                    ratingAmount: '1537',
                    image: 'https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                },
                3: {
                    header: 'Plumbing',
                    title: 'A Toilet',
                    priceRating: '0.66',
                    ratingAvg: 0.52,
                    ratingAmount: '1537',
                    image: 'https://a0.muscache.com/im/pictures/18c5d39e-e98d-4d3b-a9d1-9101cd2596ed.jpg?aki_policy=large'
                },
            }
        };
    }

    render () {
        const publications = (
            <div className={classes.Container}>
                <div className={classes.Title}>
                    <h1>Publications</h1> 
                    <span className={classes.Amount}>({this.state.services ? Object.keys(this.state.services).length : null})</span>
                </div>
                <Carousel>
                    {Object.values(this.state.services).map( (service, index) => {
                        return (
                            <div className={classes.Service}>
                                <Publication
                                    header={service.header}
                                    title={service.title}
                                    priceRating={service.priceRating}
                                    ratingAvg={service.ratingAvg}
                                    ratingAmount={service.ratingAmount}
                                    image={service.image}/>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        );
        const noPublications = (
            <div className={classes.Container}>
                <div className={classes.Title}>
                    We noticed you haven't published any services yet.<br/>
                    If you want to publish your services here on <strong>Servify</strong>, click the button below!
                </div>
                <ReadyToGrow/>
            </div>
        );
        return (
            <Layout>
                <Panel header='Your Publications'>
                    {this.state.bHasPublications ?
                        publications
                        : noPublications
                    }
                </Panel>
                <Separator />
            </Layout>
        );
    }
}

export default Publications;