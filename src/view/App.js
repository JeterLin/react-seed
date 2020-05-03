import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Router} from '@router';
import Demo, {DemoRouter} from '@view/demo';
import './App.css';
function App() {
  // return <div>12dc<input width="200"/><Demo /></div>;
  return (
    <Router>
      <DemoRouter/>
    </Router>
  );
}

export default hot(App);
