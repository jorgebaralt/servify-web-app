import React, { Component, } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../axios-services';
import { connect } from 'react-redux';
// CSS
import classes from './Publications.module.css';
// JSX
import Modal from 'react-png-modal';
import LoadingBounce from '../../../components/UI/LoadingBounce/LoadingBounce';
import Layout from '../../../hoc/Users/Layout/Layout';
import Panel from '../../../components/UI/Panel/Panel';
import ReadyToGrow from '../../../components/Publish/ReadyToGrow/ReadyToGrow';
import Publication from '../../../components/Users/Publications/Publication/Publication';
import Separator from '../../../components/UI/Separator/Separator';
import Button from '../../../components/UI/Button/Button';
import LoadingDots from '../../../components/UI/LoadingDots/LoadingDots';

class Publications extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading: true,
            error: false,
            bHasPublications: null,
            services: null,
            // Delete and modal state variables
            deletedService: {},
            bIsModalHidden: true,
            bIsDeleting: false,
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
                    services: Object.values(data)
                });
            })
            .catch( () => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    onDeleteInit = (service) => {
        this.setState(prevState => {
            return {
                bIsModalHidden: !prevState.bIsModalHidden,
                deletedService: service
            }
        });
    }

    closeModal = () => {
        this.setState({
            bIsModalHidden: true,
            deletedService: {}
        })
    }

    onDeleteHandler = () => {
        const deletedService = this.state.deletedService;
        this.setState({
            bIsDeleting: true
        });
        axios.delete('/service', { data: { deletedService: deletedService } })
            .then(_ => {
                this.setState((prevState) => {
                    return {
                        services: prevState.services.filter(service => deletedService.id !== service.id),
                        bIsModalHidden: true,
                        bIsDeleting: false,
                        deletedService: {}
                    }
                });
                toast.success('Services deleted successfully.');
            })
            .catch(_ => {
                this.setState({
                    bIsModalHidden: true,
                    bIsDeleting: false,
                    deletedService: {}
                })
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
                            {this.state.services.map( (service, index) => {
                                return (
                                    <div key={index} className={classes.Service}>
                                        <Publication
                                            header={service.header}
                                            title={service.title}
                                            category={service.category}
                                            href={service.id}
                                            priceRating={service.priceRating}
                                            ratingAvg={service.ratingAvg}
                                            ratingAmount={service.ratingAmount}
                                            image={service.imagesInfo}
                                            // Passing the required service data
                                            onDelete={() => this.onDeleteInit({ id: service.id, category: service.category })} />
                                    </div>
                                );
                            })}
                        </div>
                        <Modal
                            closeModal={this.closeModal}
                            show={!this.state.bIsModalHidden}>
                            <div className={classes.Modal}>
                                <div className={classes.Confirm}>
                                    Confirm
                                </div>
                                <Separator />
                                <div className={classes.Prompt}>
                                    Are you sure that you want to delete this service?
                                </div>
                                <Button style={{height: '50px'}} disabled={this.state.bIsDeleting} clicked={this.onDeleteHandler} blockButton type='danger'>
                                    {/* If deleting, will display animation. */}
                                    {this.state.bIsDeleting ? <LoadingDots /> : 'Proceed'}
                                </Button>
                            </div>
                        </Modal>
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