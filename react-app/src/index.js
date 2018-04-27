import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyComponent from './components/';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyComponent />, document.getElementById('root'));
registerServiceWorker();
