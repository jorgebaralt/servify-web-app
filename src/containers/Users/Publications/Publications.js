import React, { Component } from 'react';
// Logic
import axios from '../../../axios-services';
import { connect } from 'react-redux';
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
            loading: true,
            bHasPublications: null,
            services: null
        };
    }

    componentDidMount() {
        axios.get('/getServices', { params: { email: this.props.userDetails.email } })
            .then( response => {
                console.log(response);
            })
            .catch( () => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    render () {
        let publications = null;
        if (this.state.services) {
            publications = (
                <div className={classes.Container}>
                    <div className={classes.Title}>
                        <h1>Publications</h1> 
                        <span className={classes.Amount}>({this.state.services ? Object.keys(this.state.services).length : null})</span>
                    </div>
                    <Carousel>
                        {Object.values(this.state.services).map( (service, index) => {
                            return (
                                <div key={index} className={classes.Service}>
                                    <Publication
                                        header={service.header}
                                        title={service.title}
                                        href={service.id}
                                        priceRating={service.priceRating}
                                        ratingAvg={service.ratingAvg}
                                        ratingAmount={service.ratingAmount}
                                        image={service.imagesInfo}/>
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            );
        }
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

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

export default connect(mapStateToProps)(Publications);