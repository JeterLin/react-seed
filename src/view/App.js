import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@store';
import { Router } from '@router';
import Demo, { DemoRouter } from '@view/demo';
import 'antd/lib/style/index.css';
function App() {
    return (
        <Provider store={store}>
            <Router>
                <DemoRouter />
            </Router>
        </Provider>
    );
}

export default hot(App);
