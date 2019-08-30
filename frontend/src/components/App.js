import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {lazy, Suspense} from 'react';
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {ConnectedBooks, ConnectedMainNavbar, ConnectedHome} from "../containers/Connections";

const Content = lazy(() => import('../components/Content'));

const BookEdit = lazy(() => import('../routes/BookEdit'));

const Users = lazy(() => import('../routes/Users'));
const UserPage = lazy(() => import('../routes/UserPage'));
const UserEdit = lazy(() => import('../routes/UserEdit'));


const App = ({store}) =>
    <Provider store={store}>
        <Router>
            <Suspense fallback={<div>Загрузка...</div>}>
                <ConnectedMainNavbar/>
                <Content>
                    <Switch>
                        <Route exact path="/" component={ConnectedHome}/>
                        <Route exact path="/books" component={ConnectedBooks}/>
                        <Route exact path="/book/:id/edit" component={BookEdit}/>
                        <Route exact path="/users" component={Users}/>
                        <Route exact path="/users/:page" component={Users}/>
                        <Route exact path="/user/:id" component={UserPage}/>
                        <Route exact path="/user/:id/edit" component={UserEdit}/>
                    </Switch>
                </Content>
            </Suspense>
        </Router>
    </Provider>
;

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App
