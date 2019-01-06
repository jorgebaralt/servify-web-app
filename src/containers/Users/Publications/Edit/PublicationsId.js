import React, { Component, Suspense } from 'react';
import isString from '../../../../shared/isString';
import isObject from '../../../../shared/isObject';
// CSS
import classes from './PublicationsId.module.css';
// JSX
import { setMapboxAccessToken, defaultAddress, setInitialMapboxPosition } from '../../../../components/UI/Map/Map';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Button from '../../../../components/UI/Button/Button';
import Edit from './Edit/Edit';

const PreviewButton = (props) => <Button clicked={props.clicked} type='default'>Preview changes</Button>;
const SubmitButton = (props) => <Button disabled={props.disabled} clicked={props.clicked} type='default'>Save changes</Button>;

class PublicationsId extends Component {
    constructor (props) {
        super(props);
        // Mapbox Geocoding
        setMapboxAccessToken();
        this.mySpinner = (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );
    }
    state = {
        bIsEditing: true,
        images: [
            'https://images.unsplash.com/photo-1531817506236-027915e5b07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            'https://images.unsplash.com/photo-1516788875874-c5912cae7b43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            'https://images.unsplash.com/photo-1519781542704-957ff19eff00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1146&q=80',
            'https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=916&q=80',
        ],
        category: 'Home Service',
        title: 'Service Title',
        infoPoints: {
            state: 'Florida',
            website: 'bonpreufoods.com',
            languages: 'Services offered in English and Spanish'
        },
        infoSections: {
            service: {
                title: 'Service',
                contact: true,
                header: 'About the service',
                info: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently  with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            },
            provider: {
                title: 'Servify',
                header: 'About the provider',
                info: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently  with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            },
        },
        address: defaultAddress,
        map: {
            initialPosition: null,
            geoData: null,
            radiusInMiles: 4, // Initial value
            maxRadius: 60 // For the input slider
        },
        rating: {
            totalReviews: 3,
            avg: 5
        },
        formIsValid: true
    }

    onPreviewChangesHandler = () => {
        if (this.state.bIsEditing) {
            this.setState({
                bIsEditing: false
            });
        }
    }

    onSubmitChangesHandler = () => {
        toast.success('Your changes were submitted successfully.');
    }

    bIsEditingHandler = (bool) => {
        this.setState( {
            bIsEditing: bool
        });
    }

    setInitialPosition = (position) => {
        let address;
        if (isObject(position)) {
            address = [position.data.city, position.data.postal, position.data.region, position.data.country].join(' ');
        } else if (isString(position)) { // checks if it's a string
            address = position;
        }
        else {
            address = defaultAddress;
        }
        setInitialMapboxPosition(address, (nextMapState) => {
            this.setState( (prevState) => {
                return {
                    map: {
                        ...prevState.map,
                        ...nextMapState
                    }
                }
            })
        });
    }
    
    onRenderHandler = () => {
        if (!this.state.bIsEditing) {
            const Preview = React.lazy( () => import('./Preview/Preview'));
            const Component = () => {
                return (
                    <Suspense fallback={this.mySpinner}>
                        <Preview {...this.state} />
                    </Suspense>
                )
            }
            return <Component />;
        }
        if (!this.state.map.initialPosition) { return this.mySpinner; }
        return <Edit updateValidity={this.updateValidity} updateState={this.updateState} {...this.state} />;
    }

    updateValidity = (formIsValid) => {
        this.setState({
            formIsValid: formIsValid
        });
    }

    updateState = (newState) => {
        this.setState({...newState})
    }

    componentDidMount () {
        this.setInitialPosition(this.state.address)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    render() {
        console.log('PublicationsId.js this.state', this.state);
        let tabsClasses = [classes.TabsContainer, classes.Edit];
        if (!this.state.bIsEditing) {
            tabsClasses.push(classes.Preview);
        }
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Navbar}>
                    <div className={classes.TabsWrapper}>
                        <div className={tabsClasses.join(' ')}>
                            <div className={[classes.Tab, this.state.bIsEditing ? classes.Active : null].join(' ')}>
                                <button className={classes.Button} onClick={() => this.bIsEditingHandler(true)}>Edit</button>
                            </div>
                            <div className={[classes.Tab, !this.state.bIsEditing ? classes.Active : null].join(' ')}>
                                <button className={classes.Button} onClick={() => this.bIsEditingHandler(false)}>Preview</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Submit}>
                        {this.state.bIsEditing ?
                            <PreviewButton clicked={this.onPreviewChangesHandler} />
                            : <SubmitButton disabled={!this.state.formIsValid} clicked={this.onSubmitChangesHandler} />
                        }
                    </div>
                </div>
                <div className={classes.Container}>
                    { this.state.map ? 
                        this.onRenderHandler()
                        : null}
                </div>
            </div>
        );
    }
}

export default PublicationsId;