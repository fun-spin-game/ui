import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "flag-icon-css/css/flag-icon.css";

import './index.css';
console.log(11, process.env.NODE_ENV);
console.log(22, process.env.REACT_APP_BASE_REST_URL);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
