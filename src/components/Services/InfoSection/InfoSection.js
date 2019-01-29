import React, { Suspense } from 'react';
// CSS
import classes from './InfoSection.module.css';
// Logo
import Loading from '../../UI/LoadingDots/LoadingDots';
import defaultLogo from '../../../assets/favicon/android-icon-72x72.png'

const Contact = React.lazy(() => import('./Contact/Contact'));

const infoSection = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.InfoWrapper}>
                <div className={classes.Header}>
                    {props.header}
                </div>
                <div className={classes.InfoContainer}>
                    <div className={classes.Info}
                        dir='ltr'
                        tabIndex='-1'>
                        {props.children}
                    </div>
                </div>
            </div>
            <div className={classes.LogoWrapper}>
                <div className={classes.LogoContainer}>
                    <div className={classes.Logo}>
                        <img src={props.src ? props.src : defaultLogo} 
                        draggable="false"
                        height="72" 
                        width="72" 
                        alt={props.title} 
                        title={props.title} />
                    </div>
                </div>
                <div className={classes.Name}>{props.title}</div>
                {props.contact ? 
                    <Suspense fallback={<Loading />}>
                        <Contact contact={props.contact} />
                    </Suspense>
                    : null}
                
            </div>
        </div>
    );
}

export default infoSection;