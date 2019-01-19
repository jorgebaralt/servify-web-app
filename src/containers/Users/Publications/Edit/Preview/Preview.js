import React, { Component } from 'react';
// CSS
import classes from '../../../../Services/ServicesId/ServicesId.module.css';
// JSX
import Title from '../../../../../components/Services/Title/Title';
import Gallery from '../../../../../components/Services/Gallery/Gallery';
import Reviews from '../../../../../components/Services/Reviews/Reviews';
import InfoPoint from '../../../../../components/Services/InfoPoint/InfoPoint';
import InfoSection from '../../../../../components/Services/InfoSection/InfoSection';
import SocialButtons from '../../../../../components/Services/SocialButtons/SocialButtons';
import PhotosCarousel from '../../../../../components/UI/PhotosCarousel/PhotosCarousel';
import Map from '../../../../../components/UI/Map/Map';
import Separator from '../../../../../components/UI/Separator/Separator';
import SVG from '../../../../../components/SVG/SVG';

class Preview extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <>
                <div className={classes.Container}>
                    <Gallery>
                        <PhotosCarousel
                            fadeTimeout={0}
                            images={this.props.images} />
                    </Gallery>
                    <div className={classes.Description}>
                        <div className={classes.Header}>
                            <div className={classes.CategoryContainer}>
                                <small className={classes.Category}>{this.props.category}</small>
                            </div>
                            <Title>
                                {this.props.title ?
                                        this.props.title
                                        : <span className={classes.Error}>Service title is missing.</span>}
                            </Title>
                        </div>
                        <SocialButtons />
                        <InfoPoint symbol={<SVG svg='location-pin' />} 
                            location={
                                this.props.infoPoints.state ? 
                                    this.props.infoPoints.state 
                                    : <span className={classes.Error}>State can't be empty.</span>} />
                        {this.props.infoPoints.website ? 
                            <InfoPoint symbol={<SVG svg='location-pin' />} website={this.props.infoPoints.website}/> 
                            : null}
                        {this.props.infoPoints.languages ? 
                            <InfoPoint symbol={<SVG svg='chat' />} info={this.props.infoPoints.languages}/> 
                            : null}
                        <Separator />
                        {Object.values(this.props.infoSections).map( (section, index) => {
                            return (
                                <>
                                    <InfoSection
                                        key={index}
                                        title={section.title}
                                        contact={section.contact}
                                        header={section.header}>
                                        <div>
                                            <p>
                                                {section.info ?
                                                    section.info
                                                    : <span className={classes.Error}>Please provide the necessary information.</span>}
                                            </p>
                                        </div>
                                    </InfoSection>
                                    <Separator />
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.MapContainer}>
                    <Title>Service Address</Title>
                    <div className={classes.Description}>
                        <InfoPoint symbol={<SVG svg='location-pin' />} 
                                location={
                                    this.props.address ? 
                                        this.props.address 
                                        : <span className={classes.Error}>Address can't be empty.</span>} 
                        />
                    </div>
                    <Map className={classes.MapWrapper} map={this.props.map} />
                </div>
                <Separator />
                <Reviews ratings={this.props.rating} />
            </>
        );
    }
}

export default Preview;