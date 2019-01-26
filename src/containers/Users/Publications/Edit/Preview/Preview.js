import React from 'react';
// Parsing servify images array and logistic
import { setImagesArray } from '../../../../../shared/imagesHandler';
// CSS
import classes from '../../../../Services/ServicesId/ServicesId.module.css';
// JSX
import Title from '../../../../../components/Services/Title/Title';
import Gallery from '../../../../../components/Services/Gallery/Gallery';
import InfoPoint from '../../../../../components/Services/InfoPoint/InfoPoint';
import InfoSection from '../../../../../components/Services/InfoSection/InfoSection';
import SocialButtons from '../../../../../components/Services/SocialButtons/SocialButtons';
import PhotosCarousel from '../../../../../components/UI/PhotosCarousel/PhotosCarousel';
import Map from '../../../../../components/UI/Map/Map';
import Separator from '../../../../../components/UI/Separator/Separator';
import SVG from '../../../../../components/SVG/SVG';

// Default Image URL if the fetched service has no URLs
const defaultImage = 'https://storage.googleapis.com/servify-716c6.appspot.com/service_images%2F2019-01-20T22%3A51%3A58.066Z_default-service-image.png?GoogleAccessId=firebase-adminsdk-a3e7c%40servify-716c6.iam.gserviceaccount.com&Expires=95623372800&Signature=st0sONUJVHe54MOE0yY902A0gAcBCzSjxch4QbdCXJ0w2LiQgG%2FwZiv9lW6t4lV5zFhpONuNEFPOWIqC%2F1fQgI0qKX4Y1vI6nI14lx%2BYqaR%2Fg0LjIfUPeU5RSm8RJBnWIKSWVhThZT7ewez8XEg2RjIRIVllzdJht%2FRTgwzf4A%2FbsF1SsfaMFkIYH4Ee7vnNmdqOTRTwGqInjLPER9WgalWew7MXxHExGo9%2Fi%2BmIXjAxcC2%2BmTu9Pov%2BBkvfpu37miQTViUTUmE0c3jc17R%2FC816Sdmhg%2F2e8a%2FSUx9k714D5PujzvKldabGnPvwwPTO%2BtCe0yjAsbE5eehLQYEjgw%3D%3D';

const preview = (props) => {
    console.log(props)
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
                                        [defaultImage]
                                    : [defaultImage]
                                } />
                    </Gallery>
                </div>
                <div className={classes.Description}>
                    <div className={classes.Header}>
                        <div className={classes.CategoryContainer}>
                            <small className={classes.Category}>{props.category}</small>
                        </div>
                        <Title>
                            {props.title ?
                                props.title
                                : <span className={classes.Error}>Service title is missing.</span>}
                        </Title>
                    </div>
                    <SocialButtons />
                    <InfoPoint symbol={<SVG svg='location-pin' />} 
                        location={
                            props.infoPoints.state ? 
                                props.infoPoints.state 
                                : <span className={classes.Error}>State can't be empty.</span>} />
                    {props.infoPoints.website ? 
                        <InfoPoint symbol={<SVG svg='location-pin' />} website={props.infoPoints.website}/> 
                        : null}
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
                        <InfoPoint symbol={<SVG svg='location-pin' />} location={
                            props.physicalLocation ? 
                                    props.physicalLocation 
                                    : <span className={classes.Error}>Address can't be empty.</span>}/>
                    </div>
                    : null}
                <div className={classes.Description}>
                    <InfoPoint symbol={<SVG svg='location-pin' />} 
                            logistic={
                                props.logistic ? 
                                    props.logistic
                                    : <span className={classes.Error}>Must specify logistic option.</span>} />
                </div>
                <Map circle={props.bIsDelivery ? true : false} className={classes.MapWrapper} map={props.map} />
            </div>
            <Separator />
        </>
    );
}

export default preview;