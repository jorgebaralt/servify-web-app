import React, { PureComponent } from 'react';
import axios from 'axios';
// Parse location data and capitalize strings
import { parseLocationData } from '../../../../shared/parseLocationData';
import capitalize from '../../../../shared/capitalize';
// CSS
import classes from '../../Publish.module.css';
// JSX
import { toast } from 'react-toastify';
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
import ProgressRing from '../../../../components/UI/ProgressRing/ProgressRing';
import Modal from '../../../../components/UI/Modal/Modal';
import Separator from '../../../../components/UI/Separator/Separator';
import Button from '../../../../components/UI/Button/Button';
import Map from '../../../../components/UI/Map/Map';
import PreviewInformation from '../../../../components/Publish/PreviewInformation/PreviewInformation';
import { getImagesFromFiles } from '../../../../components/UI/Input/InputImage/InputImage';

class StepFive extends PureComponent {
    state = {
        data: {
            // Step 1: Category
            category: null,
            subcategory: null,
            // Step 2: Basic Information
            title: null,
            provider: null,
            website: null,
            phone: null,
            // Step 3: Details
            description: null,
            providerDescription: null,
            // Step 4: Images (Optional)
            imagesInfo: null, // This is FormData, not images
            // Step 5: Logistic
            bIsDelivery: null,
            delivery: null,
            // Step 6: Service Address
            locationData: {
                street: null,
                name: null,
                city: null,
                region: null,
                postalCode: null,
            },
            zipCode: null,
            // Step 7: The Map
            miles: null,
            physicalLocation: null,
            geolocation: null,
        },
        uploading: true,
        uploadingImages: false
    }

    // Preview images
    myPreviewImages = null;
    
