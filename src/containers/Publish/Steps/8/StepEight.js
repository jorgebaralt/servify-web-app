import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from '../../../../axios-services';
// workse functions
import { parseLocationData } from '../../../../shared/parseLocationData';
import { parseLogistic } from '../../../../shared/parseLogistic';
import capitalize from '../../../../shared/capitalize';
// CSS
import classes from '../../Publish.module.css';
// JSX
import Modal from 'react-png-modal';
import { toast } from 'react-toastify';
import LoadingBounce from '../../../../components/UI/LoadingBounce/LoadingBounce';
import ProgressRing, { average } from '../../../../components/UI/ProgressRing/ProgressRing';
import Separator from '../../../../components/UI/Separator/Separator';
import Button from '../../../../components/UI/Button/Button';
import Map from '../../../../components/UI/Map/Map';
import PreviewInformation from '../../../../components/Publish/PreviewInformation/PreviewInformation';
import { getImagesFromFiles } from '../../../../components/UI/Input/InputImage/InputImage';

class StepEight extends PureComponent {
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
            email: null,
            // Step 3: Details
            description: null,
            providerDescription: null,
            // Step 4: Images (Optional)
            imagesInfo: null, // This is FormData, not images
            // Step 5: Logistic
            isDelivery: null,
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
        bIsUploading: false,
        bIsUploadingImages: false
    }

    /**
     * Updates and/or sets the upload progress of a respective image.
     */
    setUploadProgress = (ref, progress) => {
        this.setState((prevState) => {
            return {
                progressRings: {
                    ...prevState.progressRings,
                    [ref]: progress
                }
            }
        });
    }

    
    /**
     * Uploads all the images simultaneously and waits till every image is uploaded 
     * or there is a reply from the server. Afterwards, if there is an on upload prop
     * passed on, execute it.
     */
    uploadImages = async (files) => {
        await this.setState({
            bIsUploadingImages: true
        });
        const headers = await {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        const imagesInfo = await [];
        await Promise.all(Object.values(this.myImages).map(async (image) => {
            const file = image.file;
            const formData= new FormData();
            formData.append('image', file, file.name);
            const response = await axios.post('/images_service', 
                formData,  
                { onUploadProgress: progressEvent => {
                    const progress = (progressEvent.loaded / progressEvent.total * 100);
                    const ref = file.name;
                    this.setUploadProgress(ref, progress);
                }, headers: headers}
            );
            if (response.status === 200) {
                await toast.success(`${file.name} has been uploaded successfully.`);
                const imageInfo = response.data;
                imagesInfo.push(imageInfo);
            } else {
                toast.error(`Something went wrong when uploading ${file.name}.`);
            }
        }));
        /**
         * If there is an onUpload prop function, execute it after uploading is done.
         */
        const data = await { imagesInfo: imagesInfo };
        await this.setState({
            bIsUploadingImages: false
        });
        return data;
    }

    // Preview images
    myImages = null;
    
    postService = async () => {
        try {
            this.setState({
                bIsUploading: true
            });
            const headers = await {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            const serviceData = await { ...this.state.data };
            // We don't want to upload FormData here yet. Images will be uploaded after service is created.
            serviceData.imagesInfo = await null;
            // let response = await axios.post('/service', { ...serviceData }, { headers: headers });
            let response = await axios({
                method: 'post',
                url: '/service',
                data: serviceData,
                headers: {
                    headers,
                },
            });
            if (response.status !== 200) { // If the response status is not 200 then return and display error message.
                this.setState({
                    bIsUploading: false
                });
                return toast.error(response.data.error);
            } else { // Otherwise, display that the service was created.
                // If there are images then display a message letting the user know the process is not over,
                // otherwise display the response message.
                if (this.state.data.imagesInfo) {
                    toast.success('Your service was created successfully, your images will begin uploading now.');
                } else {
                    toast.success(response.data.message);
                }
            }
            const service = await response.data.service;
            // If there are images to be uploaded, the updatedService variable will contain 
            // an object key named imagesInfo containing an array of URLs to the images.
            if (this.state.data.imagesInfo) {
                const updatedService = await this.uploadImages(this.state.data.imagesInfo);
                response = await axios.put('/service', { serviceId: service.id, updatedService: updatedService });
                await this.props.history.push(['/services', service.id].join('/'));
            } else {
                await this.setState({
                    bIsUploading: false
                });
            }
            await this.props.history.push(['/services', service.id].join('/'));
        } catch (error) {
            await toast.error(!error.response.data.error ? 'Something went wrong.' : error.response.data.error);
            await this.setState({
                bIsUploading: false
            });
        }
    }

    onSubmitHandler = (event) => {
        window.scrollTo(0,0); // Scrolls to the top upon submitting.
        event.preventDefault();
        this.postService();
    }

    static getDerivedStateFromProps(props, state) {
        const data = props.data;
        if (!data) { return null; } // Pointer protection
        const userId = props.userDetails.uid;   
        const derivedStateFromProps = {
            // Step 1: Category
            category: data['1'].data.category,
            subcategory: data['1'].data.subcategory,
            // Step 2: Basic Information
            title: data['2'].data.serviceTitle,
            provider: data['2'].data.companyName,
            website: data['2'].data.companyWebsite,
            phone: data['2'].data.contactPhone,
            email: data['2'].data.contactEmail,
            // Step 3: Details
            description: data['3'].data.serviceDescription,
            providerDescription: data['3'].data.providerDescription,
            // Step 4: Images (Optional)
            imagesInfo: data['4'].data.imageFiles, // This is FormData, not images
            // Step 5: Logistic
            isDelivery: data['5'].data.option ? data['5'].data.option.bool : null,
            logistic: data['5'].data.option ? data['5'].data.option.display : null,
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
            physicalLocation: (
                data['5'].data.option ? 
                    // If there is a phyisical store
                    data['5'].data.option.display !== 'delivery' ?
                        // Then the physical location is the address if exists, or the parsed location.
                        data['7'].data.address !== '' ? data['7'].data.address : parseLocationData(data['6'].data)
                        // If no deliveries are offered, then null
                        : null
                    : null
            ),
            geolocation: {
                // Geolocation provides data to a constructor that returns
                // coordinates to calculate points between services, distante 
                // to the current location of the user, fetching close services 
                // and such.
                latitude: data['7'].data.coordinates ? data['7'].data.coordinates.center[1] : null,
                longitude: data['7'].data.coordinates ? data['7'].data.coordinates.center[0] : null
            },
            uid: userId // From react-redux store.
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
            this.myImages = getImagesFromFiles(data);
        }
        const uploading = (
            this.state.bIsUploading || this.state.bIsUploadingImages ? 
            <Modal alwaysShow show={true}>
                {this.state.bIsUploadingImages ?
                    <>
                        <h2>Uploading images.</h2>
                        <LoadingBounce />
                        <ProgressRing 
                            radius={36} 
                            stroke={6} 
                            progress={this.state.progressRings ? average(Object.values(this.state.progressRings)) : 0} />
                    </>
                    : <LoadingBounce />}
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
                    <PreviewInformation title='Category'>
                        <div style={{textTransform: 'uppercase'}}>{category}</div></PreviewInformation>
                    {subcategory ? 
                    <PreviewInformation title='Subcategory'>
                        <div style={{textTransform: 'uppercase'}}>{subcategory}</div></PreviewInformation> : null}
                    <Separator />
                    {/* Step 2: Basic Information */}
                    <div className={classes.Step}><span>S</span>tep 2: Basic Information</div>
                    <PreviewInformation title='Service Title'>{data.title}</PreviewInformation>
                    <PreviewInformation title='Provider'>{data.provider}</PreviewInformation>
                    <PreviewInformation title='Website'>
                        <a href={data.website} 
                            className={classes.Link}
                            target='_blank'
                            rel='noopener noreferrer'>{data.website}</a>
                    </PreviewInformation>
                    <PreviewInformation title='Contact Phone'>{data.phone}</PreviewInformation>
                    <PreviewInformation title='Contact Email'>{data.email}</PreviewInformation>
                    <Separator />
                    {/* Step 3: Details */}
                    <div className={classes.Step}><span>S</span>tep 3: Details</div>
                    <PreviewInformation title='About the service'>{data.description}</PreviewInformation>
                    <PreviewInformation title='About the provider'>{data.providerDescription}</PreviewInformation>
                    <Separator />
                    {/* Step 4: Images (Optional) */}
                    <div className={classes.Step}><span>S</span>tep 4: Images (Optional)</div>
                    <Separator />
                    <PreviewInformation title='Images'>
                        {this.myImages ?
                            <div className={classes.ImagesContainer}>
                                    {this.myImages.map((image, i) => {
                                        return (
                                            <div key={i} className={classes.Images}>
                                                <img draggable="false" src={URL.createObjectURL(image.file)} alt='' />
                                            </div>
                                        );
                                    })}
                            </div>
                            : <div>No images uploaded</div>}
                    </PreviewInformation>
                    <Separator />
                    {/* Step 5: Logistic */}
                    <div className={classes.Step}><span>S</span>tep 5: Logistic</div>
                    <PreviewInformation title='Logistic'>{parseLogistic(data.logistic)}</PreviewInformation>
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
                    {data.isDelivery ? 
                        <PreviewInformation title='Delivery Cover Distance'>{data.miles} miles</PreviewInformation>
                        : null}
                    <PreviewInformation title='Address'>{data.physicalLocation}</PreviewInformation>
                    {this.props.activeStep === this.props.stepKey ? 
                        <Map circle={data.isDelivery ? true : null} height='300px' map={map} />
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

const mapStateToProps = (state) => {
	return {
        userDetails: state.authReducer.userDetails
	};
};

export default withRouter(connect(mapStateToProps)(StepEight));