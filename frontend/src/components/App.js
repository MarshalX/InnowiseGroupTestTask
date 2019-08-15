import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('../routes/Home'));

const App = () => <Router>
        <Suspense fallback={<div>Загрузка...</div>}>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </Suspense>
    </Router>;

export default App
