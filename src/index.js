import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.css";
import "@fortawesome/fontawesome-free/css/all.css";

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
