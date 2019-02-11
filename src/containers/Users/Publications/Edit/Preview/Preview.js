import React from 'react';
// Worker functions
import defaultImage from '../../../../../shared/defaultServiceImage';
import { setImagesArray } from '../../../../../shared/imagesHandler';
// CSS
import classes from '../../../../Services/ServicesId/ServicesId.module.css';
// JSX
import Title from '../../../../../components/Services/Title/Title';
import Gallery from '../../../../../components/Services/Gallery/Gallery';
import InfoPoint from '../../../../../components/Services/InfoPoint/InfoPoint';
import InfoSection from '../../../../../components/Services/InfoSection/InfoSection';
import PhotosCarousel from '../../../../../components/UI/PhotosCarousel/PhotosCarousel';
import Map from '../../../../../components/UI/Map/Map';
import Separator from '../../../../../components/UI/Separator/Separator';

const preview = (props) => {
    if (!props.service) { return null; } // Preventing error crashing
    return (
        <>
            <div className={classes.Container}>
                <div className={classes.Gallery}>
                    <Gallery>
                        <PhotosCarousel
                            // Null pointers handler.
                            images={
                                props.imagesInfo ? 
                                    props.images.length > 0 ? 
                                        setImagesArray(props.images) : 
                                        [defaultImage(props.service.category ? props.service.category.replace(' ', '_') : null)]
                                    : [defaultImage(props.service.category ? props.service.category.replace(' ', '_') : null)]
                                } />
                    </Gallery>
                </div>
                <div className={classes.Description}>
                    <div className={classes.Header}>
                        <div className={classes.CategoryContainer}>
                            <small className={classes.Category}>{props.service.category}</small>
                        </div>
                        <Title>
                            {props.title ?
                                props.title
                                : <span className={classes.Error}>Service title is missing.</span>}
                        </Title>
                    </div>
                    <InfoPoint 
                        location={
                            props.infoPoints.state ? 
                                props.infoPoints.state 
                                : <span className={classes.Error}>State can't be empty.</span>} />
                    <InfoPoint 
                            logistic={
                                props.logistic ? 
                                    props.logistic
                                    : <span className={classes.Error}>Must specify logistic option.</span>} />
                    {props.infoPoints.website ? <InfoPoint website={props.infoPoints.website}/> : null}
                    {/* {props.infoPoints.languages ? 
                        <InfoPoint symbol={<SVG svg='chat' />} info={props.infoPoints.languages}/> 
                        : null} */}
                    <Separator />
                    <InfoSection
                        title={props.infoSections.service.title}
                        contact={props.infoSections.service.contact}
                        header={props.infoSections.service.header}>
                        <div>
                            <p>
                                {props.infoSections.service.info ?
                                    props.infoSections.service.info
                                    : <span className={classes.Error}>Please provide the necessary information.</span>}
                            </p>
                        </div>
                    </InfoSection>
                    {props.infoSections.provider.title || props.infoSections.provider.info ? 
                        <InfoSection
                            title={props.infoSections.provider.title}
                            contact={props.infoSections.provider.contact}
                            header={props.infoSections.provider.header}>
                        <div>
                            <p>
                                {props.infoSections.provider.info ?
                                    props.infoSections.provider.info
                                    : <span className={classes.Error}>Please provide the necessary information.</span>}
                            </p>
                        </div>
                    </InfoSection>
                    : null}
                    <Separator />
                </div>
            </div>
            <div className={classes.MapContainer}>
                <Title>Service Location</Title>
                {/* Only render if there is a physical location */}
                {props.logistic !== 'delivery' ? 
                    <div className={classes.Description}>
                        <InfoPoint location={
                            props.physicalLocation ? 
                                    props.physicalLocation 
                                    : <span className={classes.Error}>Address can't be empty.</span>}/>
                    </div>
                    : null}
                <Map circle={props.isDelivery ? true : false} className={classes.MapWrapper} map={props.map} />
            </div>
            <Separator />
        </>
    );
}

export default preview;