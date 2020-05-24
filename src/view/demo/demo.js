import React, { Suspense, lazy } from 'react';
import { Switch, Route, Link } from '@router';
import reactDemoImg from '@assets/react-demo.jpg';

import ss from './demo.css';
export default function Demo() {
    return <h2>Demo</h2>;
}

function LoadingThings(props) {
    return <h2>{props.children}</h2>;
}
// load the component after 2s
const lazyComponent = (p) => {
    if (p && typeof p.then === 'function') {
        return p
            .then(({ default: c }) => {
                return new Promise((r, rj) => {
                    setTimeout(() => {
                        r({ default: c });
                    }, 2e3);
                });
            })
            .catch((err) => 'error with loading component');
    }
    throw 'argument type with lazyComponent must be Promise';
};
const AsyncHome = lazy(() => lazyComponent(import('./Home')));
const AsyncAbout = lazy(() => import('./About'));
const AsyncTodoList = lazy(() => import('./todo/TodoList'));
const AsyncTodoDetail = lazy(() => import('./todoDetail/TodoDetail'));

export function DemoRouter() {
    return (
        <div className={ss.banner}>
            <header className={ss.bannerHeader}>
                <img src={reactDemoImg} />
                <nav>
                    <Link to="/home">Home</Link>&nbsp;|&nbsp;
                    <Link to="/about">About</Link>&nbsp;|&nbsp;
                    <Link to="/todo">Todo</Link>
                </nav>
            </header>
            <div style={{ width: '800px' }}>
                <Suspense fallback={<LoadingThings>loading things ...</LoadingThings>}>
                    <Switch>
                        <Route path="/home">
                            <AsyncHome />
                        </Route>
                        <Route path="/about">
                            <AsyncAbout />
                        </Route>
                        <Route exact path="/todo">
                            <AsyncTodoList />
                        </Route>
                        <Route exact path="/todo/detailView">
                            <AsyncTodoDetail />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
}
