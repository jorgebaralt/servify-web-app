import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import classes from './Footer.module.css';

const footer = (props) => {
    return (
        <div className={classes.Footer}>
            <div className={classes.FooterWrapper}>
                <span className={classes.Interested}>Header</span>
                <span>Subheader.</span>
                <br />
                <div className={classes.PageReferences}>
                    <span>Header</span>
                    <br />
                    <div className={classes.LinksWrapper}>
                        {props.location.pathname !== "/" ? <Link className={classes.Link} to="/" >About Me</Link> : null}
                        {props.location.pathname !== "/projects" ? <Link className={classes.Link} to="/projects">Projects</Link> : null}
                        {props.location.pathname !== "/skills" ? <Link className={classes.Link} to="/skills">Skills</Link> : null}
                    </div>
                    <div className={classes.CloserWrapper}>
                        <div>Copyright © Servify</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(footer);