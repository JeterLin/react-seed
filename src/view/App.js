import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Router} from '@router';
import Demo, {DemoRouter} from '@view/demo';
import './App.css';
function App() {
  return (
    <Router>
      <DemoRouter/>
    </Router>
  );
}

export default hot(App);
