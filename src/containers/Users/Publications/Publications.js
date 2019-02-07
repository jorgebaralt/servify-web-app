import React, { Component } from 'react';
// Logic
import axios from '../../../axios-services';
import { connect } from 'react-redux';
// CSS
import classes from './Publications.module.css';
// JSX
import LoadingBounce from '../../../components/UI/LoadingBounce/LoadingBounce';
import Layout from '../../../hoc/Users/Layout/Layout';
import Panel from '../../../components/UI/Panel/Panel';
import ReadyToGrow from '../../../components/Publish/ReadyToGrow/ReadyToGrow';
import Publication from '../../../components/Users/Publications/Publication/Publication';
import Separator from '../../../components/UI/Separator/Separator';

class Publications extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading: true,
            error: false,
            bHasPublications: null,
            services: null
        };
    }

    componentDidMount() {
        axios.get('/services', { params: { uid: this.props.userDetails.uid } })
            .then( response => {
                const data = response.data;
                if (!data.length) {
                    return this.setState({
                        loading: false,
                        bHasPublications: false,
                    });
                }
                this.setState({
                    loading: false,
                    bHasPublications: true,
                    services: data
                });
            })
            .catch( () => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    render () {
        let publications;
        switch (true) {
            case this.state.loading: 
                publications = <LoadingBounce />;
                break;
            case this.state.bHasPublications:
                publications = (
                    <div className={classes.Container}>
                        <div className={classes.Title}>
                            <h1>Publications</h1> 
                            <span className={classes.Amount}>({this.state.services ? Object.keys(this.state.services).length : null})</span>
                        </div>
                        <div className={classes.Grid}>
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
                        </div>
                    </div>
                );
                break;
            case !this.state.bHasPublications: 
                publications = (
                    <div className={classes.Container}>
                        <div className={classes.Title}>
                            We noticed you haven't published any services yet.<br/>
                            If you want to publish your services here on <strong>Servify</strong>, click the button below!
                        </div>
                        <ReadyToGrow/>
                    </div>
                );
                break;
            default:
                // do nothing
        }
        return (
            <Layout>
                <Panel header='Your Publications'>
                    {publications}
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