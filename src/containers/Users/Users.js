import React from 'react';
// JSX
import { Switch, Route } from 'react-router-dom';
import Layout from '../../hoc/Users/Layout/Layout';
import NoMatch from '../NoMatch/NoMatch';
import Show from './Show/Show';

const users = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/users/show" component={Show} />
                {/* TODO nomatch container for users page */}
                <Route path="*" component={NoMatch} />
            </Switch>
        </Layout>
    );
}

export default users;