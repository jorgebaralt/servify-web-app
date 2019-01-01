import React from 'react';
// JSX
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../../hoc/Users/Layout/Layout';
import Show from './Show/Show';
import Edit from './Edit/Edit';

const users = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/users/show" component={Show} />
                <Route exact path="/users/edit" component={Edit} />
                {/* TODO nomatch container for users page */}
                <Route path="*" render={() => <Redirect to={{pathname: "/error"}}/>}/>
            </Switch>
        </Layout>
    );
}

export default users;