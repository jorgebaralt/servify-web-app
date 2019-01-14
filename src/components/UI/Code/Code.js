import React from 'react';

import Import from './Import/Import';
import Class from './Class/Class';
import Method from './Method/Method';
import Export from './Export/Export';

import classes from './Code.module.css'

const code = () => {
    const curriculumVitae = {
        import: {
            defaultImport: 'Information',
            import: 'Experience',
            package: 'life'
        },
        class: {
            name: 'Resume',
            extends: 'Experience'
        },
        method: {
            education: {
                method: 'details',
                argument: 'Education'
            },
            skills: {
                method: 'details',
                argument: 'Skills'
            },
            tools: {
                method: 'details',
                argument: 'Tools'
            }
        },
        export: {
            export: 'Information'
        }
    }
    return (
        <div  className={classes.Code}>
            <div className={classes.CodeWrapper}>
                <Import defaultImport={curriculumVitae.import.defaultImport} import={curriculumVitae.import.import} package={curriculumVitae.import.package} />
                <Class name={curriculumVitae.class.name} extends={curriculumVitae.class.extends}>
                    <Method method={curriculumVitae.method.education.method} argument={curriculumVitae.method.education.argument}>
                        <span>Full Stack Web Development, Backend Logic, Data Visualization, Flat Design, Vector Illustrations, & Unity games!</span>
                    </Method>
                    <Method method={curriculumVitae.method.skills.method} argument={curriculumVitae.method.skills.argument}>
                        <span>Full Stack Web Development, Backend Logic, Data Visualization, Flat Design, Vector Illustrations, & Unity games!</span>
                    </Method>
                    <Method method={curriculumVitae.method.tools.method} argument={curriculumVitae.method.tools.argument}>
                        <span>React.js - HTML, CSS, JavaScript, ES6, Next-Gen JS, Babel, Webpack, Loaders. - jQuery, Bootstrap 3 & 4, - Node.js, Express.js, - MongoDB, Firebase - Git, Heroku.</span>
                    </Method>
                </Class>
                <Export export={curriculumVitae.export.export}/>
            </div>
        </div>
    )
}

export default code;