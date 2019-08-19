import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';


const Content = lazy(() => import('../components/Content'));
const MainNavbar = lazy(() => import('../components/MainNavbar'));

const Books = lazy(() => import('../routes/Books'));
const BookEdit = lazy(() => import('../routes/BookEdit'));

const Users = lazy(() => import('../routes/Users'));
const UserPage = lazy(() => import('../routes/UserPage'));


const App = () =>
    <Router>
    <Suspense fallback={<div>Загрузка...</div>}>
        <MainNavbar />
        <Content>
            <Switch>
                <Route exact path="/books" component={Books}/>
                <Route exact path="/book/:id/edit" component={BookEdit}/>
                <Route exact path="/" component={Users}/>
                <Route exact path="/user/:id" component={UserPage}/>
            </Switch>
        </Content>
    </Suspense>
    </Router>
;

export default App