    postService = async () => {
        try {
            this.setState({
                uploading: true
            });
            const serviceData = await this.state.data;
            await axios.post('/service', { updatedService: serviceData });
            this.setState({
                uploading: false
            });
        } catch (error) {
            console.log(error);
            toast.error(error);
            this.setState({
                uploading: false
            });
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.postService();
    }

    static getDerivedStateFromProps(props, state) {
        const data = props.data;
        if (!data) { return null; } // Pointer protection
        const derivedStateFromProps = {
            // Step 1: Category
            category: data['1'].data.category,
            subcategory: data['1'].data.subcategory,
            // Step 2: Basic Information
            title: data['2'].data.serviceTitle,
            provider: data['2'].data.companyName,
            website: data['2'].data.companyWebsite,
            phone: data['2'].data.contactPhone,
            // Step 3: Details
            description: data['3'].data.serviceDescription,
            providerDescription: data['3'].data.providerDescription,
            // Step 4: Images (Optional)
            imagesInfo: data['4'].data.imageFiles, // This is FormData, not images
            // Step 5: Logistic
            bIsDelivery: data['5'].data.option ? data['5'].data.option.bool : null,
            delivery: data['5'].data.option ? data['5'].data.option.display : null,
            // Step 6: Service Address
            locationData: {
                street: data['6'].data.street,
                name: data['6'].data.name,
                city: data['6'].data.city,
                region: data['6'].data.state,
                postalCode: data['6'].data.postalCode,
            },
            zipCode: data['6'].data.postalCode,
            // Step 7: The Map
            miles: data['7'].data.distance,
            physicalLocation: data['7'].data.address !== '' ? data['7'].data.address : parseLocationData(data['6'].data),
            geolocation: {
                // Geolocation provides data to a constructor that returns
                // coordinates to calculate points between services, distante 
                // to the current location of the user, fetching close services 
                // and such.
                latitude: data['7'].data.coordinates ? data['7'].data.coordinates.center[1] : null,
                longitude: data['7'].data.coordinates ? data['7'].data.coordinates.center[0] : null
            },
        }
        return {
            data: derivedStateFromProps,
            loading: state.loading
        };
    }

    parseCategories = (category) => {
        if (!category) { return null; } // Protection
        return category.split('_').map(word => {
            return ( capitalize(word) );
        }).join(' ');
    }

    render () {
        const data = this.state.data;
        const containerClasses = [classes.Container];
        if (this.props.activeStep !== this.props.stepKey) {
            containerClasses.push(classes.Hidden);
        }
        const map = {
            initialPosition: data.geolocation ? [data.geolocation.longitude, data.geolocation.latitude] : null,
            radiusInMiles: data.miles, // Initial value
            maxRadius: 60 // For the input slider
        };
        const category = this.parseCategories(data.category);
        const subcategory = this.parseCategories(data.subcategory);
        const imagesInfo = data.imagesInfo;
        if (imagesInfo) {
            const data = [];
            for (let pair of imagesInfo.entries()) {
                data.push(pair[1]);
            }
            this.myPreviewImages = getImagesFromFiles(data);
        }
        const uploading = (
            this.state.uploading ? 
            <Modal alwaysShow show={true}>
                <LoadingBounce />
            </Modal>
            : null
        );
        return (
            <div className={containerClasses.join(' ')}>
                {uploading}
                <div className={classes.FormWrapper}>
                    <div className={classes.Step}><span>S</span>tep 8: Confirm Information</div>
                    <h2>
                        You're done! All there is left if to confirm your information, you may click 
                        the submit button if everything is okay and then the service will be created 
                        in a bit.
                    </h2>
                    <form onSubmit={this.onSubmitHandler}>
                        <div style={{margin: '12px 0 21px'}}>
                            <Button blockButton type='success' submit disabled={!this.props.dataIsValid}>Submit</Button>
                        </div>
                    </form>
                    <Separator />
                    {/* Step 1: Category */}
                    <div className={classes.Step}><span>S</span>tep 1: Category</div>
                    <PreviewInformation title='Category'>{category}</PreviewInformation>
                    <PreviewInformation title='Subcategory'>{subcategory}</PreviewInformation>
                    <Separator />
                    {/* Step 2: Basic Information */}
                    <div className={classes.Step}><span>S</span>tep 2: Basic Information</div>
                    <PreviewInformation title='Service Title'>{data.title}</PreviewInformation>
                    <PreviewInformation title='Provider'>{data.provider}</PreviewInformation>
                    <PreviewInformation title='Website'>
                        <a href={data.website} 
                            className={classes.Link}
                            target='_blank'
                            rel='noopener noreferrer'>{data.title}</a>
                    </PreviewInformation>
                    <PreviewInformation title='Phone'>{data.phone}</PreviewInformation>
                    <Separator />
                    {/* Step 3: Details */}
                    <div className={classes.Step}><span>S</span>tep 3: Details</div>
                    <PreviewInformation title='About the service'>{data.description}</PreviewInformation>
                    <PreviewInformation title='About the provider'>{data.providerDescription}</PreviewInformation>
                    <Separator />
                    {/* Step 4: Images (Optional) */}
                    <div className={classes.Step}><span>S</span>tep 4: Images (Optional)</div>
                    <Separator />
                    {/* TODO images */}
                    <PreviewInformation title='Images'>
                        <div className={classes.ImagesContainer}>
                            {this.myPreviewImages ?
                                this.myPreviewImages.map((image, i) => {
                                    return (
                                        <div key={i} className={classes.Images}>
                                            <img draggable="false" src={URL.createObjectURL(image.file)} alt='' />
                                        </div>
                                    );
                                })
                                : null}
                        </div>
                    </PreviewInformation>
                    <Separator />
                    {/* Step 5: Logistic */}
                    <div className={classes.Step}><span>S</span>tep 5: Logistic</div>
                    <PreviewInformation title='Logistic'>{data.delivery}</PreviewInformation>
                    <Separator />
                    {/* Step 6: Service Address */}
                    <div className={classes.Step}><span>S</span>tep 6: Service Address</div>
                    <PreviewInformation title='Street'>{data.locationData.street}</PreviewInformation>
                    <PreviewInformation title='Street 2 (Optional)'>{data.locationData.name}</PreviewInformation>
                    <PreviewInformation title='City'>{data.locationData.city}</PreviewInformation>
                    <PreviewInformation title='State'>{data.locationData.region}</PreviewInformation>
                    <PreviewInformation title='Postal Code'>{data.locationData.postalCode}</PreviewInformation>
                    <Separator />
                    {/* Step 7: The Map */}
                    <div className={classes.Step}><span>S</span>tep 7: The Map</div>
                    {data.bIsDelivery ? 
                        <PreviewInformation title='Delivery Cover Distance'>{data.miles} miles</PreviewInformation>
                        : null}
                    <PreviewInformation title='Address'>{data.physicalLocation}</PreviewInformation>
                    {this.props.activeStep === this.props.stepKey ? 
                        <Map circle={data.bIsDelivery ? true : null} height='300px' map={map} />
                        : null}
                    <form onSubmit={this.onSubmitHandler}>
                        <div style={{margin: '12px 0 21px'}}>
                            <Button blockButton type='success' submit disabled={!this.props.dataIsValid}>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default StepFive;