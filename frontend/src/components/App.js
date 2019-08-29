import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {lazy, Suspense} from 'react';
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'

const Content = lazy(() => import('../components/Content'));
const MainNavbar = lazy(() => import('../components/MainNavbar'));

const Books = lazy(() => import('../routes/Books'));
const BookEdit = lazy(() => import('../routes/BookEdit'));

const Users = lazy(() => import('../routes/Users'));
const UserPage = lazy(() => import('../routes/UserPage'));
const UserEdit = lazy(() => import('../routes/UserEdit'));


const App = ({store}) =>
    <Provider store={store}>
        <Router>
            <Suspense fallback={<div>Загрузка...</div>}>
                <MainNavbar/>
                <Content>
                    <Switch>
                        <Route exact path="/books" component={Books}/>
                        <Route exact path="/book/:id/edit" component={BookEdit}/>
                        <Route exact path="/" component={Users}/>
                        <Route exact path="/:page" component={Users}/>
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
